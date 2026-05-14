import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Mail, Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/loginAtAdmin")({
  head: () => ({
    meta: [
      { title: "Admin · HACommerceX" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      throw redirect({ to: "/admin" });
    }
  },
  component: AdminLogin,
});

type Mode = "signin" | "setup";

function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>("signin");
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "err" | "ok"; text: string } | null>(null);

  useEffect(() => {
    supabase.rpc("admin_exists").then(({ data }) => {
      const exists = !!data;
      setAdminExists(exists);
      if (!exists) setMode("setup");
    });
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
        return;
      }

      // Setup mode: sign up + claim admin (only succeeds if no admin exists)
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (signUpError && !/already registered/i.test(signUpError.message)) throw signUpError;

      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;

      const { data: claimed, error: rpcErr } = await supabase.rpc("claim_initial_admin");
      if (rpcErr) throw rpcErr;
      if (!claimed) {
        await supabase.auth.signOut();
        throw new Error("An admin already exists. Use Sign In instead.");
      }
      navigate({ to: "/admin" });
    } catch (err) {
      setMsg({ type: "err", text: (err as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero px-4 py-10">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <form onSubmit={onSubmit} className="relative w-full max-w-md glass-strong rounded-3xl p-8 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="HACommerceX" className="h-14 w-14 rounded-xl" />
          <h1 className="mt-4 text-2xl font-bold">Admin Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin" ? "Authorized personnel only." : "Create the first admin account."}
          </p>
        </div>

        {adminExists === false && (
          <div className="mt-6 grid grid-cols-2 gap-1 rounded-xl border border-border bg-secondary/40 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setMode("signin"); setMsg(null); }}
              className={`rounded-lg py-2 transition-all ${mode === "signin" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode("setup"); setMsg(null); }}
              className={`rounded-lg py-2 transition-all ${mode === "setup" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              First-time Setup
            </button>
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div className="relative">
            <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@hacommercex.com"
              className="w-full rounded-xl border border-border bg-input/50 py-3 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              minLength={6} placeholder="Password (min 6 chars)"
              className="w-full rounded-xl border border-border bg-input/50 py-3 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {msg && (
          <div className={`mt-4 rounded-xl border p-3 text-xs ${
            msg.type === "err" ? "border-destructive/40 bg-destructive/10 text-destructive-foreground" : "border-primary/30 bg-primary/10 text-primary-glow"
          }`}>
            {msg.text}
          </div>
        )}

        <button
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.01] glow-primary disabled:opacity-60"
        >
          {loading ? "Please wait…" : mode === "signin" ? "Sign in" : (
            <span className="inline-flex items-center gap-2 justify-center">
              <Sparkles size={14} /> Create Admin & Sign In
            </span>
          )}
        </button>

        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          Protected route · Hashed passwords · Hidden from navigation
        </p>
      </form>
    </div>
  );
}
