import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import billingImg from "@/assets/portfolio-2.webp";
import storeImg from "@/assets/portfolio-1.webp";
import dashboardImg from "@/assets/portfolio-3.webp";
import websiteImg from "@/assets/portfolio-4.webp";

const IMAGES = {
  billing: { src: billingImg, w: 1200, h: 900 },
  store: { src: storeImg, w: 1200, h: 900 },
  dashboard: { src: dashboardImg, w: 1200, h: 800 },
  website: { src: websiteImg, w: 1200, h: 800 },
};
import { services, relatedServices } from "../data/services.js";

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
          {sec.links ? (
            <ul className="mt-3 space-y-2">
              {sec.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="underline">{l.label}</Link>
                </li>
              ))}
            </ul>
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
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Related services</h2>
        <ul className="space-y-2">
          {(relatedServices[s.slug] || []).map((slug) => {
            const r = services.find((x) => x.slug === slug);
            return r ? (
              <li key={slug}>
                <Link to={r.path} className="underline">{r.name}</Link>
              </li>
            ) : null;
          })}
        </ul>
      </div>
      {s.image ? (
      <img
        src={IMAGES[s.image].src}
        alt={s.imageAlt}
        width={IMAGES[s.image].w}
        height={IMAGES[s.image].h}
        loading="lazy"
        className="mb-10 w-full rounded-xl border border-white/10"
      />
      ) : null}
      <h2 className="text-2xl font-semibold mb-4">How to get started</h2>
      <p className="text-muted-foreground mb-6">
        Tell us what you need, get a free quote, and we build it. See{" "}
        <Link to="/#how-we-work" className="underline">how we work</Link>.
      </p>
      <Link to="/#contact" className="inline-block rounded-md bg-primary-solid px-5 py-3 text-primary-foreground">
        Get a free quote
      </Link>
    </section>
  );
}
