import {
  SidebarLink,
  type SidebarLinkProps,
} from '@/components/ui/sidebar-link';
import { createSupabaseServer } from '@/utils/supabase.server';
import { LoaderFunctionArgs, json, redirect } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { Home, Newspaper, Clapperboard } from 'lucide-react';

export async function loader({ request }: LoaderFunctionArgs) {
  const supabase = await createSupabaseServer(request);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session ? json({ session }) : redirect('/signin');
}

export default function HomeLayout() {
  const { session } = useLoaderData<typeof loader>() || {};

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

      <Outlet context={{ session }} />
    </main>
  );
}
