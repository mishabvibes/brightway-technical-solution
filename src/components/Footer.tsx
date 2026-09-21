import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { services } from "@/lib/content";
import {
  addressLines,
  business,
  mapsUrl,
  telHref,
} from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark border-t border-white/20 bg-black text-white">
      <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.1fr_1fr_0.85fr_1.5fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src="/brand/logo-mark.png" alt="" width={36} height={40} className="h-10 w-auto" />
            <span className="leading-tight">
              <span className="block font-display text-2xl font-extrabold">{business.shortName}</span>
              <span className="block text-sm text-[#c9ced8]">Technical Solutions</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-[#c9ced8]">
            Electrical and plumbing services for homes, offices and resorts in Mannarkkad and Palakkad, Kerala.
          </p>
        </div>

        <nav aria-label="Services">
          <p className="font-display text-lg font-extrabold">Services</p>
          <ul className="mt-4 space-y-1">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-flex min-h-11 items-center text-[#e6e8ec] hover:text-white hover:underline"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <p className="font-display text-lg font-extrabold">Company</p>
          <ul className="mt-4 space-y-1">
            {[
              { label: "All services", href: "/services" },
              { label: "About", href: "/about" },
              { label: "Contact and quotes", href: "/contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="inline-flex min-h-11 items-center text-[#e6e8ec] hover:text-white hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-lg font-extrabold">Contact</p>
          <address className="mt-4 space-y-3 not-italic text-[#e6e8ec]">
            <p className="flex items-center gap-3">
              <Phone size={20} className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
              <a href={telHref} className="inline-flex min-h-11 items-center hover:underline">{business.phone.display}</a>
            </p>
            <p className="flex items-center gap-3">
              <Mail size={20} className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
              <a href={`mailto:${business.email}`} className="inline-flex min-h-11 items-center [overflow-wrap:anywhere] hover:underline">{business.email}</a>
            </p>
            <p className="flex items-center gap-3">
              <MapPin size={20} className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block py-2 hover:underline">
                {addressLines[0]}
                <br />
                {addressLines[1]}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <Clock size={20} className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
              <span>
                {business.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
                <span className="block font-bold text-white">Emergency: {business.emergencyHours}</span>
              </span>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="wrap flex flex-col justify-between gap-4 py-6 text-sm text-[#b4bac6] sm:flex-row sm:items-center sm:gap-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p>&copy; {year} {business.name}. All rights reserved.</p>
            <p className="hidden sm:block">&bull;</p>
            <p>
              Developed by{" "}
              <a href="https://eclyze-website.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                Eclyze
              </a>
            </p>
          </div>
          <p>
            <a href="/sitemap.xml" className="inline-flex min-h-11 items-center hover:text-white hover:underline">
              Sitemap
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
