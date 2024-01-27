import { Header } from '@/components/header';
import { type SidebarLinkProps } from '@/components/ui/sidebar-link';
import { getUserSession } from '@/utils/supabase.server';
import { LoaderFunctionArgs, json, redirect } from '@remix-run/cloudflare';
import { Outlet, useLoaderData } from '@remix-run/react';
import { Clapperboard, Home, Newspaper } from 'lucide-react';

export async function loader({ request }: LoaderFunctionArgs) {
  const { session } = await getUserSession(request);
  return json({ session });
}

export default function HomeLayout() {
  const { session } = useLoaderData<typeof loader>() || {};

  const links: SidebarLinkProps[] = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Articles', href: '/articles', icon: Newspaper },
    { name: 'Videos', href: '/videos', icon: Clapperboard },
  ];

  return (
    <>
      <Header isSignedIn={Boolean(session)} />
      <main className="px-4 py-6">
        <Outlet context={{ session }} />
      </main>
    </>
  );
}
