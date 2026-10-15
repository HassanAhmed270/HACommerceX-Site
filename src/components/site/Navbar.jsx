import { useEffect, useState } from "react";
import logo from "@/assets/logo.webp";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const scrollToSection = (event, href) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    setOpen(false);
    const sectionId = href.slice(1);
    const target = document.getElementById(sectionId);
    if (!target) return;
    window.history.pushState(null, "", href);
    target.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "py-2" : "py-4"}`}
      style={{ backfaceVisibility: "hidden", contain: "layout style" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 ${scrolled ? "glass-strong" : "glass"}`}
        >
          <a href="#home" onClick={(e) => scrollToSection(e, "#home")} className="flex items-center gap-2">
            <img src={logo} alt="HACommerceX" className="h-9 w-9 rounded-lg object-cover" />
            <span className="font-display text-lg font-bold">
              HA<span className="text-primary-glow">CommerceX</span>
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => scrollToSection(e, l.href)}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="hidden rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_30px_oklch(0.62_0.24_260/0.4)] transition-all hover:scale-[1.03] hover:shadow-[0_0_50px_oklch(0.62_0.24_260/0.6)] lg:inline-flex"
          >
            Get a Free Quote
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden rounded-lg border border-border p-2 text-foreground"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </nav>

        {open && (
          <div className="mt-2 glass-strong rounded-2xl p-4 lg:hidden">
            <ul className="flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => scrollToSection(e, l.href)}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="block rounded-lg bg-primary px-3 py-2 text-center text-sm font-semibold text-primary-foreground"
                >
                  Get a Free Quote
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
