# HACommerceX — SEO Master Record

Last updated: 2026-10-14 · Repo snapshot: `c84e224` ("Claude Optimised Vite Version", 2026-06-05) · Status: **baseline audit complete, strategy awaiting discussion**

## 1. Verified facts about the site

| Item | Fact | Evidence |
|---|---|---|
| Stack | Vite 5 + React 18 SPA, Tailwind 4, framer-motion; Express `server/index.js` for local dev; Vercel serverless `api/index.js` for `/api/sendEmail` | package.json, vite.config.js, api/index.js |
| Rendering | Pure client-side rendering. Built `dist/index.html` has an empty `<div id="root">` and one module script | local `vite build` output |
| URLs | One indexable URL (`/`). Navigation uses `#about`, `#services` etc. anchors | Navbar.jsx, App.jsx |
| Vercel routing | `vercel.json` rewrites `/(.*)` to `/index.html` (after `/api/*`) | vercel.json |
| robots.txt / sitemap.xml | Not in repo (`public/` holds only `favicon.png`). Live fetches of both URLs returned the homepage shell, not real files | repo listing; WebFetch 2026-10-14 |
| Meta in `index.html` | title, description, author, og:title, og:description, og:type. **Missing:** canonical, og:image, og:url, og:site_name, twitter:*, theme-color, JSON-LD | index.html |
| Services | 4: E-Commerce Stores, Custom Dashboards, POS Systems, Business Websites. Full descriptions render only inside a click-opened modal | Services.jsx |
| Portfolio | 4 projects (AKA_WMart Storefront, Smart Retail Billing, Business Analytics Dashboard, Clean Nest Business Website); no links, no case-study pages | Portfolio.jsx |
| Conversion paths | Contact form (POST `/api/sendEmail`), mailto `hacommercex@gmail.com`, WhatsApp `wa.me/923348487499`, Facebook page | Contact.jsx |
| Location signal | None anywhere on the site (no city, country or address) | all components |

## 2. Not yet measured (do not treat as known)

- Search Console data, indexed-page count, queries, impressions, clicks (no access yet)
- Analytics / leads / conversion rate (no analytics snippet found in the repo)
- Core Web Vitals field data; PageSpeed Insights call failed in this session, so no lab numbers either
- Live HTTP status codes and response headers (shell cannot reach vercel.app from this workspace)
- Backlink profile / referring domains

## 3. Strategic constraint (the big one)

A one-URL site can only target one set of keywords. Services, POS, e-commerce and Karachi/Pakistan intent all compete on a single page. Long-term growth needs separate, prerendered service pages. This is an architecture decision and is **awaiting discussion** (see NEXT_ACTIONS.md, item 6).

## 4. Decisions log

| Date | Decision | Status |
|---|---|---|
| 2026-10-14 | Keep Vite/React for now; do not assume Next.js | Agreed for Phase 1; architecture revisited in Phase 2 |
| 2026-10-14 | Phase 1 = quick wins with no architecture change | Approved; Week 1 built, awaiting deploy |
| 2026-10-14 | Official address stays `https://hacommercex.vercel.app` (no custom domain now) | Decided by owner |
| 2026-10-14 | Location: based in Karachi, no physical address; open to in-person meetings in Karachi and remote/freelance work worldwide. No LocalBusiness schema, no map, no Google Business Profile | Decided by owner |
| 2026-10-14 | Single public email: `hacommercex@gmail.com` | Decided by owner |
| 2026-10-14 | Hero stats "10+ Projects", "9+ Happy Clients", "90.5% Uptime SLA", "24/7 Support" to be removed (owner has had 2 clients); replaced in Week 2 with verifiable facts | Decided; Week 2 |
| 2026-10-14 | Contact form test by owner: no email received; likely missing Vercel SMTP variables | Owner action pending |

## 5. Open questions for the owner

Answered 2026-10-14: location, hero stats, canonical email, custom domain (none), contact-form status.

Still open:
1. Do you offer mobile apps? (Removed from the meta description for now; the services list does not include it.)
2. Do you offer FBR POS integration for retail clients? (Potential local differentiator; capability unconfirmed.)
3. Can you create Google Search Console and Bing Webmaster access for `hacommercex.vercel.app`?
4. Can the portfolio projects be named publicly with links, and are there client permissions or real outcomes you can share?
5. What are your real Facebook/LinkedIn/GitHub profile URLs for brand profiles and schema `sameAs`?
