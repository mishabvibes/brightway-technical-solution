import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import ActionBar from "@/components/ActionBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InstallPrompt from "@/components/InstallPrompt";
import JsonLd from "@/components/JsonLd";
import PwaRegister from "@/components/PwaRegister";
import { baseOpenGraph, OG_IMAGE } from "@/lib/metadata";
import { businessSchema, websiteSchema } from "@/lib/schema";
import { SITE_URL, business } from "@/lib/site";
import "./globals.css";

// Self-hosted variable fonts: no third-party request, no layout shift (display: swap + size-adjusted fallback).
const archivo = localFont({
  src: "../fonts/Archivo-Variable.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

const atkinson = localFont({
  src: "../fonts/AtkinsonHyperlegibleNext-Variable.woff2",
  variable: "--font-atkinson",
  weight: "200 800",
  display: "swap",
});

const DEFAULT_TITLE = "Electrician & Plumber in Mannarkkad, Kerala | BrightWay";
const DEFAULT_DESCRIPTION =
  "BrightWay Technical Solutions: electrical, plumbing, maintenance and smart home services in Mannarkkad, Kerala. Free quotes and 24/7 emergency callouts.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: "%s | BrightWay" },
  description: DEFAULT_DESCRIPTION,
  applicationName: business.shortName,
  category: "home services",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: { ...baseOpenGraph, url: "/", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  appleWebApp: { capable: true, title: business.shortName, statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${archivo.variable} ${atkinson.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ActionBar />
        <InstallPrompt />
        <PwaRegister />
        <JsonLd data={[businessSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}
