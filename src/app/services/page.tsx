import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import ServiceList from "@/components/ServiceList";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Electrical & Plumbing Services in Mannarkkad",
  description:
    "Electrical, plumbing, 24/7 emergency, maintenance, safety inspection and smart home services in Mannarkkad, Kerala. Free quotes. Call +91 91881 26866.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section className="bg-paper">
        <div className="wrap pb-12 pt-4 lg:pb-16">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services" }]} />
          <h1 className="text-h1 mt-4 max-w-[22ch]">Electrical and plumbing services in Mannarkkad</h1>
          <p className="mt-5 max-w-[56ch] text-lead text-muted">
            One team for the wiring and the pipes. Choose a service to see what is included, when to call us and
            the questions people ask most.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap max-w-4xl">
          <ServiceList headingLevel="h2" />
        </div>
      </section>
      <CtaBand />
      <JsonLd
        data={[
          pageSchema({
            type: "CollectionPage",
            path: "/services",
            name: "Electrical & Plumbing Services in Mannarkkad",
            description: "Every BrightWay service: electrical, plumbing, 24/7 emergency, maintenance, safety inspection and smart home.",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
    </>
  );
}
