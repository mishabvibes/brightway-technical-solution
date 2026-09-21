/**
 * Single source of truth for business facts.
 * Every page, the JSON-LD, the sitemap, the manifest and llms.txt read from here,
 * so name, address and phone (NAP) can never drift between them.
 */

// Always use the primary production URL to ensure Open Graph images resolve correctly for WhatsApp/socials.
// Vercel's temporary deployment URLs (VERCEL_URL) often return HTML instead of the image when scraped.
let _siteUrl = 
  process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.VERCEL_PROJECT_PRODUCTION_URL || 
  "https://brightwaysolutions.vercel.app";

if (!_siteUrl.startsWith("http")) {
  _siteUrl = `https://${_siteUrl}`;
}
export const SITE_URL = _siteUrl.replace(/\/+$/, "");

export const business = {
  name: "BrightWay Technical Solutions",
  shortName: "BrightWay",
  /** The name used on the previous site; kept as an alternate for entity matching. */
  alternateName: "BrightWay Electrical & Plumbing Solutions",
  tagline: "Electrical and plumbing services in Mannarkkad, Kerala",
  phone: {
    display: "+91 91881 26866",
    tel: "+919188126866",
    /** wa.me format: country code + number, digits only */
    whatsapp: "919188126866",
  },
  email: "brightwaytechnicalsolution@gmail.com",
  address: {
    street: "Changaleeri",
    locality: "Mannarkkad",
    district: "Palakkad",
    region: "Kerala",
    postalCode: "678762",
    country: "IN",
  },
  hours: [
    { days: "Monday to Friday", time: "9am to 6pm", schema: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    { days: "Saturday", time: "9am to 4pm", schema: ["Saturday"], opens: "09:00", closes: "16:00" },
  ],
  emergencyHours: "24 hours a day, every day of the year",
  /** Places we name as served. Add more only when you actually serve them. */
  areasServed: ["Mannarkkad", "Palakkad"],
} as const;

export const addressLines = [
  `${business.address.street}, ${business.address.locality}`,
  `${business.address.region} ${business.address.postalCode}`,
];

export const addressOneLine = `${business.address.street}, ${business.address.locality}, ${business.address.region} ${business.address.postalCode}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${business.name}, ${addressOneLine}`,
)}`;

export const telHref = `tel:${business.phone.tel}`;

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${business.phone.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsappMessage =
  "Hello BrightWay, I'd like a quote for electrical or plumbing work.";

export const absoluteUrl = (path = "/") =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** Fixed so the sitemap does not claim every page changed on every deploy. Update when content changes. */
export const CONTENT_LAST_MODIFIED = "2026-09-21";

export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
