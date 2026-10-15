import { Head } from "vite-react-ssg";

const SITE = "https://hacommercex.vercel.app";

export function Seo({ title, description, path = "/", noindex = false, jsonLd }) {
  const url = SITE + (path === "/" ? "/" : path);
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="HACommerceX" />
      <meta property="og:image" content={SITE + "/og-image.png"} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="HACommerceX — MERN stack web development from Karachi, Pakistan" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={SITE + "/og-image.png"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {jsonLd ? <script type="application/ld+json">{JSON.stringify(jsonLd)}</script> : null}
    </Head>
  );
}
