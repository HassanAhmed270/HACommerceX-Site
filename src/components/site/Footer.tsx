import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <img src={logo} alt="HACommerceX" className="h-9 w-9 rounded-lg" />
              <span className="font-display text-lg font-bold">
                HA<span className="text-primary-glow">CommerceX</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Premium MERN Stack software solutions. Build. Design. Grow.
            </p>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary-glow">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground">About</a></li>
              <li><a href="#services" className="hover:text-foreground">Services</a></li>
              <li><a href="#portfolio" className="hover:text-foreground">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary-glow">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>hello@hacommercex.com</li>
              <li>WhatsApp Support</li>
              <li>24/7 Online</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} HACommerceX Solutions. All rights reserved.</div>
          <div>BUILD • DESIGN • GROW</div>
        </div>
      </div>
    </footer>
  );
}