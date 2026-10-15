import { motion } from "framer-motion";
import { ShoppingBag, LayoutDashboard, CreditCard, Globe, MessageSquare } from "lucide-react";

const services = [
  {
    id: "ecommerce",
    href: "/services/ecommerce-website-development",
    title: "E-Commerce Website Development",
    icon: ShoppingBag,
    text: "We build scalable MERN stack e-commerce stores with secure checkout, product management, responsive design, customer authentication and performance optimization to help your business grow online.",
  },
  {
    id: "dashboards",
    title: "Custom Admin Dashboards",
    icon: LayoutDashboard,
    text: "Custom dashboards with analytics, role management, reporting, automation, secure authentication and real-time business monitoring, designed for growing companies and startups.",
  },
  {
    id: "pos",
    href: "/services/pos-billing-systems",
    title: "POS & Billing Software",
    icon: CreditCard,
    text: "POS and billing software for retail shops: counter billing, thermal receipt printing, inventory tracking, sales reports, customer credit records and multiple cashier logins. Works offline and backs up to the cloud.",
  },
  {
    id: "websites",
    title: "Business Websites",
    icon: Globe,
    text: "Responsive, fast-loading websites with modern UI/UX, an SEO-friendly structure, smooth animations and a scalable architecture for businesses and brands.",
  },
  {
    id: "chat-agents",
    title: "Chat-Based Agents",
    icon: MessageSquare,
    text: "Chat-based agents for online stores and business websites that answer product questions, explain your policies and, where your setup allows, update or record orders. Available as an add-on to your store or website.",
  },
];

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xl font-semibold uppercase tracking-widest text-primary-glow">
            Our Services
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
            E-Commerce, POS, Dashboard &amp;{" "}
            <span className="text-gradient">Chat Agent Services</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Custom MERN stack development for online stores, POS and billing systems, dashboards, and chat-based agents.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative w-full overflow-hidden rounded-3xl border border-border glass p-7 transition-all hover:-translate-y-1 hover:border-primary/60 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/0 blur-3xl transition-all duration-500 group-hover:bg-primary/30" />
                <div className="relative">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-[0_0_25px_oklch(0.62_0.24_260/0.45)]">
                    <Icon size={26} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.text}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                    {service.href && (
                      <a
                        href={service.href}
                        className="inline-flex items-center text-sm font-semibold text-primary-glow hover:underline"
                      >
                        Learn more &rarr;
                      </a>
                    )}
                    <a
                      href="#contact"
                      className="inline-flex items-center text-sm font-semibold text-primary-glow hover:underline"
                    >
                      Get a free quote &rarr;
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
