import { createClient } from "@/utils/supabase.server";
import { type LoaderFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request, context }: LoaderFunctionArgs) {
  const supabase = createClient(request, context);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    return redirect("/signin");
  }

  return json({ userEmail: user.email });
}

export default function Dashboard() {
  const { userEmail } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-2">
      <h1>
        Welcome, <b>{userEmail}</b>
      </h1>
    </div>
  );
}
