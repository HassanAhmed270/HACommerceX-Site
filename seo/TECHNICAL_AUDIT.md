# Technical, On-Page and JavaScript SEO Audit — 2026-10-14

Scope: repository snapshot `c84e224` plus limited live checks. Severity: High / Medium / Low. Confidence reflects how directly the evidence shows the problem.

## JavaScript SEO / rendering

| # | Finding | Evidence | Severity | Confidence | Proposed fix |
|---|---|---|---|---|---|
| J1 | Initial HTML contains no page content, headings or links, only `<div id="root">` and a script. Google can render JS, but content is delayed and other crawlers/AI tools may see nothing | built `dist/index.html` | High | High | Build-time prerender (see Phase 2). Short term: put key static copy and meta in `index.html` |
| J2 | Service descriptions exist only after a click (`selected` state, modal). They are not in the DOM on load | Services.jsx | High | High | Render descriptions visibly on the page (cards or sections) |
| J3 | Whole site is one URL; sections are hash anchors. Fragments are not separate indexable pages | Navbar.jsx, App.jsx | High (strategic) | High | Real routes per service, prerendered |
| J4 | Hero animations start at `opacity: 0` and move in (`framer-motion`), which can delay LCP for the H1 | Hero.jsx | Medium | Low (hypothesis, unmeasured) | Measure with Lighthouse first; render H1 without entry animation if LCP is slow |
| J5 | Not tested: rendered-HTML comparison via URL Inspection, console errors, hydration | no GSC / browser session available | n/a | n/a | Test once GSC access exists |

## Crawlability and indexation

| # | Finding | Evidence | Severity | Confidence | Fix |
|---|---|---|---|---|---|
| T1 | No `robots.txt` | `public/` has only favicon.png | Medium | High | Add `public/robots.txt` with sitemap line |
| T2 | No `sitemap.xml` | same | Medium | High | Add `public/sitemap.xml` (1 URL now; grows with pages) |
| T3 | `/robots.txt` and `/sitemap.xml` return the homepage shell on the live site | WebFetch returned homepage metadata for both | Medium | Medium (status code not seen) | Fixed by T1/T2; Vercel serves real files before rewrites |
| T4 | Catch-all rewrite sends every unknown URL to `index.html`, so bad URLs likely return 200 (soft 404) | vercel.json | Medium | Medium (status codes unverified) | Once real routes exist, add a proper not-found route or limit rewrites to known paths |
| T5 | No `<link rel="canonical">` | index.html | Medium | High | Add canonical to the preferred hostname |
| T6 | Production URL is `*.vercel.app`; preview deployments may be indexable | n/a | Low–Medium | Low | Decide on custom domain; noindex previews |
| T7 | No security/cache headers configured | vercel.json | Low | High | Optional later |

## Performance (local build; no field or PSI data)

| # | Finding | Evidence | Severity | Fix |
|---|---|---|---|---|
| P1 | Images total ~7.4 MB: portfolio JPGs 1.16–1.78 MB each, `logo.png` 910 KB, `partner-aka.png` 244 KB | `dist/assets` listing | High | Resize to display size, convert to WebP/AVIF, `srcset` |
| P2 | `favicon.png` is the same 909,724-byte file as the logo | `dist/favicon.png` | Medium | Make 32/180/512 px icons |
| P3 | Logo (910 KB) is loaded eagerly in navbar at 36 px and again in footer | Navbar.jsx, Footer.jsx | Medium | Same fix as P1 |
| P4 | JS bundle 363 KB raw / 118 KB gzip; CSS 40.5 KB / 7.6 KB gzip | vite build | Low–Medium | Acceptable; revisit after images |
| P5 | Google Fonts loaded via render-blocking stylesheet, 2 families | index.html | Low–Medium | Self-host or trim weights |

Good: portfolio images already use `loading="lazy"` with width/height; hero SVG is 6 KB.

## On-page

| # | Finding | Evidence | Severity | Fix |
|---|---|---|---|---|
| O1 | H1 "We Build Modern Digital Solutions For Businesses" has no service, tech or market keywords | Hero.jsx | High | Rewrite to state what, for whom, where (needs owner input on location) |
| O2 | `og:title` ("HACommerceX Solutions") differs from `<title>`; no og:image, og:url, twitter card | index.html | Medium | Complete the set; create a 1200×630 share image |
| O3 | Meta description mentions mobile apps; no mobile-app service exists on the page | index.html vs Services.jsx | Medium | Align copy to verified services |
| O4 | Duplicate IDs: `home`, `about`, `services`, `portfolio`, `partners`, `contact` appear on both the wrapper div (App.jsx) and the section (components). Invalid HTML | App.jsx + components | Low–Medium | Keep one per section |
| O5 | Service cards are `div onClick`, not links/buttons; modal has no `role="dialog"`, close button has no label | Services.jsx | Medium (a11y + crawl) | Semantic markup |
| O6 | Portfolio entries have no links, no case studies, generic alt text (= title) | Portfolio.jsx | Medium | Case-study pages later; descriptive alts |
| O7 | Partners link `href="#"` goes nowhere | Partners.jsx | Low | Real URL or remove link |
| O8 | No privacy policy / terms page, while a form collects personal data | whole site | Medium (trust) | Add simple policy page |
| O9 | No structured data | index.html | Medium | Organization + WebSite (verified facts only) |

## Trust and conversion

