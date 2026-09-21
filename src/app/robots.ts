import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Everything is public and crawlable, including search and AI crawlers. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
