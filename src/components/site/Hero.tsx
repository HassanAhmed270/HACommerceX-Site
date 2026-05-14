import { motion } from "framer-motion";
import heroMockup from "@/assets/hero-mockup.jpg";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-hero pt-32 pb-20 sm:pt-40 sm:pb-32">
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-glow">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-glow" />
            BUILD • DESIGN • GROW
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] sm:text-6xl lg:text-7xl">
            We Build <span className="text-gradient">Modern Digital</span> Solutions For Businesses
          </h1>

          <p className="mt-6 text-base text-muted-foreground sm:text-lg">
            Premium MERN Stack systems tailored for growth, performance, and scalability —
            engineered with futuristic design and enterprise-grade security.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03] animate-pulse-glow"
            >
              Get Started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#services"
              className="rounded-xl border border-border bg-secondary/50 px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-secondary hover:border-primary/50"
            >
              View Services
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 glass-strong">
            <img
              src={heroMockup}
              alt="HACommerceX dashboard preview"
              width={1280}
              height={960}
              className="w-full"
            />
          </div>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { k: "120+", v: "Projects Delivered" },
            { k: "50+", v: "Happy Clients" },
            { k: "99.9%", v: "Uptime SLA" },
            { k: "24/7", v: "Support" },
          ].map((s) => (
            <div key={s.v} className="glass rounded-2xl p-5 text-center">
              <div className="text-2xl font-bold text-gradient sm:text-3xl">{s.k}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}