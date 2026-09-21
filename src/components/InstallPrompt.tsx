"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "bw-install-dismissed";
const WEEK = 7 * 24 * 60 * 60 * 1000;

const safeGet = (k: string) => {
  try {
    return window.localStorage.getItem(k);
  } catch {
    return null;
  }
};
const safeSet = (k: string, v: string) => {
  try {
    window.localStorage.setItem(k, v);
  } catch {
    /* storage unavailable: prompt simply reappears next visit */
  }
};

/**
 * A small dismissible banner, not a full-screen modal, so it never blocks a
 * visitor who is trying to call. Appears after 20 seconds on phones only.
 */
export default function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [ios, setIos] = useState(false);
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true;
    const isPhone = window.matchMedia("(max-width: 767px)").matches;
    const dismissedAt = Number(safeGet(DISMISS_KEY) ?? 0);
    if (standalone || !isPhone || (dismissedAt && Date.now() - dismissedAt < WEEK)) return;

    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
    setIos(isIos);

    let timer: number | undefined;
    const show = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setVisible(true), 20000);
    };
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      show();
    };
    const onInstalled = () => setVisible(false);

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if (isIos) show();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const dismiss = () => {
    safeSet(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    if (outcome === "dismissed") safeSet(DISMISS_KEY, String(Date.now()));
    setVisible(false);
  };

  if (!visible || (!deferred && !ios)) return null;

  return (
    <div
      className="install-banner fixed inset-x-3 bottom-[5.25rem] z-50 rounded-2xl border border-line bg-white p-4 shadow-2xl md:hidden"
      role="region"
      aria-label="Install the BrightWay app"
    >
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss install suggestion"
        className="absolute right-1 top-1 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted hover:bg-paper"
      >
        <X size={20} aria-hidden="true" />
      </button>
      <p className="pr-10 font-display text-lg font-extrabold">Add BrightWay to your home screen</p>
      {ios && !deferred ? (
        <p className="mt-1 text-muted">
          Tap the Share button in Safari, then choose <strong>Add to Home Screen</strong>. One tap to call us next time.
        </p>
      ) : (
        <>
          <p className="mt-1 text-muted">One tap to call or message us, even with a weak connection.</p>
          <button type="button" onClick={install} className="btn btn-ink mt-3 w-full">
            <Download size={18} aria-hidden="true" />
            Install app
          </button>
        </>
      )}
    </div>
  );
}
