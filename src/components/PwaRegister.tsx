"use client";

import { useEffect } from "react";

/** Registers the service worker (public/sw.js) in production only. */
export default function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
      /* Offline support is an enhancement; the site works without it. */
    });
  }, []);
  return null;
}
