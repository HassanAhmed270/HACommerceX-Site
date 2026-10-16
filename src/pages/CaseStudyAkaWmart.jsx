import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";
import storeImg from "@/assets/portfolio-1.webp";

const SITE = "https://hacommercex.vercel.app";
const PATH = "/case-studies/aka-wmart-online-watch-store";
const TITLE = "AKA_WMart Case Study: Online Watch Store in Karachi | HACommerceX";
const DESC =
  "How HACommerceX built AKA_WMart, an online store for pre-owned and new watches in Karachi, with an admin dashboard for listings and orders.";

const FEATURES = [
  "Product catalogue covering pre-owned and new watches",
  "Search and filters",
  "Cart and checkout",
  "Customer accounts",
  "Admin dashboard to list watches and manage orders",
  "Order status updates and email notifications",
  "Stock and coupon management",
  "WhatsApp contact for customers",
];

export function CaseStudyAkaWmart() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE + "/" },
      { "@type": "ListItem", position: 2, name: "AKA_WMart case study", item: SITE + PATH },
    ],
  };
  return (
    <section className="mx-auto max-w-4xl px-6 pt-32 pb-24">
      <Seo path={PATH} title={TITLE} description={DESC} jsonLd={jsonLd} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link to="/">Home</Link> / <span>AKA_WMart case study</span>
      </nav>
      <h1 className="text-4xl font-bold mb-4">
        AKA_WMart: Online Watch Store Built for a Karachi Dropshipping Business
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        AKA_WMart is a Karachi business that sells pre-owned and new watches online. It does not hold
        stock: when a customer orders, the watch is sourced and delivered to them. HACommerceX built the
        store and the admin tools behind it. The site is live and the business is trading.{" "}
        <a href="https://aka-wmart.vercel.app" target="_blank" rel="noopener noreferrer" className="underline">
          Visit the live store
        </a>{" "}
        (shown with the owner&rsquo;s permission).
      </p>
      <img
        src={storeImg}
        alt="AKA_WMart online watch store homepage shown on a laptop screen"
        width={1200}
        height={900}
        loading="lazy"
        className="mb-10 w-full rounded-xl border border-white/10"
      />
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">The need</h2>
        <p className="text-muted-foreground">
          A dropshipping business has to list watches quickly, take orders, and keep track of each order
          from sourcing to delivery.
        </p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">What we built</h2>
        <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
          {FEATURES.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Result</h2>
        <p className="text-muted-foreground">
          The store is live and in daily operation. We do not claim sales or traffic figures here.
        </p>
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Related services</h2>
        <ul className="space-y-2">
          <li>
            <Link to="/services/ecommerce-website-development" className="underline">
              E-Commerce Website Development
            </Link>
          </li>
          <li>
            <Link to="/services/custom-admin-dashboards" className="underline">
              Custom Admin Dashboards
            </Link>
          </li>
        </ul>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Need a store like this?</h2>
      <p className="text-muted-foreground mb-6">Tell us what you sell and get a free quote.</p>
      <Link to="/#contact" className="inline-block rounded-md bg-primary-solid px-5 py-3 text-primary-foreground">
        Get a free quote
      </Link>
    </section>
  );
}
