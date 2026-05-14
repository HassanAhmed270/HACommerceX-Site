export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base gradient wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.40_0.18_260/0.55),transparent_55%),linear-gradient(180deg,oklch(0.22_0.05_265),oklch(0.18_0.04_265))]" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.18] animate-grid-pan" />

      {/* Floating colored orbs */}
      <div className="absolute -top-32 -left-32 h-[42rem] w-[42rem] rounded-full bg-primary/30 blur-[140px] animate-orb-1" />
      <div className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-primary-glow/25 blur-[140px] animate-orb-2" />
      <div className="absolute -bottom-40 left-1/4 h-[40rem] w-[40rem] rounded-full bg-[oklch(0.55_0.22_280/0.28)] blur-[160px] animate-orb-3" />

      {/* Subtle vignette + noise overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,oklch(0.10_0.03_265/0.7)_100%)]" />
    </div>
  );
}