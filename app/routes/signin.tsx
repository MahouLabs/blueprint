import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import { useState } from "react";
import { toast } from "sonner";

export async function loader({ context }: LoaderFunctionArgs) {
  const { SUPABASE_URL, SUPABASE_KEY } = context.cloudflare.env;
  return json({ SUPABASE_URL, SUPABASE_KEY });
}

export default function Signin() {
  const { SUPABASE_URL, SUPABASE_KEY } = useLoaderData<typeof loader>();
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_KEY);

  const signin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (!error) {
      toast("OTP code sent to your email");
      setMode("otp");
    } else {
      toast("Failed to send OTP code, please try again later");
    }

    setLoading(false);
  };

  const verifyOtp = async (token: string) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (!error) navigate("/dashboard");
  };

  return (
    <div className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 mx-auto flex w-full max-w-[354px] flex-col gap-4">
      {mode === "email" && (
        <form onSubmit={signin}>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="mt-2 w-full" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send OTP code"}
          </Button>
        </form>
      )}

      {mode === "otp" && (
        <>
          <h2>Input your OTP code here</h2>
          <InputOTP maxLength={6} onComplete={verifyOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </>
      )}
    </div>
  );
}
