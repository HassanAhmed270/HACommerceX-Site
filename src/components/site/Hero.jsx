import { motion } from "framer-motion";
import heroMockup from "@/assets/hero-commerce-platform.svg";

const stats = [
  { k: "10+", v: "Projects Delivered" },
  { k: "9+", v: "Happy Clients" },
  { k: "90.5%", v: "Uptime SLA" },
  { k: "24/7", v: "Support" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-24 pb-20 sm:pt-32 lg:min-h-screen"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_30%,oklch(0.55_0.22_255/0.22),transparent_30%),linear-gradient(180deg,oklch(0.12_0.04_265)_0%,oklch(0.17_0.04_265)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.07]" />

      {/* TOP BADGE */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex justify-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-2.5 text-[11px] font-semibold tracking-[0.35em] text-primary-glow backdrop-blur-md">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary-glow" />
          BUILD • DESIGN • GROW
        </span>
      </motion.div>

      {/* HERO CONTENT */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-16 px-6 lg:flex-row lg:px-10">
        {/* TEXT SECTION */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="mx-auto max-w-4xl text-3xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl md:text-4xl lg:mx-0 lg:text-6xl pl-16">
            We Build
            <br />
            <span className="text-gradient">Modern Digital</span>
            <br />
            Solutions For Businesses
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg lg:mx-0 pl-16">
            Premium MERN Stack systems tailored for growth, performance, and scalability — engineered with futuristic design and enterprise-grade security.
          </p>
        </motion.div>

        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex flex-1 items-center justify-center"
        >
          <div className="absolute h-[420px] w-[420px] rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute bottom-6 h-28 w-72 rounded-full bg-primary-glow/20 blur-[70px]" />
          <img
            src={heroMockup}
            alt="HACommerceX dashboard preview"
            width={1024}
            height={1024}
            className="relative z-10 w-full max-w-[650px] object-contain drop-shadow-[0_40px_90px_oklch(0.06_0.04_265/0.85)]"
          />
        </motion.div>
      </div>

      {/* STATS */}
      <div className="relative mx-auto mt-20 max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {stats.map((s) => (
            <motion.div
              key={s.v}
              whileHover={{ y: -4 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:bg-white/10"
            >
              <div className="text-3xl font-bold text-white">{s.k}</div>
              <div className="mt-2 text-sm text-white/60">{s.v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
