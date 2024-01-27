import { cn } from '@/utils/shadcn';
import { Link, useLocation } from '@remix-run/react';
import { type LucideIcon } from 'lucide-react';

export type SidebarLinkProps = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export function SidebarLink({ name, href, ...props }: SidebarLinkProps) {
  const { pathname } = useLocation();

  return (
    <li key={name}>
      <Link
        to={href}
        className={cn(
          'flex items-center justify-start gap-2 hover:bg-blue-200 rounded-md',
          href === pathname && 'bg-gray-200',
        )}
      >
        <span className="flex h-8 items-center gap-2 rounded-md px-2 text-sm bg-slate-3 text-slate-12">
          <props.icon height={18} />
          {name}
        </span>
      </Link>
    </li>
  );
}
