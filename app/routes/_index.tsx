import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase.server";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { Link, redirect } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    {
      name: "description",
      content: "Welcome to Remix! Using Vite and Cloudflare!",
    },
  ];
};

export async function loader({ request, context }: LoaderFunctionArgs) {
  const supabase = createClient(request, context);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (user) return redirect("/dashboard");
  return null;
}

export default function Index() {
  return (
    <div>
      <h1 className="text-2xl">Welcome to Blueprint</h1>
      <Link to="/signin">
        <Button>Go to signin</Button>
      </Link>
    </div>
  );
}
