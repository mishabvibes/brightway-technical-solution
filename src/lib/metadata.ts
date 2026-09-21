import type { Metadata } from "next";
import { business } from "./site";

/** Site-wide Open Graph fields. Next.js REPLACES (not merges) a parent's openGraph object when a page
 *  defines its own, so every page must go through pageMetadata() to keep site name and locale. */
export const baseOpenGraph = {
  type: "website" as const,
  locale: "en_IN",
  siteName: business.name,
};

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${business.shortName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...baseOpenGraph, url: path, title: fullTitle, description },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
