import {
  SidebarLink,
  type SidebarLinkProps,
} from '@/components/ui/sidebar-link';
import { getUserSession } from '@/utils/supabase.server';
import { LoaderFunctionArgs, json, redirect } from '@remix-run/cloudflare';
import { Outlet, useLoaderData } from '@remix-run/react';
import { createBrowserClient } from '@supabase/ssr';
import { Clapperboard, Home, Newspaper } from 'lucide-react';

export async function loader({ request, context }: LoaderFunctionArgs) {
  const session = await getUserSession(request, context);
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = context.env;

  return session
    ? json({ session, env: { SUPABASE_URL, SUPABASE_ANON_KEY } })
    : redirect('/signin');
}

export default function HomeLayout() {
  const { session, env } = useLoaderData<typeof loader>() || {};
  const supabase = createBrowserClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  const links: SidebarLinkProps[] = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Articles', href: '/articles', icon: Newspaper },
    { name: 'Videos', href: '/videos', icon: Clapperboard },
  ];

  return (
    <main className="flex gap-2">
      <aside className="hidden h-screen w-[250px] flex-shrink-0 flex-col justify-between border-r border-slate-6 px-4 pb-6 md:flex">
        <h1 className="h-[60px] text-center leading-[60px] text-3xl">
          Company name
        </h1>
        <nav className="mt-6 flex-1">
          <ul>
            {links.map((link) => (
              <SidebarLink {...link} />
            ))}
          </ul>
        </nav>
      </aside>

      <Outlet context={{ session, supabase }} />
    </main>
  );
}
