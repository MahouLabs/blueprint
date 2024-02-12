import { AppLoadContext } from '@remix-run/cloudflare';
import { createServerClient, parse, serialize } from '@supabase/ssr';

export async function createSupabaseServer(
  request: Request,
  context: AppLoadContext,
) {
  const cookies = parse(request.headers.get('Cookie') ?? '');
  const headers = new Headers();
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = context.env;

  const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
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
  });

  return supabase;
}

export async function getUserSession(
  request: Request,
  context: AppLoadContext,
) {
  const supabase = await createSupabaseServer(request, context);
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  return { session, error };
}
