import Image from "next/image";
import type { Testimonial } from "@/lib/content";

export function TestimonialFigure({ t, tone = "dark" }: { t: Testimonial; tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <figure className={`flex h-full flex-col ${dark ? "border-t border-white/25 pt-6" : "border-t-4 border-amber pt-6"}`}>
      <span className="quote-mark block text-7xl" aria-hidden="true">&ldquo;</span>
      <blockquote className={`-mt-2 text-lg leading-relaxed ${dark ? "text-white" : "text-ink"}`}>
        <p>{t.quote}</p>
      </blockquote>
      <figcaption className="mt-auto flex items-center gap-4 pt-6">
        <span className="block h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-full bg-paper">
          <Image
            src={t.image}
            alt={`Portrait of ${t.name}`}
            width={190}
            height={190}
            className="h-full w-full scale-[2.6] object-cover"
            style={{ objectPosition: t.face, transformOrigin: t.face }}
          />
        </span>
        <span className="leading-snug">
          <span className="block font-display text-lg font-extrabold">{t.name}</span>
          <span className={dark ? "text-[#c9ced8]" : "text-muted"}>{t.detail}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** All testimonials visible at once: no auto-advancing carousel, so nothing is hidden from readers or crawlers. */
export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
      {items.map((t) => (
        <TestimonialFigure key={t.id} t={t} />
      ))}
    </div>
  );
}
