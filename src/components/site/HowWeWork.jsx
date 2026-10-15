import { motion } from "framer-motion";

const steps = [
  {
    title: "Tell us what you need",
    text: "Send your idea through the form or WhatsApp.",
  },
  {
    title: "Get a free quote",
    text: "We reply within 24 hours with a clear scope and quote.",
  },
  {
    title: "We build it",
    text: "Your project is developed on the MERN stack, and we share progress along the way.",
  },
  {
    title: "Launch and support",
    text: "We deploy your project and stay available for fixes and updates.",
  },
];

export function HowWeWork() {
  return (
    <section id="how-we-work" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-10 sm:p-16">
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/40 blur-[120px]" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-primary-glow/30 blur-[120px]" />

          <div className="relative">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xl font-semibold uppercase tracking-widest text-primary-glow">
                How We Work
              </span>
              <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
                From your first message to <span className="text-gradient">launch</span>.
              </h2>
            </div>

            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-secondary/40 p-6"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
