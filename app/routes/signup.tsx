import { Button } from '@/components/ui/button';
import { ErrorMessage, Input } from '@/components/ui/input';
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
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});
// TODO: refine to make sure that password and confirmPassword are equal

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

export default function Signup() {
  const [loading, setLoading] = useState(false);
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
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = getValues();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setLoading(false); // TODO: handle error if it happens
    if (!error) navigate('/home');
  };

  return (
    <div className="w-full h-screen flex items-center justify-center border ">
      <Form onSubmit={handleSignup} className="flex flex-col gap-4 w-fit">
        <Label>
          Name:
          <Input type="string" {...register('name')} />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </Label>
        <Label>
          Email:
          <Input type="email" {...register('email')} />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Label>
        <Label>
          Password:
          <Input type="password" {...register('password')} />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </Label>
        <Label>
          Confirm Password:
          <Input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
          )}
        </Label>
        <Button disabled={loading} type="submit">
          {loading ? 'Signing up...' : 'Sign up'}
        </Button>
      </Form>
    </div>
  );
}
