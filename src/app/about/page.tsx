import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Testimonials from "@/components/Testimonials";
import { services, testimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema } from "@/lib/schema";
import { addressLines, business, mapsUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About BrightWay Technical Solutions",
  description:
    "Meet BrightWay Technical Solutions, an electrical and plumbing company in Mannarkkad, Kerala, serving homes, offices and resorts in Mannarkkad and Palakkad.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="bg-paper">
        <div className="wrap pb-12 pt-4 lg:pb-16">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
          <h1 className="text-h1 mt-4 max-w-[22ch]">About BrightWay Technical Solutions</h1>
          <p className="mt-5 max-w-[58ch] text-lead text-muted">
            We are an electrical and plumbing company based at {business.address.street},{" "}
            {business.address.locality}, {business.address.region}. We look after the wiring, pipework and smart
            systems in homes, offices and resorts in Mannarkkad and Palakkad.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-h2">How we work</h2>
            <div className="mt-6 max-w-[60ch] space-y-5 text-lg">
              <p>
                Most electrical and plumbing emergencies begin as small faults nobody was watching. So alongside
                repairs and installations, we add energy and leak monitoring, run safety inspections and offer
                scheduled maintenance.
              </p>
              <p>
                Our technicians are licensed, certified professionals and the business is insured. Our quotes are
                free, our pricing is transparent, and emergency callouts run {business.emergencyHours} with no
                overtime fees.
              </p>
              <p>
                Because one team handles both trades, we can also connect your wiring and plumbing to a smart home
                in a single job.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-h2">What we do</h2>
            <ul className="mt-6">
              {services.map((s) => (
                <li key={s.slug} className="border-t border-line last:border-b">
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex min-h-14 items-center justify-between gap-4 py-3 font-display text-lg font-extrabold hover:underline"
                  >
                    {s.name}
                    <span className="text-muted" aria-hidden="true">&rsaquo;</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section on-dark bg-black text-white" aria-labelledby="about-clients">
        <div className="wrap">
          <h2 id="about-clients" className="text-h2 max-w-[24ch]">Who we have worked for</h2>
          <p className="mt-4 max-w-[58ch] text-lead text-[#d3d7df]">
            A homeowner, an office in Palakkad and a resort. In their own words:
          </p>
          <div className="mt-10">
            <Testimonials items={testimonials} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="find-us">
        <div className="wrap grid gap-8 md:grid-cols-2">
          <div>
            <h2 id="find-us" className="text-h2">Find us</h2>
            <address className="mt-6 flex gap-3 text-lg not-italic">
              <MapPin size={24} className="mt-1 shrink-0 text-water" aria-hidden="true" />
              <span>
                {business.name}
                <br />
                {addressLines[0]}
                <br />
                {addressLines[1]}
                <br />
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="link">
                  Open in Google Maps
                </a>
              </span>
            </address>
          </div>
          <div>
            <h2 className="text-h2">Opening hours</h2>
            <p className="mt-6 flex gap-3 text-lg">
              <Clock size={24} className="mt-1 shrink-0 text-water" aria-hidden="true" />
              <span>
                {business.hours.map((h) => (
                  <span key={h.days} className="block">{h.days}: {h.time}</span>
                ))}
                <strong className="block">Emergency: {business.emergencyHours}</strong>
              </span>
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
      <JsonLd
        data={[
          pageSchema({
            type: "AboutPage",
            path: "/about",
            name: "About BrightWay Technical Solutions",
            description: "An electrical and plumbing company at Changaleeri, Mannarkkad, Kerala serving homes, offices and resorts.",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
    </>
  );
}
