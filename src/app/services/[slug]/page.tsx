import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, Check, ChevronRight, MessageCircle, Phone } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { TestimonialFigure } from "@/components/Testimonials";
import TradeChips from "@/components/TradeChips";
import { getService, getTestimonial, services } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema, pageSchema, serviceSchema } from "@/lib/schema";
import { absoluteUrl, business, telHref, whatsappHref } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const testimonial = getTestimonial(service.testimonialId);
  const related = service.related
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <section className="bg-paper">
        <div className="wrap pb-12 pt-4 lg:pb-16">
          <Breadcrumbs
            items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: service.name }]}
          />
          <div className="mt-5">
            <TradeChips trade={service.trade} />
          </div>
          <h1 className="text-h1 mt-4 max-w-[24ch]">{service.h1}</h1>
          <p className="mt-5 max-w-[58ch] text-lead text-muted">{service.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={telHref} className="btn btn-amber btn-large">
              <Phone size={20} aria-hidden="true" />
              Call {business.phone.display}
            </a>
            <Link href={`/contact#service=${service.formValue}`} className="btn btn-line btn-large">
              Request a free quote
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
          <div className="space-y-14">
            <div>
              <h2 className="text-h2">What is included</h2>
              <ul className="mt-6 grid gap-4">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-lg">
                    <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
                      <Check size={16} aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-h2">When to call us</h2>
              <ul className="mt-6 grid gap-3">
                {service.callWhen.map((item) => (
                  <li key={item} className="flex items-start gap-3 border-l-4 border-line pl-4 text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {service.whileYouWait && (
              <div className="rounded-2xl border-4 border-amber p-6 sm:p-8" role="note">
                <h2 className="flex items-center gap-3 text-h3">
                  <AlertTriangle size={26} aria-hidden="true" />
                  {service.whileYouWait.title}
                </h2>
                <ul className="mt-4 grid gap-3">
                  {service.whileYouWait.steps.map((step) => (
                    <li key={step} className="max-w-[60ch]">{step}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="text-h2">Questions about this service</h2>
              <div className="mt-6">
                <Faq items={service.faqs} />
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Get in touch">
            <div className="on-dark rounded-2xl bg-black p-7 text-white sm:p-9">
              <h2 className="text-h3">Get a free quote</h2>
              <p className="mt-3 text-[#d3d7df]">
                Tell us what you need. Quotes are free, and emergency callouts run {business.emergencyHours}.
              </p>
              <div className="mt-6 grid gap-3">
                <a href={telHref} className="btn btn-amber btn-large">
                  <Phone size={20} aria-hidden="true" />
                  {business.phone.display}
                </a>
                <a
                  href={whatsappHref(`Hello BrightWay, I'd like a quote for: ${service.name}.`)}
                  className="btn btn-line-light btn-large"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={20} aria-hidden="true" />
                  WhatsApp us
                </a>
              </div>
              <p className="mt-6 text-sm text-[#c9ced8]">
                {business.address.street}, {business.address.locality}, {business.address.region}
              </p>
            </div>
            {testimonial && (
              <div className="mt-10">
                <TestimonialFigure t={testimonial} tone="light" />
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="section bg-paper" aria-labelledby="related-title">
        <div className="wrap">
          <h2 id="related-title" className="text-h2">Related services</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/services/${r.slug}`}
                  className="group flex h-full flex-col justify-between gap-4 rounded-2xl bg-white p-6 outline-1 outline-line hover:outline-2 hover:outline-ink"
                >
                  <span>
                    <span className="mb-3 block"><TradeChips trade={r.trade} /></span>
                    <span className="block font-display text-xl font-extrabold">{r.name}</span>
                    <span className="mt-2 block text-muted">{r.summary}</span>
                  </span>
                  <ChevronRight size={24} className="self-end text-muted transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand quoteHref={`/contact#service=${service.formValue}`} />

      <JsonLd
        data={[
          pageSchema({
            path: `/services/${service.slug}`,
            name: service.h1,
            description: service.metaDescription,
            mainEntityId: `${absoluteUrl(`/services/${service.slug}`)}#service`,
          }),
          serviceSchema(service),
          faqSchema(service.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.name, path: `/services/${service.slug}` },
          ]),
        ]}
      />
    </>
  );
}
