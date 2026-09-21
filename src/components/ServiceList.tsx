import Link from "next/link";
import { ChevronRight, Siren } from "lucide-react";
import { services } from "@/lib/content";
import TradeChips from "./TradeChips";

/** The full service schedule. Emergency is pulled out first because it is the most urgent need. */
export default function ServiceList({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  const urgent = services.find((s) => s.slug === "emergency-electrician-plumber");
  const rest = services.filter((s) => s.slug !== "emergency-electrician-plumber");

  return (
    <div>
      {urgent && (
        <Link href={`/services/${urgent.slug}`} className="service-row service-row-urgent">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 font-bold">
              <Siren size={20} aria-hidden="true" />
              Open 24 hours a day
            </p>
            <Heading className="text-h3">{urgent.name}</Heading>
            <p className="mt-2 max-w-[52ch] text-black/85">{urgent.summary}</p>
          </div>
          <ChevronRight className="service-arrow mt-1" size={28} aria-hidden="true" />
        </Link>
      )}
      <ul>
        {rest.map((s) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}`} className="service-row">
              <div>
                <div className="mb-3">
                  <TradeChips trade={s.trade} />
                </div>
                <Heading className="text-h3">{s.name}</Heading>
                <p className="mt-2 max-w-[52ch] text-muted">{s.summary}</p>
              </div>
              <ChevronRight className="service-arrow mt-1 text-muted" size={28} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
