import type { MetaFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

const linkStyle = 'underline decoration-dotted';
export default function Index() {
  return (
    <div>
      <h1>TODO: Add landing page</h1>
    </div>
  );
}
