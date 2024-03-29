import { createServerClient, parse, serialize } from '@supabase/ssr';

export async function createSupabaseServer(request: Request) {
  const cookies = parse(request.headers.get('Cookie') ?? '');
  const headers = new Headers();

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(key) {
          return cookies[key];
        },
        set(key, value, options) {
          headers.append('Set-Cookie', serialize(key, value, options));
        },
        remove(key, options) {
          headers.append('Set-Cookie', serialize(key, '', options));
        },
      },
    },
  );

  return supabase;
}

export async function getUserSession(request: Request) {
  const supabase = await createSupabaseServer(request);
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  return { session, error };
}
