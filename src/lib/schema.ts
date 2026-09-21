import { absoluteUrl, addressOneLine, business, SITE_URL } from "./site";
import { services, type Faq, type Service } from "./content";

const BUSINESS_ID = `${SITE_URL}/#business`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/**
 * One LocalBusiness entity typed as both Electrician and Plumber (both are
 * schema.org subtypes of HomeAndConstructionBusiness). Everything comes from
 * lib/site.ts so it always matches the visible page.
 *
 * Intentionally NOT included: Review / AggregateRating markup. Self-published
 * testimonials are not eligible for review rich results, and inventing a rating
 * would risk a manual action. Add geo coordinates and sameAs (Google Business
 * Profile, Facebook, Instagram) once you have the exact values.
 */
export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Electrician", "Plumber"],
    "@id": BUSINESS_ID,
    name: business.name,
    alternateName: business.alternateName,
    url: SITE_URL,
    description:
      "BrightWay Technical Solutions provides electrical, plumbing, preventive maintenance, safety inspection and smart home services in Mannarkkad, Kerala, with 24/7 emergency callouts.",
    telephone: business.phone.tel,
    email: business.email,
    image: [absoluteUrl("/og.png")],
    logo: absoluteUrl("/ios/512.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    areaServed: [
      { "@type": "City", name: "Mannarkkad" },
      { "@type": "AdministrativeArea", name: "Palakkad district" },
    ],
    openingHoursSpecification: business.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...h.schema],
      opens: h.opens,
      closes: h.closes,
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: business.phone.tel,
        email: business.email,
        contactType: "customer service",
        areaServed: "IN",
      },
      {
        "@type": "ContactPoint",
        telephone: business.phone.tel,
        contactType: "emergency",
        areaServed: "IN",
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: weekdays,
          opens: "00:00",
          closes: "23:59",
        },
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Electrical and plumbing services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: absoluteUrl(`/services/${s.slug}`),
          description: s.summary,
        },
      })),
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: business.name,
    alternateName: business.alternateName,
    inLanguage: "en-IN",
    publisher: {
      "@type": ["Electrician", "Plumber"],
      "@id": BUSINESS_ID,
      name: business.name,
      url: SITE_URL,
    },
  };
}

/**
 * Page-level node tying each page to the site and the business, so the identity graph is
 * WebSite -> WebPage -> business. Uses only facts already visible on the page.
 */
export function pageSchema({
  type = "WebPage",
  path,
  name,
  description,
  mainEntityId,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  path: string;
  name: string;
  description: string;
  mainEntityId?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    publisher: { "@id": BUSINESS_ID },
    ...(mainEntityId ? { mainEntity: { "@id": mainEntityId } } : {}),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.h1,
    serviceType: service.name,
    description: `${service.summary} ${service.intro}`,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": BUSINESS_ID },
    areaServed: [
      { "@type": "City", name: "Mannarkkad" },
      { "@type": "AdministrativeArea", name: "Palakkad district" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: {
        "@type": "ContactPoint",
        telephone: business.phone.tel,
        contactType: "customer service",
      },
      serviceLocation: {
        "@type": "Place",
        name: business.name,
        address: addressOneLine,
      },
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export { BUSINESS_ID, WEBSITE_ID };
