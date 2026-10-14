import partnerAka from "@/assets/partner-aka.webp";

const partners = [
  { name: "AKA_WMart", logo: partnerAka, url: "#" },
];

export function Partners() {
  return (
    <section id="partners" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xl font-semibold uppercase tracking-widest text-primary-glow">
            Trusted Partners
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Building with the best.
          </h2>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.url}
              className="group relative flex h-32 w-64 items-center justify-center overflow-hidden rounded-2xl glass-strong px-8 transition-all hover:-translate-y-1 hover:border-primary/60"
            >
              <div className="absolute inset-0 bg-white/95 transition-opacity group-hover:opacity-100" />
              <img
                src={p.logo}
                alt={p.name}
                loading="lazy"
                className="relative max-h-24 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
