import type { AppLoadContext } from "@remix-run/cloudflare";
import { createServerClient, parse, serialize } from "@supabase/ssr";

export function createClient(request: Request, context: AppLoadContext) {
  const cookies = parse(request.headers.get("Cookie") ?? "");
  const headers = new Headers();
  const { SUPABASE_URL, SUPABASE_KEY } = context.cloudflare.env;

  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      get(key) {
        return cookies[key];
      },
      set(key, value, options) {
        headers.append("Set-Cookie", serialize(key, value, options));
      },
      remove(key, options) {
        headers.append("Set-Cookie", serialize(key, "", options));
      },
    },
  });
}
