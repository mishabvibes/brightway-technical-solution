# SEO report: BrightWay redesign

Produced with the SEO CLI (`seo` 0.2.40, telemetry disabled), Lighthouse 13.5 (mobile) and axe-core, against the production build served on localhost. Search Console and Analytics were **not connected**, so nothing here is based on real search or traffic data. Nothing here promises rankings, indexing, traffic or AI citations.

## 1. Starting point (original site)

| Evidence | Result |
|---|---|
| `seo report --url <original>` | "0 issues across **0 crawled pages**". This is **missing evidence, not an all-clear**: the crawler found nothing to crawl. |
| `audit-page` on the original homepage | No headings and no links in the served HTML; no canonical; no structured data; Open Graph URLs pointed at `example.com`. Cause: `Layout` returned `null` until the browser mounted, so the server sent an empty page. |
| Code review | Sitemap and metadata used different domains; no `robots.txt`; service worker registered at a path that does not exist; `COEP: require-corp` blocked the Unsplash images; contact form only simulated sending; metadata said "Portland" for a Kerala business. |

## 2. Broad report on the redesigned build: every finding

First run against the redesign (fresh crawl of 17 pages, coverage complete): **6 findings (3 fixes, 3 reviews)**. Final run after changes, same command, `--refresh`: **0 findings, 11 pages crawled, coverage complete** (`completion: not-required`).

Command (both runs): `seo report --url http://localhost:3200 --actions-only --refresh --json`

| # | Finding id and exact title | Type | Outcome | Reason and evidence | Verification |
|---|---|---|---|---|---|
| 1 | `crawl:meta_description_duplicate`: "meta_description_duplicate: Duplicate meta description (7 URLs)" | fix | **fixed** | Service-page buttons linked to `/contact?service=<x>`, creating six crawlable copies of `/contact`. The preselected service now travels in the URL hash (`/contact#service=<x>`), which is not a separate URL. The form still preselects the service. | Fresh crawl: finding absent; crawl fell from 17 to 11 pages. |
| 2 | `crawl:title_duplicate`: "title_duplicate: Duplicate title (7 URLs)" | fix | **fixed** | Same cause and change as #1. | Same as #1. |
| 3 | `crawl:duplicate_content`: "duplicate_content: Duplicate content (7 URLs)" | fix | **fixed** | Same cause and change as #1. | Same as #1. |
| 4 | `crawl:canonicalized_page`: "canonicalized_page: Canonicalized page (16 URLs)" | review | **no-change** | Question: does it need a change? No. Every canonical was a correct self-reference on the production origin (`https://brightwaysolutions.vercel.app/...`). The crawler flagged them only because it was crawling `localhost`. The six `?service=` URLs canonicalised to `/contact` as intended (and are now gone, see #1). | Rebuilt with `NEXT_PUBLIC_SITE_URL=http://localhost:3200` so canonical and crawl host match: finding absent. |
| 5 | `crawl:og_image_missing`: "og_image_missing: Open Graph image missing (15 URLs)" | review | **changed** | A **real bug I introduced**: Next.js replaces the layout's `openGraph` object when a page defines its own, so every inner page lost its social image, site name and locale (home was unaffected). Added `pageMetadata()` in `src/lib/metadata.ts`, now used by every page. | Fresh crawl: finding absent. `curl /about` shows `og:image`. |
| 6 | `crawl:image_oversized_candidate`: "image_oversized_candidate: Oversized image candidates (7 URLs)" | review | **changed** | Testimonial portraits passed `sizes`, which made Next.js use a 3840px variant as the fallback `src` (source photos are about 450px). Now a fixed 190px image with 1x/2x variants. | Fresh crawl: finding absent. |

## 3. Every inventory URL

`nextPage` was empty for all inventories; the two truncated lists (16 and 15 URLs) were fetched in full with `affected-urls`.

| URL (all on `http://localhost:3200`) | In finding(s) | Disposition | Evidence |
|---|---|---|---|
| `/contact` | 1, 2, 3, 4, 5 | kept; unique title, description and canonical | Final crawl clean |
| `/contact?service=electrical` | 1, 2, 3, 4, 5 | **removed from the site** (no longer linked; an old link still works and canonicalises to `/contact`) | Not in final crawl |
| `/contact?service=emergency` | 1, 2, 3, 4, 5 | removed (as above) | Not in final crawl |
| `/contact?service=inspection` | 1, 2, 3, 4, 5 | removed (as above) | Not in final crawl |
| `/contact?service=maintenance` | 1, 2, 3, 4, 5 | removed (as above) | Not in final crawl |
| `/contact?service=plumbing` | 1, 2, 3, 4, 5 | removed (as above) | Not in final crawl |
| `/contact?service=smarthome` | 1, 2, 3, 4, 5 | removed (as above) | Not in final crawl |
| `/` | 4, 6 | 4: no-change (self-canonical); 6: changed (portrait fix) | Final crawl clean |
| `/about` | 4, 5, 6 | 4: no-change; 5: changed; 6: changed | Final crawl clean |
| `/services` | 4, 5 | 4: no-change; 5: changed | Final crawl clean |
| `/services/electrical-services` | 4, 5, 6 | 4: no-change; 5: changed; 6: changed | Final crawl clean |
| `/services/emergency-electrician-plumber` | 4, 5, 6 | 4: no-change; 5: changed; 6: changed | Final crawl clean |
| `/services/plumbing-services` | 4, 5, 6 | 4: no-change; 5: changed; 6: changed | Final crawl clean |
| `/services/preventive-maintenance` | 4, 5, 6 | 4: no-change; 5: changed; 6: changed | Final crawl clean |
| `/services/safety-audits-inspections` | 4, 5 | 4: no-change; 5: changed (no testimonial on this page, so not in 6) | Final crawl clean |
| `/services/smart-home-integration` | 4, 5, 6 | 4: no-change; 5: changed; 6: changed | Final crawl clean |

Counts reconcile: finding 1-3 = 7 URLs; finding 4 = 16 (10 pages + 6 removed); finding 5 = 15 (9 pages + 6 removed); finding 6 = 7.

## 4. AI-search and agent readiness

`ai-readiness` (data complete): **no evidence-backed action**; 4 pass, 12 informational, 3 unknown. AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot and others) are allowed by `robots.txt`; no `nosnippet` or restrictive snippet controls. The report itself states Google documents no separate technical requirements for AI features, and a clean report is not a visibility verdict.

