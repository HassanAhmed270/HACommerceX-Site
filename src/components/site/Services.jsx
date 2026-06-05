import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, LayoutDashboard, CreditCard, Globe, Sparkles, X } from "lucide-react";

const services = [
  {
    id: 1,
    title: "E-Commerce Stores",
    icon: ShoppingBag,
    full: "We build scalable MERN-stack ecommerce platforms with secure checkout systems, product management, responsive UI, customer authentication, and performance optimization to help businesses grow online efficiently.",
  },
  {
    id: 2,
    title: "Custom Dashboards",
    icon: LayoutDashboard,
    full: "Custom dashboard systems with analytics, role management, reporting, automation, secure authentication, and real-time business monitoring designed for modern companies and startups.",
  },
  {
    id: 3,
    title: "POS Systems",
    icon: CreditCard,
    full: "Advanced POS solutions with inventory tracking, sales analytics, invoice generation, customer management, barcode systems, and multi-user support for retail and restaurant businesses.",
  },
  {
    id: 4,
    title: "Business Websites",
    icon: Globe,
    full: "Responsive and high-performance websites crafted with modern UI/UX, SEO optimization, fast loading speed, animations, and scalable architecture for businesses and brands.",
  },
];

export function Services() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="services" className="relative scroll-mt-28 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xl font-semibold uppercase tracking-widest text-primary-glow">
            Our Services
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
            Start growing your business with{" "}
            <span className="text-gradient">modern digital solutions.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Premium MERN Stack software solutions crafted for performance, scalability, and business growth.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const Icon = service.icon ?? Sparkles;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="h-48 cursor-pointer"
                onClick={() => setSelected(service)}
              >
                <div className="group relative flex h-full flex-col items-center justify-center rounded-3xl border border-border glass p-7 transition-all hover:-translate-y-1 hover:border-primary/60">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/0 blur-3xl transition-all duration-500 group-hover:bg-primary/30" />
                  <div className="relative text-center">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[0_0_25px_oklch(0.62_0.24_260/0.45)]">
                      <Icon size={26} />
                    </div>
                    <h3 className="mt-6 text-lg font-semibold">{service.title}</h3>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl glass-strong rounded-3xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              <X size={18} />
            </button>
            <div className="flex items-start gap-4">
              <div className="inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                <selected.icon size={32} />
              </div>
              <h2 className="text-2xl font-bold mt-2">{selected.title}</h2>
            </div>
            <p className="mt-6 leading-7 text-muted-foreground">{selected.full}</p>
          </div>
        </div>
      )}
    </section>
  );
}
