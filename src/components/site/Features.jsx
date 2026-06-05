import { Check } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  "Fully Responsive across all devices",
  "Blazing Fast Performance",
  "Secure by Default — JWT & bcrypt",
  "Modern Premium UI/UX",
  "Scalable Architecture",
  "SEO Friendly & Optimized",
  "Clean Dashboard Design",
  "Production-Ready Code",
];

export function Features() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-10 sm:p-16">
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/40 blur-[120px]" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-primary-glow/30 blur-[120px]" />

          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xl font-semibold uppercase tracking-widest text-primary-glow">
                Why HACommerceX
              </span>
              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
                Engineered for <span className="text-gradient">excellence</span>.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Every system we ship meets a high bar — performance, security, and design that
                feels built for the next decade.
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {features.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-3"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-sm">{f}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
