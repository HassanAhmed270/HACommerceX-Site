# Changelog

## 2026-10-15 - Phase 1, Week 2 (branch `seo-phase1-week1`, not yet deployed)
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

## 2026-10-14 — Phase 1, Week 1 (branch `seo-phase1-week1`, not yet deployed)
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
