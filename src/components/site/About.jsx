import { motion } from "framer-motion";
import { Shield, Code2, Rocket, Sparkles } from "lucide-react";

const pillars = [
  { icon: Code2, title: "MERN Expertise", desc: "MongoDB, Express, React and Node.js, the stack we build on." },
  { icon: Shield, title: "Secure by Design", desc: "JWT authentication, hashed passwords and role-based access control." },
  { icon: Rocket, title: "Built to Grow", desc: "Architecture that grows with your business." },
  { icon: Sparkles, title: "Clean, Responsive UI", desc: "Modern interfaces that work on phones, tablets and desktops." },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
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
              A Karachi-based MERN stack studio building software for{" "}
              <span className="text-gradient">growing businesses</span>.
            </h2>
            <p className="mt-6 text-muted-foreground">
              HACommerceX is a software studio based in Karachi, Pakistan. We build online stores, POS and billing systems, admin dashboards and chat-based agents on the MERN stack (MongoDB, Express, React and Node.js) for businesses in Pakistan and abroad.
            </p>
            <p className="mt-4 text-muted-foreground">
              We build with secure sign-in, role-based access and clean, maintainable code, so your software stays dependable as your business grows. Founded by Hassan Ahmed.
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
