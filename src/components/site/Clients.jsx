import akaLogo from "@/assets/partner-aka.webp";
import itemsHubLogo from "@/assets/client-items-hub.webp";

const clients = [
  { name: "AKA_WMart", logo: akaLogo, width: 512, height: 313 },
  { name: "Items Hub", logo: itemsHubLogo, width: 588, height: 114 },
];

export function Clients() {
  return (
    <section id="clients" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xl font-semibold uppercase tracking-widest text-primary-glow">
            Our Clients
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Businesses we&rsquo;ve built for
          </h2>
        </div>

        <ul className="mt-12 flex flex-wrap items-center justify-center gap-6">
          {clients.map((c) => (
            <li
              key={c.name}
              className="relative flex h-32 w-64 items-center justify-center overflow-hidden rounded-2xl glass-strong px-8"
            >
              <div className="absolute inset-0 bg-white/95" />
              <img
                src={c.logo}
                alt={`${c.name} logo`}
                width={c.width}
                height={c.height}
                loading="lazy"
                className="relative max-h-24 w-auto max-w-full object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
