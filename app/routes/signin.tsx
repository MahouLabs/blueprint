import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createSupabaseServer, getUserSession } from '@/utils/supabase.server';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/cloudflare';
import { Form, useActionData, useNavigation } from '@remix-run/react';
import { getValidatedFormData, useRemixForm } from 'remix-hook-form';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof authSchema>;
const resolver = zodResolver(authSchema);

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await getUserSession(request);

  const env = {
    SUPABASE_URL: process.env.SUPABASE_URL!,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY!,
  };

  return session ? redirect('/home') : json({ env });
}

export async function action({ request }: ActionFunctionArgs) {
  const supabase = await createSupabaseServer(request);
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    return json({ errors, defaultValues, otpSent: false });
  }

  const { email } = data;
  const { error } = await supabase.auth.signInWithOtp({
    email,
  });

  if (error) {
    return json({ error: error.message, otpSent: false }, { status: 400 });
  }

  return json({ otpSent: true });
}

export default function Signup() {
  const navigation = useNavigation();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: 'onSubmit',
    resolver,
  });

  const actionData = useActionData<typeof action>();

  if (actionData?.otpSent) {
    return (
      <div>
        <p>OTP sent to your email. Please check your email.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Form onSubmit={handleSubmit} className="flex flex-col gap-4 w-fit">
        <Label>
          Email:
          <Input type="email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </Label>
        <Button disabled={navigation.state === 'submitting'} type="submit">
          {navigation.state === 'submitting'
            ? 'Signing in...'
            : 'Sign in with OTP'}
        </Button>
      </Form>
    </div>
  );
}
