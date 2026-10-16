# Changelog

## 2026-10-16 - HOTFIX: contact form returned 404 on production (cause: Phase 2 `vercel.json`)
Symptom: owner saw "We couldn't send your message right now"; browser Network tab showed `POST /api/sendEmail` = 404 (0.2 kB, Vercel platform 404, not our 404 page); no function logs because the function never ran.
Cause (mine, introduced in Phase 2, commit a0e2fa7): `cleanUrls: true` makes Vercel serve functions without extension (`/api/index`), but the rewrite destination was still `/api/index.js`, which no longer exists, so every `/api/*` request hit Vercel's `/api` 404 rule. Vercel docs: with `cleanUrls`, do not include the file extension in rewrite source or destination. I did not test the form on the Phase 2 preview; that was a gap in my checks.
Reproduced locally with Vercel's own build tool (`vercel build`): old config routes `/api/*` to `/api/index.js` (missing) then to the `^/api` 404 rule; new config has function `/api/sendEmail` and no rewrite.
Fix: renamed `api/index.js` to `api/sendEmail.js` (Vercel serves it natively at `/api/sendEmail`, same URL the form already calls) and removed the `/api` rewrite from `vercel.json`. No code logic change.
Verified: `vercel build` output lists function `api/sendEmail` and no custom `/api` rewrite; handler tests from Phase 3 still apply (same file content).
Not verified until deployed: a real POST on Vercel. Test on the preview: Network tab must NOT show 404 (500 or 200 both prove routing; 500 on a preview only means Preview env vars are missing).
Process change: every delivery that touches `vercel.json`, `api/` or the form now requires sending a real test message from the preview (added to the checklist).
Rollback: revert this commit (form stays broken as before).

## 2026-10-16 - Phase 3: contact form protection + non-blocking fonts (built; awaiting deploy)
| Area | Change | Files |
|---|---|---|
| Form API | CORS no longer `*`: only production, `hacommercex*.vercel.app` previews and localhost; other origins get 403 | `api/index.js` |
| Form API | Honeypot field (`contact_website`): filled = silent success, nothing sent; max lengths (name 100, email 254, subject 100, message 5000); email format check; non-string fields rejected; line breaks stripped from subject | `api/index.js` |
| Form UI | Hidden honeypot input (off-screen, `tabIndex=-1`, `aria-hidden`); `maxLength` on inputs; payload includes the honeypot | `Contact.jsx` |
| Fonts | Google Fonts stylesheet loaded with `preload` + `onload` (non-blocking), `noscript` fallback | `index.html` |
| Records | Privacy wording confirmed by owner; audit update; listings tracker (`LINK_OPPORTUNITIES.md`); next actions | `seo/*` |

Verified: 12 server-side cases (allowed origins, evil and lookalike origins, honeypot, bad email, empty and too-long fields, non-string field, GET/OPTIONS); a valid message delivered through a fake SMTP server with header-injection stripped and HTML escaped; browser test (hidden honeypot off-screen, no horizontal scroll, payload shape, form clears on success, maxlength attributes); build prerenders 8 pages; fonts link is `preload` in the built HTML.
Not verified: real email delivery on production (needs one test message after deploy); LCP effect of the font change (not measured). Privacy page unchanged: it still correctly says fonts load from Google Fonts and the site sets no cookies.
Rollback: do not merge, or `git revert -m 1 <merge commit>`.

## 2026-10-15 - Phase 2e: Chat-Based Agents page + Privacy Policy (built; awaiting deploy)
`/services/chat-based-agents` (short add-on page; text from the owner-approved Services card; no client project, no vendor/model claims, no results). `/privacy`: plain-language policy based on verified code facts (form fields name/email/project type/message, emailed to hacommercex@gmail.com via the server, Vercel hosting, Google Fonts, no own cookies/storage/analytics found in the code). Owner to confirm the retention/deletion sentence. Footer links to /privacy; both URLs added to the sitemap.
Not legal advice; review if analytics or ads are added later.

