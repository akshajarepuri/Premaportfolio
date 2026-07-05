import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { BackgroundFX } from "@/components/portfolio/BackgroundFX";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Prema Akshaja Repuri" }, { name: "description", content: "Admin sign in for the portfolio." }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { if (data.session) navigate({ to: "/admin" }); });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/admin" } });
    setLoading(false);
    if (res.error) return toast.error(res.error.message);
    if (mode === "signup") toast.success("Account created.");
    navigate({ to: "/admin" });
  }

  return (
    <div className="relative min-h-screen">
      <BackgroundFX />
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
        <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft size={14} /> Back home</Link>
        <div className="glass card-shadow rounded-3xl p-8">
          <h1 className="font-display text-3xl font-bold"><span className="gradient-text">{mode === "signin" ? "Welcome back" : "Create account"}</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">Portfolio admin area.</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Password</label>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-primary" />
            </div>
            <button disabled={loading} className="w-full rounded-full py-3 text-sm font-semibold text-primary-foreground gradient-bg glow disabled:opacity-60">
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-4 text-xs text-muted-foreground hover:text-foreground">
            {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}