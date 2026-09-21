import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { addressLines, business, mapsUrl, telHref, whatsappHref } from "@/lib/site";
import ContactForm from "./ContactForm";

/** Quote form beside the business details. Used on the home page and on /contact. */
export default function ContactPanel({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = headingLevel;
  return (
    <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
      <div>
        <Heading className={headingLevel === "h1" ? "text-h1" : "text-h2"}>Get a free quote</Heading>
        <p className="mt-4 max-w-[54ch] text-lead text-muted">
          Tell us what you need and where you are. We will get back to you with a free quote. For an emergency, call us instead.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>

      <aside aria-label="Contact details" className="self-start rounded-2xl bg-black p-7 text-white on-dark sm:p-9">
        <h2 className="text-h3">Talk to us directly</h2>
        <ul className="mt-6 space-y-6">
          <li className="flex gap-4">
            <Phone size={22} className="mt-1 shrink-0 text-amber" aria-hidden="true" />
            <div>
              <span className="sr-only">Phone: </span>
              <a href={telHref} className="font-display text-2xl font-extrabold hover:underline">{business.phone.display}</a>
              <p className="text-[#c9ced8]">Emergency callouts: {business.emergencyHours}</p>
            </div>
          </li>
          <li className="flex gap-4">
            <MessageCircle size={22} className="mt-1 shrink-0 text-amber" aria-hidden="true" />
            <div>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-4 hover:no-underline">
                Message us on WhatsApp
              </a>
            </div>
          </li>
          <li className="flex gap-4">
            <Mail size={22} className="mt-1 shrink-0 text-amber" aria-hidden="true" />
            <div>
              <span className="sr-only">Email: </span>
              <a href={`mailto:${business.email}`} className="inline-block py-2 font-bold underline underline-offset-4 [overflow-wrap:anywhere] hover:no-underline">
                {business.email}
              </a>
            </div>
          </li>
          <li className="flex gap-4">
            <MapPin size={22} className="mt-1 shrink-0 text-amber" aria-hidden="true" />
            <div>
              <address className="not-italic">
                {business.name}
                <br />
                {addressLines[0]}
                <br />
                {addressLines[1]}
              </address>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="link inline-block py-2">
                Open in Google Maps
              </a>
            </div>
          </li>
          <li className="flex gap-4">
            <Clock size={22} className="mt-1 shrink-0 text-amber" aria-hidden="true" />
            <div>
              <span className="sr-only">Opening hours: </span>
              {business.hours.map((h) => (
                <p key={h.days}>{h.days}: {h.time}</p>
              ))}
              <p className="font-bold">Emergency: {business.emergencyHours}</p>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  );
}
