import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/loginAtAdmin")({
  head: () => ({ meta: [{ title: "Admin · HACommerceX" }, { name: "robots", content: "noindex, nofollow" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    setTimeout(() => {
      setLoading(false);
      setErr("Admin backend not yet connected. Enable Lovable Cloud to activate JWT auth & dashboard.");
    }, 800);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero px-4">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <form
        onSubmit={onSubmit}
        className="relative w-full max-w-md glass-strong rounded-3xl p-8 sm:p-10"
      >
        <div className="flex flex-col items-center text-center">
          <img src={logo} alt="HACommerceX" className="h-14 w-14 rounded-xl" />
          <h1 className="mt-4 text-2xl font-bold">Admin Portal</h1>
          <p className="mt-1 text-sm text-muted-foreground">Authorized personnel only.</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="relative">
            <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              required type="email" placeholder="admin@hacommercex.com"
              className="w-full rounded-xl border border-border bg-input/50 py-3 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="relative">
            <Lock size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              required type="password" placeholder="Password"
              className="w-full rounded-xl border border-border bg-input/50 py-3 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {err && (
          <div className="mt-4 rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs text-primary-glow">
            {err}
          </div>
        )}

        <button
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.01] glow-primary disabled:opacity-60"
        >
          {loading ? "Authenticating…" : "Sign in"}
        </button>

        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          Protected route · JWT + bcrypt · Hidden from navigation
        </p>
      </form>
    </div>
  );
}