import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import billingImg from "@/assets/portfolio-2.webp";
import storeImg from "@/assets/portfolio-1.webp";

const IMAGES = { billing: billingImg, store: storeImg };
import { services } from "../data/services.js";

const SITE = "https://hacommercex.vercel.app";

export function ServicePage({ slug }) {
  const s = services.find((x) => x.slug === slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: s.name,
        description: s.description,
        url: SITE + s.path,
        provider: { "@type": "Organization", name: "HACommerceX", url: SITE + "/" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
          { "@type": "ListItem", position: 2, name: s.name, item: SITE + s.path },
        ],
      },
    ],
  };
  return (
    <section className="mx-auto max-w-4xl px-6 pt-32 pb-24">
      <Seo path={s.path} title={s.title} description={s.description} jsonLd={jsonLd} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link to="/">Home</Link> / <span>{s.name}</span>
      </nav>
      <h1 className="text-4xl font-bold mb-4">{s.h1}</h1>
      <p className="text-lg text-muted-foreground mb-8">{s.intro}</p>
      {s.sections.map((sec) => (
        <div key={sec.h2} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{sec.h2}</h2>
          {sec.text ? <p className="text-muted-foreground">{sec.text}</p> : null}
          {sec.link ? (
            <p className="mt-3">
              <Link to={sec.link.to} className="underline">{sec.link.label}</Link>
            </p>
          ) : null}
          {sec.items ? (
            <ul className="space-y-3">
              {sec.items.map(([t, d]) => (
                <li key={t} className="text-muted-foreground">
                  <strong className="text-foreground">{t}:</strong> {d}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
      <img
        src={IMAGES[s.image]}
        alt={s.imageAlt}
        width="1200"
        height="900"
        loading="lazy"
        className="mb-10 w-full rounded-xl border border-white/10"
      />
      <h2 className="text-2xl font-semibold mb-4">How to get started</h2>
      <p className="text-muted-foreground mb-6">
        Tell us what you need, get a free quote, and we build it. See{" "}
        <Link to="/#how-we-work" className="underline">how we work</Link>.
      </p>
      <Link to="/#contact" className="inline-block rounded-md bg-primary px-5 py-3 text-primary-foreground">
        Get a free quote
      </Link>
    </section>
  );
}
