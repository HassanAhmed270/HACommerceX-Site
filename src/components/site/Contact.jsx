import { useRef, useState } from "react";
import axios from "axios";
import { Mail, Facebook, Send } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const projectTypes = [
  "E-commerce store",
  "POS / billing system",
  "Admin dashboard",
  "Business website",
  "Chat-based agent",
  "Other",
];

const inputClass =
  "mt-1.5 w-full rounded-xl border border-border bg-input/50 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30";

export function Contact() {
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      const apiBaseUrl =
        import.meta.env.VITE_API_URL ??
        (import.meta.env.DEV ? "http://localhost:3000" : "");
      const endpoint = `${apiBaseUrl.replace(/\/$/, "")}/api/sendEmail`;
      await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });
      // Clear the form only after the message was actually sent.
      formRef.current?.reset();
      toast.success(
        "Your Inquiry or Message is sent to HACommerceX. We will contact you shortly!"
      );
    } catch (error) {
      // Show the server's message only for validation errors (400). For anything
      // else, show a friendly fallback and keep what the visitor typed.
      const isValidationError =
        axios.isAxiosError(error) && error.response?.status === 400;
      const message =
        isValidationError && error.response?.data?.error
          ? String(error.response.data.error)
          : "We couldn't send your message right now. Your text is still in the form. Please try again, or email us at hacommercex@gmail.com.";
      toast.error(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-[800px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* HEADER */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary-glow">
            Get In Touch
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">
            Get a free quote for your project
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell us what you need and we&rsquo;ll reply within 24 hours. Based in Karachi, Pakistan, working with clients in Pakistan and worldwide.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          {/* FORM */}
          <motion.form
            ref={formRef}
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="contact-name" label="Name" name="name" placeholder="Your name" autoComplete="name" />
              <Field id="contact-email" label="Email" name="email" type="email" placeholder="you@company.com" autoComplete="email" />
            </div>

            <div className="mt-4">
              <label htmlFor="contact-project-type" className="text-xs font-medium text-muted-foreground">
                Project type
              </label>
              <select
                id="contact-project-type"
                required
                name="subject"
                defaultValue=""
                className={inputClass}
              >
                <option value="" disabled>
                  Select a project type
                </option>
                {projectTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label htmlFor="contact-message" className="text-xs font-medium text-muted-foreground">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                name="message"
                rows={5}
                placeholder="Tell us a bit about your project…"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.01] glow-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Sending..." : (<><Send size={16} aria-hidden="true" /> Send Message</>)}
            </button>
          </motion.form>

          {/* CONTACT LINKS */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            <ContactCard
              icon={Mail}
              label="Email"
              value="hacommercex@gmail.com"
              href="mailto:hacommercex@gmail.com"
            />
            <ContactCard
              icon={Send}
              label="WhatsApp"
              value="Message us on WhatsApp"
              href="https://wa.me/923348487499"
              accent
            />
            <ContactCard
              icon={Facebook}
              label="Facebook"
              value="HACommerceX Page"
              href="https://www.facebook.com/profile.php?id=61589157460349"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, name, type = "text", placeholder, autoComplete, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        id={id}
        required
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </div>
  );
}

function ContactCard({ icon: Icon, label, value, href, accent }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group flex items-center gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5 ${
        accent
          ? "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground glow-primary"
          : "glass hover:border-primary/60"
      }`}
    >
      <div
        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
          accent ? "bg-white/15" : "bg-primary/15 text-primary-glow"
        }`}
      >
        <Icon size={20} aria-hidden="true" />
      </div>
      <div>
        <div className={`text-xs ${accent ? "text-white/80" : "text-muted-foreground"}`}>
          {label}
        </div>
        <div className="font-semibold">{value}</div>
      </div>
    </a>
  );
}
