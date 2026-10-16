# Next Actions — prioritized (updated 2026-10-15)

Priority Score = (Impact×0.30 + Confidence×0.25 + SEO×0.20 + Efficiency×0.15 + Strategic×0.10) × 20. A prioritization aid, not a ranking prediction.

| # | Task | Score | Status |
|---|---|---|---|
| 1 | Set up Search Console + Bing Webmaster + analytics baseline; request indexing of all 7 URLs | 93.0 | **In progress (2026-10-15):** Search Console verified (HTML file in `public/` - keep it), sitemap submitted (Success), Bing imported from Search Console (shows nothing yet, normal). **Pending 2026-10-16:** request indexing for the 7 URLs (daily quota) |
| 2 | `robots.txt`, `sitemap.xml`, canonical, OG/Twitter meta, share image | 92.0 | Deployed (owner confirmed) |
| 3 | Render service content visibly + keyword-aligned H1/intro; replace inflated hero stats | 86.0 | Deployed (owner confirmed) |
| 4 | Compress/resize images, favicon set | 83.0 | Deployed (owner confirmed) |
| 5 | Multi-page service pages + build-time prerender | 81.0 | **Done and live (main `bd07091`)**: POS, E-Commerce, Dashboards, Business Websites, Chat Agents, Privacy, 404 |
| 6 | Contact form fix | 80.0 | Done. Live and working (owner confirmed 2026-10-14) |
| 7 | Fix/verify trust claims; single public email (`hacommercex@gmail.com`); dead partner link | 76.0 | Deployed (owner confirmed) |
| 8 | Organization + WebSite JSON-LD (verified facts only) | 73.0 | Deployed; **validated 2026-10-15 by owner**: Rich Results Test shows Breadcrumbs with no errors on the POS page; Schema validator shows Organization (+WebSite) with no errors on the home page |
| 9 | Duplicate IDs, accessible service cards and dialog | 67.0 | Deployed (owner confirmed) |
| 10 | Legitimate directory listings + brand profiles | 65.0 | After proof assets exist |

## Phase 3 (built 2026-10-16, awaiting deploy)
Contact form protection + non-blocking fonts. After deploy: send ONE real test message from the live site and confirm it arrives; run PageSpeed Insights on the home page and record the result.

## To check (owner reminders, 2026-10-15)
- **Clutch profile**: listed/published (owner confirmed 2026-10-16). Owner to confirm it links to hacommercex.vercel.app. Clutch tasks to skip: Verify business, pricing templates, Analytics integration, advertising. Optional free: focus area, Facebook link.
- **Search Console**: 2026-10-16 the request-indexing quota was still exceeded (so not done). Retry 2026-10-17: request indexing for the 7 URLs (home, 5 services, /privacy); stop at the quota. Sitemap is already submitted, so Google can find the pages without these requests.
- **Bing**: imported 2026-10-15; dashboard says it may take up to 48 hours to show data (2026-10-16). Check again ~2026-10-18; resubmit sitemap.xml if not listed.
- **/privacy**: CONFIRMED by owner 2026-10-16 (including the deletion-on-request sentence).
- **Reviews/case studies**: DONE 2026-10-16: review request sent to AKA_WMart (awaiting reply). Clean Nest request not sent yet. Clutch "Request a Review" only with client consent. Clutch profile is listed (published).

## Owner actions pending (cannot be done from the repo)
1. Vercel → Settings → Environment Variables: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_USER=hacommercex@gmail.com`, `SMTP_PASS=<Gmail App Password>`, `CONTACT_EMAIL=hacommercex@gmail.com`. Redeploy afterwards.
2. After deploy: confirm `/robots.txt` and `/sitemap.xml` open as real files; send a test form message.
3. Verify the site in Google Search Console and Bing Webmaster Tools; submit `https://hacommercex.vercel.app/sitemap.xml`.

## Status 2026-10-15 (evening)
All 5 service pages, /privacy and the 404 page are live and owner-tested on previews. Remaining work is mostly outside the code: Search Console/Bing, validators, directories, case studies, then data-driven content. Retention sentence on /privacy awaits owner confirmation.

## Done earlier: Week 2 plan (kept for the record)
Hero H1 and intro; replace the four unverifiable stats with: 4 projects in portfolio · MERN full-stack · Based in Karachi, clients worldwide · Replies within 24 hours; show service descriptions on the page; footer email; JSON-LD (Organization + WebSite, no address); accessibility fixes; remove duplicate IDs.

## 90-day roadmap (draft)
- Days 1–14: Phase 1; collect first Search Console data.
- Days 15–45: Decide architecture; prerendered service pages (E-commerce, POS, Dashboards, Business Websites) and a privacy page; validate keywords with real query data.
- Days 46–75: Two honest case studies (needs owner facts and client permission); directory listings; brand profiles.
- Days 76–90: First 2–3 articles from validated queries; review against baseline.

## After Week 2 deploy (owner actions)
1. Apply patch + zip, build, push (see README in the delivery).
2. Run the live page through Google Rich Results Test and Schema Markup Validator; tell Claude the result.
3. Verify the site in Search Console and Bing Webmaster Tools; submit the sitemap; request indexing of `/`.
4. Check that the Facebook link opens the HACommerceX Page.

## Open items for the owner
- Public addresses for client sites (to add "View live site" links), if the clients agree.
- A larger original of the Items Hub logo (current one is rebuilt from 112x32 px).
- Confirm the Business Analytics Dashboard demo image: it shows AKA Mart branding and sample figures (labelled "Demo project" on the site).
- Mobile apps and FBR POS integration: still unconfirmed, so not mentioned anywhere.

## Phase 2 candidates (needs discussion)
Prerendered, separate service pages (E-Commerce, POS & Billing, Dashboards, Business Websites, Chat Agents), privacy page, case studies for the client projects, keyword validation from Search Console data.
