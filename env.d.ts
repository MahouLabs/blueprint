import 'vite/client';
import '@remix-run/cloudflare';
import '@cloudflare/workers-types';

interface Env {
	ENVIRONMENT?: 'development';
	SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

declare module '@remix-run/cloudflare' {
	export interface AppLoadContext {
		env: Env;
	}
}
