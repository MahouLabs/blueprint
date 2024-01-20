import { Link } from '@remix-run/react';
import { Button } from './ui/button';

type LinkItem = {
  name: string;
  href: string;
};

const links: LinkItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Pricing', href: '/pricing' },
];

export function Header({ isSignedIn }: { isSignedIn: boolean }) {
  return (
    <div className="flex items-center px-4 py-6 justify-between">
      <h1>Company logo</h1>
      <nav className="bg-gray-200 outline outline-black p-4 rounded-full flex items-center w-fit h-5 mx-8">
        <ul className="flex flex-row gap-8">
          {links.map((link) => (
            <li>
              <Link to={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {isSignedIn ? (
        <Link to="/home">Go to app</Link>
      ) : (
        <Link to="/signin">Sign in</Link>
      )}
    </div>
  );
}
