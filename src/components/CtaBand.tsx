import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { business, telHref, whatsappHref } from "@/lib/site";

/** Closing call to action shown at the bottom of inner pages. */
export default function CtaBand({
  title = "Need an electrician or plumber?",
  text = "Call us or send a message. Quotes are free, and emergency callouts run 24 hours a day.",
  quoteHref = "/contact",
}: {
  title?: string;
  text?: string;
  quoteHref?: string;
}) {
  return (
    <section className="on-dark bg-black text-white" aria-labelledby="cta-title">
      <div className="wrap section grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <h2 id="cta-title" className="text-h2">{title}</h2>
          <p className="mt-4 max-w-[52ch] text-lead text-[#d3d7df]">{text}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <a href={telHref} className="btn btn-amber btn-large">
            <Phone size={20} aria-hidden="true" />
            Call {business.phone.display}
          </a>
          <a
            href={whatsappHref()}
            className="btn btn-line-light btn-large"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Message on WhatsApp
          </a>
          <Link href={quoteHref} className="btn btn-line-light btn-large sm:col-span-2 lg:col-span-1">
            Request a free quote
          </Link>
        </div>
      </div>
    </section>
  );
}