## 2026-10-15 - Phase 2d: Business Website Development page (DEPLOYED; main 053b18c)
New page `/services/business-website-development`. Facts from the portfolio/Services copy only: responsive React/Tailwind/Framer Motion sites, service information, contact support, clean modern design, SEO-friendly structure; Clean Nest named as a client project. Internal links to the E-Commerce and Dashboards pages. No prices, timelines or results claimed.

## 2026-10-15 - Phase 2c: Custom Admin Dashboards page (built; owner tested the preview)
New page `/services/custom-admin-dashboards`. Owner asked to use existing verified information. Claims limited to what the portfolio/demo and client projects show: sales analytics, orders overview, product management, secure login, role-based access. Deliberately NOT claimed: real-time monitoring, automation, exports, integrations (not confirmed). Demo dashboard referred to as a demo.

## 2026-10-15 - Phase 2b: E-Commerce service page (DEPLOYED; owner tested preview and merged)
New page `/services/ecommerce-website-development`; content approved with the owner section by section. Facts used: COD, Stripe card payments, catalogue, search/filters, checkout, accounts, WhatsApp, admin dashboard, order management, stock, coupons, email notifications, mobile-friendly (all owner-confirmed). Easypaisa/local wallets stated as "not built yet, can be built on request". No prices, timelines, barcodes or results. Files: `src/data/services.js`, `src/pages/ServicePage.jsx` (image map + link support), `Services.jsx` (card links to the page), `public/sitemap.xml`.
Verified locally: raw HTML has title, canonical, one H1, 5 H2, Service + BreadcrumbList JSON-LD.
Not verified: live behaviour, indexing.

## 2026-10-15 - Phase 2 (build-time prerender + first service page) - DEPLOYED (main a0e2fa7; owner tested a Vercel preview: pages, refresh, 404, menu links, raw HTML all OK)
Approved with the owner: option B (separate prerendered pages on the existing Vite + React site; homepage keeps its single-page scroll look).

| Area | Change | Files |
|---|---|---|
| Rendering | `vite-react-ssg` prerenders every route to static HTML (homepage content is now in the initial HTML) | `package.json`, `vite.config.js`, `src/main.jsx`, `src/routes.jsx`, `src/Layout.jsx` |
| Head tags | Per-page title, description, canonical, Open Graph, Twitter via a `Seo` component; page-specific tags removed from `index.html` | `src/components/Seo.jsx`, `index.html` |
| New page | `/services/pos-billing-systems` (retail POS; owner-confirmed features only; Service + BreadcrumbList JSON-LD) | `src/pages/ServicePage.jsx`, `src/data/services.js` |
| 404 | Prerendered `404.html` with `noindex` | `src/pages/NotFound.jsx`, `src/routes.jsx` |
| Navigation | Menu/footer links are `/#section`; scroll on the homepage, navigate from sub-pages; POS card links to the new page | `Navbar.jsx`, `Footer.jsx`, `Services.jsx` |
| Hosting | `cleanUrls: true` in `vercel.json`; local Express server serves `.html` and a real 404 | `vercel.json`, `server/index.js` |
| Sitemap | Added the POS page | `public/sitemap.xml` |

Verified locally (build + headless Chromium): raw HTML of `/`, the POS page and 404 contains content, title, description, canonical, JSON-LD; no hydration or console errors; homepage looks unchanged; menu links work from the service page; no horizontal scroll at 390 px. Bundle 121 KB to about 153 KB gzip.
Not verified: behaviour on Vercel (clean URLs, real 404 status, response headers, charset); indexing; Core Web Vitals. To be checked on the Vercel preview URL.
Rollback: do not merge the branch, or `git revert` the merge commit.

## 2026-10-15 - Phase 1, Week 2 (DEPLOYED; GitHub main `2d81564` verified identical to the tested build; owner confirmed the live site looks right)
Approved section by section with the owner. Facts only; no invented claims.