| # | Finding | Evidence | Severity | Fix |
|---|---|---|---|---|
| C1 | **Form wipes the user's message even when sending fails**: `setShouldResetForm(true)` runs before the request, and the reset effect fires regardless of outcome | Contact.jsx lines ~29–45 | High | Reset only on success |
| C2 | "90.5% Uptime SLA" implies roughly 35 days of downtime per year, and is likely a typo or an unverifiable claim | Hero.jsx | High (trust) | Confirm the real figure or remove |
| C3 | "10+ Projects Delivered", "9+ Happy Clients", "24/7 Support", "enterprise-grade security" are unverified in the repo | Hero.jsx, About.jsx | Medium | Owner to confirm; otherwise soften |
| C4 | Two different emails: contact card `hacommercex@gmail.com`; footer text `hello@hacommercex.com` (not a link) | Contact.jsx, Footer.jsx | Medium | Use one |
| C5 | No pricing guidance, process, timelines, or location | whole site | Medium | Discuss content plan |
| C6 | API sets `Access-Control-Allow-Origin: *` and has no spam protection (honeypot / rate limit). Not SEO, but spam can bury real leads | api/index.js | Low–Medium | Schedule separately |

## Week 1 resolution status (2026-10-14, branch `seo-phase1-week1`, awaiting deploy)

| Item | Status |
|---|---|
| T1, T2 (robots, sitemap) | Fixed in code; served correctly by local build. Live check pending deploy |
| T3 (shell served for those URLs) | Expected to resolve once the real files deploy (Vercel serves static files before rewrites); unverified live |
| T5 (canonical) | Fixed in `index.html` |
| O2 (OG title mismatch, no image/url/twitter) | Fixed |
| O3 (mobile apps in description) | Fixed (removed) |
| P1, P2, P3 (images, favicon) | Fixed: dist 7.5 MB to 888 KB (local build, not field data) |
| C1 (form wipes message) | Fixed; behaviour tests pass, and fail on the original code |
| C6 partly (server config errors shown to visitors) | Fixed in the client; CORS and spam protection still open |
| Still open | J1-J4, T4, T6, T7, P4, P5, O1, O4-O9, C2-C5 |

## Week 2 resolution status (2026-10-15, awaiting deploy)

| Item | Status |
|---|---|
| J2 (service text only in click modal) | Fixed: visible text on every card, modal removed |
| O1 (H1 without service/market) | Fixed |
| O3 (mobile apps claim) | Fixed (removed everywhere) |
| O4 (duplicate IDs) | Fixed: 0 duplicates in rendered DOM |
| O5 (div cards, unlabeled modal) | Fixed: semantic article/heading/link cards; modal gone |
| O6 (alt text = title, no labels) | Partly fixed: descriptive alt text + Client/Demo labels; no case-study pages or live links yet |
| O7 (partner link href="#") | Fixed: section is now "Clients", no dead link |
| O9 (no structured data) | Fixed in code (Organization, WebSite); external validation pending deploy |
| C2, C3 (unverifiable hero claims) | Fixed: removed |
| C4 (two emails) | Fixed: single address |
| C5 (no location/process) | Partly fixed: Karachi, worldwide, How we work; no pricing info by choice |
| Form labels not tied to inputs | Fixed |
| Still open | J1 (empty initial HTML), J3 (single URL), J4, T4, T6, T7, P4, P5, O8 (privacy page), C6 (CORS wildcard, spam protection) |

## Validation status

Verified from code: J1–J3, T1–T2, T5, P1–P5, O1–O9, C1–C6. Verified by live fetch: T3 (partial). Not verified: HTTP status codes, response headers, rendered output in Google, CWV, console errors, indexing.

## Update 2026-10-16 (after Phase 2 + Phase 3 built)
| Item | Status |
|---|---|
| J1 (empty initial HTML), J3 (single URL), T4 (soft 404) | Fixed in Phase 2: build-time prerender, 7 real URLs, prerendered 404 page. Owner tested on a Vercel preview: pages, refresh, 404, menu links, raw HTML OK. Live behaviour of the 404 status code and headers still to be confirmed with Search Console / curl on production |
| O8 (privacy page) | Fixed: `/privacy` live; wording confirmed by the owner 2026-10-16 |
| C6 (CORS wildcard, no spam protection) | Fixed in Phase 3 (built; awaiting deploy): origin allow-list (production, this project's Vercel previews, localhost), 403 for other sites, honeypot field, length limits, email format check, header-injection strip. Limit: scripts with no Origin header can still post valid messages; no rate limit (serverless, no shared store). Add rate limiting or a CAPTCHA only if spam appears |
| P5 (render-blocking Google Fonts) | Changed in Phase 3 (built; awaiting deploy): non-blocking `preload` + `onload` swap with `noscript` fallback; `display=swap` kept. Effect on LCP **not measured**: run PageSpeed Insights before/after on the live URL |
| Search Console | Verified 2026-10-15 (HTML file `public/googleab313ebbe643e1c8.html`, keep it); sitemap submitted (Success); URL-inspection indexing requests blocked by daily quota, retry 2026-10-17. Bing imported from Search Console; dashboard data pending (up to 48 h) |
| Structured data | Owner ran the tools 2026-10-15: Rich Results Test shows Breadcrumbs, no errors (POS page); Schema validator shows Organization, no errors (home page) |
| Still open | T6 (preview URLs may be indexable; consider noindex for previews), T7 (security/cache headers), J4 (hero animation vs LCP; unmeasured), indexing and Core Web Vitals field data |

## Incident 2026-10-16: /api/sendEmail 404 after Phase 2
`cleanUrls: true` + rewrite destination `/api/index.js` = function not found (see CHANGELOG hotfix entry). Fixed by renaming the function to `api/sendEmail.js` and removing the rewrite. Lesson: any change to `vercel.json`, `api/` or the form must be tested with a real submission on a preview before merge.

