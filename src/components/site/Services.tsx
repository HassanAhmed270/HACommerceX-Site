import { motion } from "framer-motion";
import {
  ShoppingBag, Receipt, CreditCard, LayoutDashboard,
  Smartphone, Boxes, Palette, Wrench
} from "lucide-react";

const services = [
  { icon: ShoppingBag, title: "E-Commerce Websites", desc: "High-converting online stores with seamless checkout." },
  { icon: Receipt, title: "Billing Systems", desc: "Automated invoicing, taxes, and recurring billing." },
  { icon: CreditCard, title: "POS Systems", desc: "Fast, reliable point-of-sale for retail and F&B." },
  { icon: LayoutDashboard, title: "Admin Dashboards", desc: "Realtime analytics with role-based controls." },
  { icon: Smartphone, title: "Mobile Applications", desc: "Native-feeling apps for iOS and Android." },
  { icon: Boxes, title: "Inventory Management", desc: "Track stock, suppliers, and warehouses live." },
  { icon: Palette, title: "UI/UX Design", desc: "Premium interfaces that feel effortless." },
  { icon: Wrench, title: "Website Maintenance", desc: "Updates, monitoring, and 24/7 support." },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-glow">Our Services</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
            Everything you need to <span className="text-gradient">ship and scale</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            End-to-end software solutions designed for modern businesses.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:border-primary/60"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/0 blur-3xl transition-all duration-500 group-hover:bg-primary/30" />
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[0_0_20px_oklch(0.62_0.24_260/0.4)]">
                  <s.icon size={22} />
                </div>
                <h3 className="mt-5 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}