import logo from "@/assets/logo.webp";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <img src={logo} alt="HACommerceX" width={36} height={36} className="h-9 w-9 rounded-lg" />
              <span className="font-display text-lg font-bold">
                HA<span className="text-primary-glow">CommerceX</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Karachi-based MERN stack studio building online stores, POS and billing systems, dashboards and chat-based agents for businesses in Pakistan and worldwide.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary-glow">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="/#about" className="hover:text-foreground">About</a></li>
              <li><a href="/#services" className="hover:text-foreground">Services</a></li>
              <li><a href="/#portfolio" className="hover:text-foreground">Portfolio</a></li>
              <li><a href="/#clients" className="hover:text-foreground">Clients</a></li>
              <li><a href="/#contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary-glow">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:hacommercex@gmail.com" className="hover:text-foreground">
                  hacommercex@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923348487499"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground"
                >
                  WhatsApp
                </a>
              </li>
              <li>Karachi, Pakistan</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <div suppressHydrationWarning>© {new Date().getFullYear()} HACommerceX Solutions. All rights reserved.</div>
          <div>BUILD • DESIGN • GROW</div>
        </div>
      </div>
    </footer>
  );
}
