import { motion } from "framer-motion";
import p1 from "@/assets/portfolio-1.webp";
import p2 from "@/assets/portfolio-2.webp";
import p3 from "@/assets/portfolio-3.webp";
import p4 from "@/assets/portfolio-4.webp";

const projects = [
  {
    img: p1,
    alt: "AKA_WMart online watch store homepage shown on a laptop screen",
    title: "AKA_WMart Storefront",
    category: "E-Commerce Store",
    status: "Client project",
    tech: ["React", "Node.js", "MongoDB"],
    desc: "MERN stack e-commerce store with secure checkout, WhatsApp integration, user accounts and a full admin dashboard.",
  },
  {
    img: p2,
    alt: "Retail billing system invoice screen on a desktop monitor beside a thermal receipt printer",
    title: "Smart Retail Billing",
    category: "Billing System",
    status: "Client project",
    tech: ["JavaScript", "MongoDB", "Express"],
    desc: "Retail billing system with inventory management, sales tracking, invoice generation and thermal receipt printing. Available as a desktop application or a cloud-based version.",
  },
  {
    img: p3,
    alt: "Demo admin dashboard with sales charts, an orders overview and a recent orders table",
    title: "Business Analytics Dashboard",
    category: "Admin Dashboard",
    status: "Demo project",
    tech: ["React", "JWT", "MongoDB"],
    desc: "Demo dashboard showing analytics, secure authentication, role-based access and business monitoring tools.",
  },
  {
    img: p4,
    alt: "Clean Nest cleaning services website homepage",
    title: "Clean Nest Business Website",
    category: "Business Website",
    status: "Client project",
    tech: ["React", "Tailwind CSS", "Framer Motion"],
    desc: "Responsive React business website for Clean Nest with service information, contact support and a clean, modern design.",
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xl font-semibold uppercase tracking-widest text-primary-glow">
            Selected Work
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
            MERN stack projects:{" "}
            <span className="text-gradient">online stores, billing systems and dashboards.</span>
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
                  alt={p.alt}
                  loading="lazy"
                  width={1200}
                  height={750}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary-glow">
                      {p.category}
                    </span>
                    <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary-glow">
                      {p.status}
                    </span>
                  </div>
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
