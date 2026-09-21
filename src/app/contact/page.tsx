import Breadcrumbs from "@/components/Breadcrumbs";
import ContactPanel from "@/components/ContactPanel";
import JsonLd from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, pageSchema } from "@/lib/schema";

export const metadata = pageMetadata({
  title: "Contact & Free Quotes, Mannarkkad",
  description:
    "Call +91 91881 26866 or send a message for a free electrical or plumbing quote in Mannarkkad, Kerala. Emergency callouts 24/7. Changaleeri, Mannarkkad 678762.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-paper">
        <div className="wrap pb-16 pt-4 lg:pb-24">
          <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
          <div className="mt-6">
            <ContactPanel headingLevel="h1" />
          </div>
        </div>
      </section>
      <JsonLd
        data={[
          pageSchema({
            type: "ContactPage",
            path: "/contact",
            name: "Contact BrightWay Technical Solutions",
            description: "Call, message or email BrightWay for a free electrical or plumbing quote in Mannarkkad, Kerala.",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
    </>
  );
}
