import type { Faq as FaqItem } from "@/lib/content";

/** Native <details>: keyboard accessible, no JavaScript, and every answer is in the HTML for crawlers. */
export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>{item.q}</summary>
          <p className="faq-answer">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
