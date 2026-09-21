# BrightWay Technical Solutions website

Electrical and plumbing services in Mannarkkad, Kerala. Built with Next.js 15 (App Router), React 19, Tailwind CSS 4 and TypeScript. Every page is prerendered to static HTML.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
cp .env.example .env.local   # then set NEXT_PUBLIC_SITE_URL to your real domain
npm run build
npm start
```

Checks (typecheck, lint, build): `npm run check`. Requires Node 18.18 or newer (`.nvmrc` says 20).

## Deploy

**Vercel:** import the repository, add the environment variable `NEXT_PUBLIC_SITE_URL` (for example `https://brightwaysolutions.com`), deploy. No other settings are needed.

**Any Node host:** `npm run build && npm start` behind HTTPS, with `NEXT_PUBLIC_SITE_URL` set at build time.

> If `NEXT_PUBLIC_SITE_URL` is not set, the site falls back to `https://brightwaysolutions.vercel.app`. Canonical links, the sitemap, social previews and structured data will then point at that address, so set it to your real domain.

## Where to edit things

| To change | Edit |
|---|---|
| Phone, WhatsApp, email, address, opening hours | `src/lib/site.ts` |
| Services, testimonials, FAQs, trust points | `src/lib/content.ts` |
| Colours, fonts, spacing, buttons | `src/app/globals.css` (design tokens at the top) |
| Page layout and copy on the home page | `src/app/page.tsx` |
| Structured data (JSON-LD) | `src/lib/schema.ts` |

Business facts live in one place (`site.ts`), and the pages, structured data, sitemap, manifest and `llms.txt` all read from it, so name, address and phone cannot drift apart.

Adding a service: add an entry to the `services` array in `content.ts`. Its page, sitemap entry, navigation links, quote-form option and `llms.txt` line are all generated automatically.

## What the redesign changed

- **Server-rendered content.** The original returned an empty page until JavaScript ran, so search engines saw no text, headings or links. Every page now ships complete HTML.
- **Real pages for search.** Home, Services, six service pages (each with its own title, description, FAQ and structured data), About and Contact, plus a branded 404.
- **Local and AI search.** `Electrician` + `Plumber` LocalBusiness structured data with address, hours and areas served; WebSite, WebPage, Service, Breadcrumb and FAQ markup; `robots.txt`, `sitemap.xml`, `llms.txt`.
- **Contact form that works.** The old form only pretended to send. The new one validates, then opens WhatsApp or your email app with the enquiry written out. To send to a server instead, replace `send()` in `src/components/ContactForm.tsx`.
- **Mobile conversion.** Call and WhatsApp buttons stay on screen on phones.
- **Accessibility.** Skip link, visible focus, labelled form errors, 44px tap targets, reduced-motion support. Automated axe-core scan: 0 violations across all pages at phone and desktop widths.
- **PWA fixed.** The service worker was registered at the wrong address and could never install. It now works offline (visited pages load from cache; others show a branded offline page with a tap-to-call link). The full-screen install prompt is now a small dismissible banner.
- **Removed:** fake newsletter and social links, the unused dark-mode system, cursor effects, Unsplash stock photos, blocking `COEP` header, placeholder legal links.

## Things to confirm before launch

1. **Domain:** set `NEXT_PUBLIC_SITE_URL`.
2. **WhatsApp:** the WhatsApp buttons use `+91 91881 26866`. Confirm this number is on WhatsApp.
3. **Business name:** the site uses "BrightWay Technical Solutions" (as on your logo and email) and keeps "BrightWay Electrical & Plumbing Solutions" as an alternate name in structured data.
4. **Claims carried over from the original copy** (please confirm each is true): "average response time under 60 minutes", "no overtime fees", "licensed and insured", "certified technicians", "extended warranty on maintained systems".
5. **Founding year:** the original said both "since 2005" and "since 2017", so no year is shown. Add the right one to `about/page.tsx` if you want it.
6. **Photos:** the technician image is a stock illustration. A real photo of your team builds more trust; replace `public/images/team.webp` (keep about 500 to 1000px square, transparent background).
7. **Not added because they need real details:** Google Business Profile link, Facebook/Instagram links (`sameAs` in `schema.ts`), exact map coordinates, a privacy policy page.

## SEO notes

See `SEO_REPORT.md` for the full audit: what was found, what was changed, what was deliberately left, and how each result was verified. No tool can promise rankings, indexing or AI citations, and neither does this project. The strongest next steps are outside the code: claim and complete your Google Business Profile, keep name, address and phone identical everywhere they appear online, and ask happy customers for Google reviews.
