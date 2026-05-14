import { useState } from "react";
import { Mail, MessageCircle, Facebook, Send, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { useSection } from "@/hooks/use-site-content";

const defaults = {
  eyebrow: "Get In Touch",
  title: "Let's build something great together.",
  subtitle: "Tell us about your project. We'll get back within 24 hours.",
  email: "hamommercex@gmail.com",
  phone: "",
  address: "",
  whatsapp: "",
  facebook: "",
};

export function Contact() {
  const c = useSection("contact", defaults);
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[800px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-glow">{c.eyebrow}</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
            {c.title}
          </h2>
          <p className="mt-4 text-muted-foreground">{c.subtitle}</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@company.com" />
            </div>
            <Field label="Subject" name="subject" placeholder="Project type" className="mt-4" />
            <div className="mt-4">
              <label className="text-xs font-medium text-muted-foreground">Message</label>
              <textarea
                required
                rows={5}
                placeholder="Tell us a bit about your project…"
                className="mt-1.5 w-full rounded-xl border border-border bg-input/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.01] glow-primary"
            >
              {sent ? "Message sent ✓" : (<><Send size={16}/> Send Message</>)}
            </button>
          </motion.form>

          <div className="flex flex-col gap-4 lg:col-span-2">
            {c.email && (
              <ContactCard icon={Mail} label="Email us" value={c.email} href={`mailto:${c.email}`} />
            )}
            {c.whatsapp && (
              <ContactCard icon={MessageCircle} label="WhatsApp" value="Chat with us instantly" href={c.whatsapp} accent />
            )}
            {c.facebook && (
              <ContactCard icon={Facebook} label="Facebook" value={c.facebook.replace(/^https?:\/\/(www\.)?facebook\.com\//, "@")} href={c.facebook} />
            )}
            {c.phone && (
              <ContactCard icon={MessageCircle} label="Phone" value={c.phone} href={`tel:${c.phone}`} />
            )}
            <div className="glass rounded-2xl p-5">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary-glow">Follow</div>
              <div className="mt-3 flex gap-2">
                {[Facebook, Instagram, Linkedin, MessageCircle].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary/50 text-muted-foreground transition-all hover:border-primary/60 hover:text-primary-glow"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder, className = "" }: { label: string; name: string; type?: string; placeholder?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border bg-input/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

function ContactCard({ icon: Icon, label, value, href, accent }: { icon: React.ElementType; label: string; value: string; href: string; accent?: boolean }) {
  return (
    <a
      href={href}
      className={`group flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 ${
        accent ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground glow-primary" : "glass hover:border-primary/60"
      }`}
    >
      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${accent ? "bg-white/15" : "bg-primary/15 text-primary-glow"}`}>
        <Icon size={20} />
      </div>
      <div>
        <div className={`text-xs ${accent ? "text-white/80" : "text-muted-foreground"}`}>{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </a>
  );
}