"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, Phone, X, Download } from "lucide-react";
import { business, mainNav, telHref, whatsappHref } from "@/lib/site";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  // Capture the PWA install prompt event
  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setDeferredPrompt(null);
  };

  // Close the menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes; page does not scroll behind the open menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header on-dark">
      <div className="wrap flex h-full items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={36}
            height={40}
            priority
            className="h-10 w-auto"
          />
          <span className="leading-tight">
            <span className="block font-display text-[1.35rem] font-extrabold tracking-tight">
              {business.shortName}
            </span>
            <span className="block text-[0.8rem] text-[#c9ced8]">Technical Solutions</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a href={telHref} className="btn btn-amber ml-3">
            <Phone size={18} aria-hidden="true" />
            <span className="lg:hidden">Call now</span>
            <span className="hidden lg:inline">Call {business.phone.display}</span>
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 inline-flex h-12 w-12 items-center justify-center rounded-lg text-white hover:bg-white/10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="mobile-menu md:hidden">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-white/15">
              {[{ label: "Home", href: "/" }, ...mainNav].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-16 items-center font-display text-3xl font-extrabold"
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 grid gap-3">
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
            {deferredPrompt && (
              <button type="button" onClick={handleInstall} className="btn btn-ink btn-large mt-2">
                <Download size={20} aria-hidden="true" />
                Install App
              </button>
            )}
          </div>
          <p className="mt-6 text-[#c9ced8]">Emergency callouts: {business.emergencyHours}.</p>
        </div>
      )}
    </header>
  );
}
