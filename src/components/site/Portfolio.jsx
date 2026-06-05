import { motion } from "framer-motion";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";

const projects = [
  {
    img: p1,
    title: "AKA_WMart Storefront",
    category: "E-Commerce Store",
    tech: ["React", "Node.js", "MongoDB"],
    desc: "Modern MERN-stack ecommerce platform with secure checkout, WhatsApp integration, user accounts, and full admin dashboard management.",
  },
  {
    img: p2,
    title: "Smart Retail Billing",
    category: "Billing System",
    tech: ["JavaScript", "MongoDB", "Express"],
    desc: "Online Billing solution with inventory management, sales tracking, invoice generation, and secure admin dashboard.",
  },
  {
    img: p3,
    title: "Business Analytics Dashboard",
    category: "Admin Dashboard",
    tech: ["React", "JWT", "MongoDB"],
    desc: "Advanced dashboard system with realtime analytics, secure authentication, role-based access, and business monitoring tools.",
  },
  {
    img: p4,
    title: "Clean Nest Business Website",
    category: "Business Website",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    desc: "Modern React business website developed for Clean Nest with responsive frontend, service information, contact support, and premium UI design.",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xl font-semibold uppercase tracking-widest text-primary-glow">
            Selected Work
          </span>
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
                      <span
                        key={t}
                        className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
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
