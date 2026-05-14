import { motion } from "framer-motion";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";

const projects = [
  { img: p1, title: "AKA_WMart Storefront", category: "E-Commerce", tech: ["React", "Node", "MongoDB"], desc: "Premium watch e-commerce with custom checkout." },
  { img: p2, title: "Retail POS Suite", category: "POS System", tech: ["React", "Express", "Stripe"], desc: "Tablet-first POS for fast retail operations." },
  { img: p3, title: "Insights Admin", category: "Dashboard", tech: ["React", "Recharts", "JWT"], desc: "Realtime analytics dashboard with RBAC." },
  { img: p4, title: "Inventory Mobile", category: "Mobile App", tech: ["React Native", "Node"], desc: "Multi-warehouse inventory on the go." },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-glow">Selected Work</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
            Recent <span className="text-gradient">projects</span>.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl glass"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
                    {p.category}
                  </span>
                  <div className="flex gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-[10px] text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}