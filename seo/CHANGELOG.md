# Changelog

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
