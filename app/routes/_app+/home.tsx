import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createSupabaseServer } from '@/utils/supabase.server';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import {
  Form,
  useLoaderData,
  useNavigation,
  useOutletContext,
  useRevalidator,
} from '@remix-run/react';
import { getValidatedFormData, useRemixForm } from 'remix-hook-form';
import * as z from 'zod';

const bookmarkSchema = z.object({
  url: z.string().url(),
});

type FormData = z.infer<typeof bookmarkSchema>;
const resolver = zodResolver(bookmarkSchema);

export async function loader({ request }: LoaderFunctionArgs) {
  const supabase = await createSupabaseServer(request);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return redirect('/signin');

  const { data: bookmarks } = await supabase.from('bookmarks').select('url');
  return json(
    { email: session.user.email, bookmarks: bookmarks || [] },
    { headers: { 'Cache-Control': 'max-age=6400, s-maxage=86400' } },
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const supabase = await createSupabaseServer(request);
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    return json({ errors, defaultValues });
  }
  const { url } = data;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { error } = await supabase
    .from('bookmarks')
    .insert({ url, user_id: session?.user.id });
  if (error) return json({ error: error.message }, { status: 400 });

  return json({}, { status: 200 });
}

export default function Home() {
  const { email, bookmarks } = useLoaderData<typeof loader>();
  const { supabase } = useOutletContext(); // TODO: find out how to make this typesafe
  const navigation = useNavigation();
  const { revalidate } = useRevalidator();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useRemixForm<FormData>({
    mode: 'onSubmit',
    resolver,
  });

  const handleSignout = async () => {
    await supabase.auth.signOut();
    revalidate();
  };

  return (
    <div className="w-full h-screen flex items-center flex-col gap-2 justify-center">
      <h1 className="text-4xl">Hello, {email}</h1>
      {bookmarks.length > 0 ? (
        <ul>
          {bookmarks.map((bookmark, i) => (
            <li key={`${bookmark.url}_${i}`}>{bookmark.url}</li>
          ))}
        </ul>
      ) : (
        <p>No bookmarks yet</p>
      )}

      <Form onSubmit={handleSubmit} className="flex flex-col gap-4 w-fit">
        <Input className="w-56" defaultValue="test" {...register('url')} />
        {errors.url && <p>{errors.url.message}</p>}
        <Button disabled={navigation.state === 'submitting'} type="submit">
          {navigation.state === 'submitting' ? 'Adding...' : 'Add new URL'}
        </Button>
      </Form>

      <Button onClick={handleSignout}>Signout</Button>
    </div>
  );
}
