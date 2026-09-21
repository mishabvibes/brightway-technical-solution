"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { formServiceOptions } from "@/lib/content";
import { business, telHref, whatsappHref } from "@/lib/site";

type Errors = Partial<Record<"name" | "phone" | "service" | "email", string>>;
type Channel = "whatsapp" | "email";

const phoneOk = (v: string) => /^[+()\-\s\d]{7,20}$/.test(v) && v.replace(/\D/g, "").length >= 7;
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/**
 * Quote form with no backend required. It validates, then opens WhatsApp or the
 * visitor's email app with the enquiry already written, so no lead is lost.
 * To send to a server instead, replace send() with a fetch() to your endpoint.
 */
export default function ContactForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<Channel | null>(null);
  const [service, setService] = useState("");

  // Pre-select the service when arriving from a service page. The value travels in the URL hash
  // (/contact#service=plumbing) so it never creates a separate crawlable URL. ?service= still works.
  useEffect(() => {
    const fromHash = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("service");
    const fromQuery = new URLSearchParams(window.location.search).get("service");
    const wanted = fromHash ?? fromQuery;
    if (wanted && formServiceOptions.some((o) => o.value === wanted)) setService(wanted);
  }, []);

  const id = (name: string) => `${uid}-${name}`;

  function send(channel: Channel) {
    const form = formRef.current;
    if (!form) return;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const name = (data.name ?? "").trim();
    const phone = (data.phone ?? "").trim();
    const email = (data.email ?? "").trim();
    const message = (data.message ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Enter your name.";
    if (!phone) next.phone = "Enter a phone number we can reach you on.";
    else if (!phoneOk(phone)) next.phone = "Enter a valid phone number, for example +91 98765 43210.";
    if (!service) next.service = "Choose the service you need.";
    if (email && !emailOk(email)) next.email = "Enter a valid email address, or leave it blank.";
    setErrors(next);

    const firstInvalid = (["name", "phone", "service", "email"] as const).find((k) => next[k]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      setSent(null);
      return;
    }

    const serviceLabel = formServiceOptions.find((o) => o.value === service)?.label ?? service;
    const lines = [
      `Hello ${business.shortName}, my name is ${name}.`,
      `Service needed: ${serviceLabel}`,
      message && `Details: ${message}`,
      `Phone: ${phone}`,
      email && `Email: ${email}`,
    ].filter(Boolean);
    const text = lines.join("\n");

    if (channel === "whatsapp") {
      window.open(whatsappHref(text), "_blank", "noopener,noreferrer");
    } else {
      const subject = `Quote request: ${serviceLabel}`;
      window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
    setSent(channel);
  }

  const describe = (name: keyof Errors) => (errors[name] ? id(`${name}-error`) : undefined);

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        send("whatsapp");
      }}
      className="grid gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor={id("name")}>Your name</label>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            className="field"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
          />
          {errors.name && <p id={id("name-error")} className="field-error" role="alert">{errors.name}</p>}
        </div>
        <div>
          <label className="field-label" htmlFor={id("phone")}>Phone number</label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            className="field"
            placeholder="+91"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describe("phone")}
          />
          {errors.phone && <p id={id("phone-error")} className="field-error" role="alert">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor={id("service")}>Service needed</label>
          <select
            id={id("service")}
            name="service"
            required
            className="field"
            value={service}
            onChange={(e) => setService(e.target.value)}
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={describe("service")}
          >
            <option value="" disabled>Choose a service</option>
            {formServiceOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {errors.service && <p id={id("service-error")} className="field-error" role="alert">{errors.service}</p>}
        </div>
        <div>
          <label className="field-label" htmlFor={id("email")}>Email (optional)</label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            className="field"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
          />
          {errors.email && <p id={id("email-error")} className="field-error" role="alert">{errors.email}</p>}
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor={id("message")}>What do you need done? (optional)</label>
        <textarea id={id("message")} name="message" rows={4} className="field" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button type="submit" className="btn btn-amber btn-large">
          <MessageCircle size={20} aria-hidden="true" />
          Send on WhatsApp
        </button>
        <button type="button" className="btn btn-line btn-large" onClick={() => send("email")}>
          <Mail size={20} aria-hidden="true" />
          Send by email
        </button>
      </div>

      <div aria-live="polite" className="min-h-6">
        {sent && (
          <p className="rounded-lg bg-paper p-4 font-bold">
            {sent === "whatsapp"
              ? "WhatsApp is opening with your message ready to send. Press send to finish."
              : "Your email app is opening with your message ready to send."}{" "}
            <span className="font-normal">
              Prefer to talk? Call <a className="link" href={telHref}>{business.phone.display}</a>.
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