`agent-readiness` (data **partial**; Markdown evidence unavailable). Every check that was not a pass or information:

| Check | First run | Final | Outcome | Reason |
|---|---|---|---|---|
| `llms-txt` | warning (4 malformed entries) | **pass** | fixed | Contact facts were list items that were not links. Moved into the summary blockquote. |
| `agent-when-to-use` | warning | **pass** | fixed | Added a `## When to use this site` section naming the jobs the site suits and the entry page. |
| `identity-graph` | warning | warning | partly fixed, rest not-needed | Added page-level nodes (`WebPage`, `CollectionPage`, `AboutPage`, `ContactPage`) linked to the WebSite and business. The remaining "publisher missing" line is a tool limitation: it looks for a literal `Organization`/`Person` type and does not resolve that `Electrician` and `Plumber` are subtypes of Organization. Not changed. |
| `markdown-coverage`, `markdown-negotiation` | fail | fail | **deferred** | Serving Markdown copies of pages by content negotiation is an emerging convention, not a search requirement. It needs middleware on every request and `Vary: Accept` handling on the CDN. Not added without your request. |
| `agent-friendly-404s` | warning | warning | deferred | Depends on the Markdown work above. |
| `markdown-token-estimates`, `-size`, `-content-parity`, `-determinism`, `-quality` | unknown | unknown | deferred | Unknown means evidence was unavailable, not a pass or fail. |
| `trust-anchor-pages` | warning | warning | **deferred** | 2 of 3 trust pages exist; a privacy page is missing. It needs legal wording approved by the business owner, so none was invented. |
| `protocol-canonicalization` | warning | warning | deferred | Depends on the host (HTTP to HTTPS redirect, HSTS). Not testable on localhost; verify after deployment. |

## 5. Performance, accessibility, best practices

Lighthouse (mobile, simulated throttling, localhost; lab data, not real-user data):

| Page | Performance | Accessibility | Best practices | SEO | CLS |
|---|---|---|---|---|---|
| Home (4 runs) | 83, 93, 91, 88 | 100 | 100 | 100 | 0 |
| Service page | 95 | 100 | 100 | 100 | 0 |
| Contact | 95 | 100 | 100 | 100 | 0 |

axe-core (WCAG 2.2 A/AA plus best practices): **0 violations** on all 10 pages at 375px and 1280px. Playwright: no console errors, failed requests or horizontal scrolling at 375, 768 and 1440px. Home performance varies by run; the hero photo is the largest element on phones.

## 6. What was not verified

- Real search performance, indexing, rankings and clicks (no Search Console or Analytics).
- Google's Rich Results Test and Business Profile matching (need the live domain).
- Structured data validity beyond JSON syntax and the tool's checks. "Valid JSON-LD" is syntax evidence, not entity recognition or rich-result eligibility.
- Review markup was **deliberately not added**: self-published testimonials are not eligible for review stars, and an invented rating risks a manual action.

## 7. Recommended next steps (outside the code)

1. Set `NEXT_PUBLIC_SITE_URL`, deploy, then submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
2. Claim and complete your Google Business Profile (categories: Electrician and Plumber; same name, address, phone as the site). This matters more for "electrician near me" than anything on the page.
3. Keep the name, address and phone identical everywhere online (directories, WhatsApp Business, social profiles), then add those profile URLs to `sameAs` in `src/lib/schema.ts`.
4. Ask satisfied customers for Google reviews.
5. After a few weeks of data, connect Search Console and re-run `seo report --site sc-domain:<your-domain>` to see real queries and pages.
