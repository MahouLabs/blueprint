import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import getEnvVars from '@/utils/env';
import { getUserSession } from '@/utils/supabase.server';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { Form, useLoaderData, useNavigate } from '@remix-run/react';
import { createBrowserClient } from '@supabase/ssr';
import { useState } from 'react';
import { useRemixForm } from 'remix-hook-form';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof authSchema>;
const resolver = zodResolver(authSchema);

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await getUserSession(request);

  const { SUPABASE_URL, SUPABASE_ANON_KEY } = getEnvVars([
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
  ]);

  const env = {
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
  };

  return session ? redirect('/home') : json({ env });
}

// export async function clientAction({}: ClientActionFunctionArgs) {}

export default function Signin() {
  // const navigation = useNavigation();
  const [loading, setLoading] = useState(false); // TODO: remove this state in favor of remix hooks
  const navigate = useNavigate();
  const { env } = useLoaderData<typeof loader>();
  const supabase = createBrowserClient(
    env.SUPABASE_URL!,
    env.SUPABASE_ANON_KEY!,
  );

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = useRemixForm<FormData>({
    mode: 'onSubmit',
    resolver,
  });

  // TODO: only enter this method if form is properly validated
  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = getValues();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setLoading(false); // TODO: handle error if it happens
    if (!error) navigate('/home');
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Form
        onSubmit={handleSignin}
        className="flex flex-col gap-4 w-fit border p-10 border-border rounded-lg"
      >
        <Label>
          Email:
          <Input type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </Label>
        <Label>
          Password:
          <Input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
        </Label>
        <Button disabled={loading} type="submit">
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
        {/* <Button disabled={navigation.state === 'submitting'} type="submit">
          {navigation.state === 'submitting' ? 'Signing in...' : 'Sign in'}
        </Button> */}
      </Form>
    </div>
  );
}