| Area | Change | Files |
|---|---|---|
| Hero | H1 "We Build Modern E-Commerce, POS & Web Apps For Growing Businesses"; paragraph names Karachi + MERN + services; buttons "Get a Free Quote" / "View Our Work"; 4 unverifiable stats replaced with true ones (Free quote, MERN, Karachi, 24h reply) | `Hero.jsx` |
| Services | Descriptions now visible on the page (modal removed); 5 cards incl. new "Chat-Based Agents" (add-on); POS card mentions thermal receipt printing and desktop/cloud; barcode removed; each card links to the form; H2 names the services | `Services.jsx` |
| About | Karachi + founder (Hassan Ahmed) stated; mobile apps and "enterprise" claims removed | `About.jsx` |
| How we work | "Why HACommerceX" (generic, duplicated claims) replaced by a 4-step process | `HowWeWork.jsx` (new), `Features.jsx` deleted |
| Portfolio | Descriptive H2; "Client project" / "Demo project" labels; real alt text; billing card updated (thermal printing, desktop + cloud) | `Portfolio.jsx` |
| Clients | "Partners" became "Clients"; added Items Hub logo (cleaned from a 112x32 original); dead `#` link removed | `Clients.jsx` (new), `Partners.jsx` deleted, `client-items-hub.webp` |
| Contact | Heading "Get a free quote for your project"; Karachi line; Project type dropdown; labels tied to inputs; WhatsApp wording; Facebook permanent URL | `Contact.jsx` |
| Nav + footer | Clients link; "Get a Free Quote"; single public email, real WhatsApp link, "Karachi, Pakistan", no street address | `Navbar.jsx`, `Footer.jsx` |
| Structured data | Organization + WebSite JSON-LD (no street address, ratings, prices or map) | `index.html` |
| Fixes | Duplicate section IDs removed; scroll offset under fixed header | `App.jsx`, sections |

Verified (local build + headless Chromium): one H1, logical H2/H3 outline, no duplicate IDs, all in-page links resolve, all images have alt text and load, no horizontal scroll at 1440 and 390 px, JSON-LD parses (Organization, WebSite), form keeps text on a 500 and clears on success, no server config text shown to visitors. Not verified: Google Rich Results / Schema Validator (needs live URL), live headers, indexing, Core Web Vitals.
Rollback: `git revert` the Week 2 commit.

## 2026-10-14 — Phase 1, Week 1 (DEPLOYED; owner confirmed live robots.txt, sitemap and working form)
Approved scope: crawl files + metadata, image weight, contact form fix. Canonical host: `https://hacommercex.vercel.app`.

| Change | Files | Verified |
|---|---|---|
| Added `robots.txt` (allow all, disallow `/api/`, sitemap line) and one-URL `sitemap.xml` | `public/robots.txt`, `public/sitemap.xml` | Served 200 with correct content types from local build of `dist` |
| New title and description; canonical; Open Graph (incl. og:image, url, site_name); Twitter card; theme-color; icon links | `index.html` | Tags present in served HTML |
| Share image 1200×630 | `public/og-image.png` | Visually checked |
| Favicon set (32, 192, 180 px) replacing the 909 KB favicon | `public/favicon.png`, `favicon-32.png`, `apple-touch-icon.png` | Served 200 |
| Images converted/resized to WebP: portfolio ×4, logo, partner logo; old PNG/JPG removed (remain in git history) | `src/assets/*.webp`, `Navbar.jsx`, `Footer.jsx`, `Portfolio.jsx`, `Partners.jsx` | Build passes; visual spot-check of 2 images |
| Contact form keeps the visitor's text on failure, clears only on success; friendly error with email fallback; server config errors no longer shown to visitors | `src/components/site/Contact.jsx` | 4 behaviour tests pass on new code; 3 of them fail on the original code (bug reproduced) |

Measured effect (local build, not field data): `dist` 7.5 MB → 888 KB; image assets ≈ 7.4 MB → ≈ 0.3 MB; JS 363 KB → 367 KB raw (118 → 121 KB gzip, from the inlined 2 KB logo).

Not verified: live HTTP status/headers after deploy, indexing, Core Web Vitals, rendering in Google. Rollback: `git revert` the Week 1 commit.

## 2026-10-14 — Baseline
- Cloned repo (commit `c84e224`), local build, created `seo/` knowledge base. No site code changed.
