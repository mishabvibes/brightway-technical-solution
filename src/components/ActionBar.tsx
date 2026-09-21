import { MessageCircle, Phone } from "lucide-react";
import { telHref, whatsappHref } from "@/lib/site";

/** Always-visible call and WhatsApp buttons on phones. Hidden from 768px up. */
export default function ActionBar() {
  return (
    <div className="action-bar on-dark" role="region" aria-label="Contact us quickly">
      <a href={telHref} className="btn btn-amber">
        <Phone size={20} aria-hidden="true" />
        Call now
      </a>
      <a
        href={whatsappHref()}
        className="btn btn-line-light"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={20} aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}
