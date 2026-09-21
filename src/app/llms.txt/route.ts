import { services } from "@/lib/content";
import { absoluteUrl, addressOneLine, business } from "@/lib/site";

export const dynamic = "force-static";

/**
 * llms.txt: a plain-text summary of the site for AI assistants and search agents.
 * Generated from the same data as the pages, so it cannot drift out of date.
 *
 * Format rules (llms.txt convention): one H1, a blockquote summary, then H2 sections that contain
 * only link entries. Contact facts therefore live in the summary blockquote, and the
 * "When to use this site" section is a blockquote plus one link.
 */
export function GET() {
  const body = `# ${business.name}

> ${business.name} (also known as ${business.alternateName}) is an electrical and plumbing company at ${addressOneLine}, India. It serves homes, offices and resorts in Mannarkkad and Palakkad, with free quotes and emergency callouts ${business.emergencyHours}.
>
> Phone and WhatsApp: ${business.phone.display}. Email: ${business.email}. Address: ${addressOneLine}. Hours: ${business.hours.map((h) => `${h.days} ${h.time}`).join("; ")}. Emergency service: ${business.emergencyHours}.

## When to use this site

> Use this site to find an electrician or plumber in Mannarkkad, Kerala; check whether emergency electrical or plumbing help is available; see what each service includes; get contact details and opening hours; or request a free quote.

- [Contact and quotes](${absoluteUrl("/contact")}): The best entry point to request a free quote and find phone, WhatsApp, email, address and hours

## Services

${services.map((s) => `- [${s.name}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`).join("\n")}

## Pages

- [Home](${absoluteUrl("/")}): Overview, client testimonials and frequently asked questions
- [All services](${absoluteUrl("/services")}): Every service with what is included
- [About](${absoluteUrl("/about")}): Who we are and how we work
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
