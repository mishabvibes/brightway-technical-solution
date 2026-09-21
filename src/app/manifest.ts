import type { MetadataRoute } from "next";
import { business } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: business.shortName,
    description:
      "Electrical and plumbing services in Mannarkkad, Kerala. Free quotes and 24/7 emergency callouts.",
    start_url: "/",
    display: "standalone",
    lang: "en-IN",
    background_color: "#000000",
    theme_color: "#000000",
    categories: ["business", "utilities"],
    icons: [
      { src: "/android/android-launchericon-192-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/android/android-launchericon-512-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/android/android-launchericon-512-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "Get a free quote",
        short_name: "Quote",
        url: "/contact",
        icons: [{ src: "/android/android-launchericon-96-96.png", sizes: "96x96", type: "image/png" }],
      },
      {
        name: "Our services",
        short_name: "Services",
        url: "/services",
        icons: [{ src: "/android/android-launchericon-96-96.png", sizes: "96x96", type: "image/png" }],
      },
    ],
  };
}
