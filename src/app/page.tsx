import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Droplets,
  MessageCircle,
  Phone,
  ReceiptText,
  ShieldCheck,
  Siren,
  Zap,
} from "lucide-react";
import ContactPanel from "@/components/ContactPanel";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ServiceList from "@/components/ServiceList";
import Testimonials from "@/components/Testimonials";
import { homeFaqs, testimonials } from "@/lib/content";
import { faqSchema, pageSchema } from "@/lib/schema";
import { business, telHref, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Electrician & Plumber in Mannarkkad, Kerala | BrightWay" },
  alternates: { canonical: "/" },
};

const trust = [
  { Icon: ShieldCheck, title: "Licensed and insured", text: "Full protection on every job" },
  { Icon: BadgeCheck, title: "Certified technicians", text: "Trained, licensed professionals" },
  { Icon: Siren, title: "24/7 emergency service", text: "Every day of the year" },
  { Icon: ReceiptText, title: "Free quotes", text: "Know the cost before work starts" },
];

const steps = [
  {
    title: "Contact us",
    text: "Call, message us on WhatsApp or fill in the form. Tell us what is wrong and where you are.",
  },
  {
    title: "Get a free quote",
    text: "We confirm the details and give you a free quote. Emergency callouts are attended 24 hours a day.",
  },
  {
    title: "We do the work",
    text: "A certified technician arrives in a fully equipped vehicle and completes the job.",
  },
];

const strengths = [
  {
    title: "Monitoring built in",
    text: "Energy usage and leak monitoring show up problems before they turn into breakdowns.",
    color: "border-amber",
  },
  {
    title: "Checked against code",
    text: "Inspections, pressure tests and code compliance checks come with a written improvement plan.",
    color: "border-water",
  },
  {
    title: "Reachable at any hour",
    text: "Emergency callouts run 24 hours a day, with transparent pricing and no overtime fees.",
    color: "border-ink",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-paper" aria-labelledby="hero-title">
        <div className="wrap grid items-center gap-10 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:py-16">
          <div>
            <h1 id="hero-title" className="text-display">
              Electrician and plumber in Mannarkkad, Kerala
            </h1>
            <p className="mt-6 max-w-[46ch] text-lead text-muted">
              Wiring, repairs, leak detection, smart home upgrades, and security system installation for homes, offices and resorts.
              Tell us what is wrong and we will send the right technician.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={telHref} className="btn btn-amber btn-large">
                <Phone size={20} aria-hidden="true" />
                Call {business.phone.display}
              </a>
              <a
                href={whatsappHref()}
                className="btn btn-line btn-large"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} aria-hidden="true" />
                Message on WhatsApp
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 font-bold">
              <span className="inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-go" aria-hidden="true" />
              Quotes are free. Emergency callouts run {business.emergencyHours}.
            </p>
          </div>

          <div className="hero-panel">
            <div className="hero-half hero-half-electrical" aria-hidden="true" />
            <div className="hero-half hero-half-plumbing" aria-hidden="true" />
            <Link href="/services/electrical-services" className="hero-tag hero-tag-left">
              <Zap size={18} aria-hidden="true" />
              Electrical
            </Link>
            <Link href="/services/plumbing-services" className="hero-tag hero-tag-right">
              <Droplets size={18} aria-hidden="true" />
              Plumbing
            </Link>
            <Image
              src="/images/team.webp"
              alt="A BrightWay electrician holding a coil of cable and a plumber holding a pipe wrench"
              width={500}
              height={500}
              priority
              unoptimized
              sizes="(min-width: 1024px) 30rem, 92vw"
              className="hero-photo"
            />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section aria-label="Why customers trust us" className="border-b border-line bg-white">
        <ul className="wrap grid grid-cols-1 gap-x-8 gap-y-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map(({ Icon, title, text }) => (
            <li key={title} className="trust-item">
              <Icon size={28} className="mt-0.5 shrink-0 text-water" aria-hidden="true" />
              <div className="leading-snug">
                <p className="font-display text-lg font-extrabold">{title}</p>
                <p className="text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Services */}
      <section id="services" className="section" aria-labelledby="services-title">
        <div className="wrap grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 id="services-title" className="text-h2">
              Electrical and plumbing, handled by one team
            </h2>
            <p className="mt-5 max-w-[46ch] text-lead text-muted">
              A tripping breaker, a leaking pipe, a smart home upgrade, or a CCTV camera installation: one call gets you the right specialist, and every job starts with a free quote.
            </p>
            <div className="mt-7">
              <Link href="/services" className="btn btn-ink">
                See all services
              </Link>
            </div>
          </div>
          <ServiceList />
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-paper" aria-labelledby="steps-title">
        <div className="wrap">
          <h2 id="steps-title" className="text-h2 max-w-[22ch]">
            How to get help
          </h2>
          <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.title} className="border-t-4 border-ink pt-5">
                <span className="font-display text-6xl font-extrabold leading-none text-water" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-h3">{s.title}</h3>
                <p className="mt-2 max-w-[38ch] text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* About */}
      <section className="section" aria-labelledby="about-title">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 id="about-title" className="text-h2">
              Two trades, one local team
            </h2>
            <p className="mt-5 max-w-[54ch] text-lead text-muted">
              {business.name} is an electrical and plumbing company based at {business.address.street},{" "}
              {business.address.locality}. We install, repair and maintain the wiring and pipework in homes,
              offices and resorts, and add monitoring so faults are caught early.
            </p>
            <Link href="/about" className="btn btn-line mt-7">
              About BrightWay
            </Link>
          </div>
          <ul className="grid gap-6">
            {strengths.map((s) => (
              <li key={s.title} className={`border-l-8 ${s.color} pl-5`}>
                <h3 className="text-h3">{s.title}</h3>
                <p className="mt-1 max-w-[50ch] text-muted">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section on-dark bg-black text-white" aria-labelledby="clients-title">
        <div className="wrap">
          <h2 id="clients-title" className="text-h2 max-w-[24ch]">
            What clients in Kerala say about us
          </h2>
          <div className="mt-10">
            <Testimonials items={testimonials} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" aria-labelledby="faq-title">
        <div className="wrap grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <div>
            <h2 id="faq-title" className="text-h2">
              Questions we hear most
            </h2>
            <p className="mt-5 max-w-[42ch] text-lead text-muted">
              Not answered here? Call us on{" "}
              <a href={telHref} className="link">
                {business.phone.display}
              </a>
              .
            </p>
          </div>
          <Faq items={homeFaqs} />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section bg-paper" aria-label="Request a quote">
        <div className="wrap">
          <ContactPanel />
        </div>
      </section>

      <JsonLd
        data={[
          pageSchema({
            path: "/",
            name: "Electrician & Plumber in Mannarkkad, Kerala | BrightWay",
            description:
              "BrightWay Technical Solutions: electrical, plumbing, maintenance, smart home, and security system installation services in Mannarkkad, Kerala. Free quotes and 24/7 emergency callouts.",
          }),
          faqSchema(homeFaqs),
        ]}
      />
    </>
  );
}
