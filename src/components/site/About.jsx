import { motion } from "framer-motion";
import { Shield, Code2, Rocket, Sparkles } from "lucide-react";

const pillars = [
  { icon: Code2, title: "MERN Expertise", desc: "MongoDB, Express, React, Node — built right." },
  { icon: Shield, title: "Enterprise Security", desc: "JWT, bcrypt, RBAC, and hardened APIs by default." },
  { icon: Rocket, title: "Built to Scale", desc: "Architecture that grows with your business." },
  { icon: Sparkles, title: "Premium UI/UX", desc: "Futuristic, refined, and conversion-focused." },
];

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xl font-semibold uppercase tracking-widest text-primary-glow">
              About HACommerceX
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
              A modern software studio engineering{" "}
              <span className="text-gradient">digital businesses</span>.
            </h2>
            <p className="mt-6 text-muted-foreground">
              HACommerceX Solutions designs and builds high-performance digital systems for ambitious teams. From e-commerce platforms and POS to admin dashboards and mobile apps, we deliver software that is fast, secure, and built to scale.
            </p>
            <p className="mt-4 text-muted-foreground">
              We believe great software is invisible — it just works. Our engineering culture is rooted in clean architecture, modern UI/UX, and a relentless commitment to quality and security.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow transition-all group-hover:bg-primary/25">
                  <p.icon size={22} />
                </div>
                <h3 className="mt-4 font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
