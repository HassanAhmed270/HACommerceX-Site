# Next Actions — prioritized (updated 2026-10-15)

Priority Score = (Impact×0.30 + Confidence×0.25 + SEO×0.20 + Efficiency×0.15 + Strategic×0.10) × 20. A prioritization aid, not a ranking prediction.

| # | Task | Score | Status |
|---|---|---|---|
| 1 | Set up Search Console + Bing Webmaster + analytics baseline | 93.0 | **Owner action after deploy**: verify `hacommercex.vercel.app`, submit sitemap |
| 2 | `robots.txt`, `sitemap.xml`, canonical, OG/Twitter meta, share image | 92.0 | Deployed (owner confirmed) |
| 3 | Render service content visibly + keyword-aligned H1/intro; replace inflated hero stats | 86.0 | Deployed (owner confirmed) |
| 4 | Compress/resize images, favicon set | 83.0 | Deployed (owner confirmed) |
| 5 | Multi-page service pages + build-time prerender | 81.0 | **Built on a preview branch** (prerender + POS page); check on Vercel preview, then merge. Other service pages follow one at a time |
| 6 | Contact form fix | 80.0 | Done. Live and working (owner confirmed 2026-10-14) |
| 7 | Fix/verify trust claims; single public email (`hacommercex@gmail.com`); dead partner link | 76.0 | Deployed (owner confirmed) |
| 8 | Organization + WebSite JSON-LD (verified facts only) | 73.0 | Deployed; **validator results still to be reported by owner** |
| 9 | Duplicate IDs, accessible service cards and dialog | 67.0 | Deployed (owner confirmed) |
| 10 | Legitimate directory listings + brand profiles | 65.0 | After proof assets exist |

## Owner actions pending (cannot be done from the repo)
1. Vercel → Settings → Environment Variables: `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_USER=hacommercex@gmail.com`, `SMTP_PASS=<Gmail App Password>`, `CONTACT_EMAIL=hacommercex@gmail.com`. Redeploy afterwards.
2. After deploy: confirm `/robots.txt` and `/sitemap.xml` open as real files; send a test form message.
3. Verify the site in Google Search Console and Bing Webmaster Tools; submit `https://hacommercex.vercel.app/sitemap.xml`.

## Week 2 plan (draft; wording shown for approval before editing)
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
