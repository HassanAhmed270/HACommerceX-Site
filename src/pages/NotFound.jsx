import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";

export function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-40 pb-32 text-center">
      <Seo path="/404" noindex title="Page not found | HACommerceX" description="This page does not exist." />
      <h1 className="text-4xl font-bold mb-4">Page not found</h1>
      <p className="mb-8 text-muted-foreground">The page you are looking for does not exist.</p>
      <Link to="/" className="underline">Back to the homepage</Link>
    </section>
  );
}
