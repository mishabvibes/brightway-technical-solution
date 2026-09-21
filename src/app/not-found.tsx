import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { business, telHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap max-w-3xl">
        <p className="font-display text-7xl font-extrabold text-water" aria-hidden="true">404</p>
        <h1 className="text-h1 mt-2">We could not find that page</h1>
        <p className="mt-5 text-lead text-muted">
          The link may be old or mistyped. Try one of these, or call us if you need help now.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-ink btn-large">Go to the home page</Link>
          <Link href="/services" className="btn btn-line btn-large">See our services</Link>
          <a href={telHref} className="btn btn-amber btn-large">
            <Phone size={20} aria-hidden="true" />
            {business.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
