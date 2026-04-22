"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

/**
 * Privacy-friendly analytics via Plausible.
 * Only loads after the user has accepted cookies.
 * Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN to enable (e.g. bestteleprodukter.no).
 */
export function PlausibleScript() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("best-cookie-consent");
    if (stored === "accepted") setConsented(true);
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setConsented(detail === "accepted");
    };
    window.addEventListener("cookie-consent", handler);
    return () => window.removeEventListener("cookie-consent", handler);
  }, []);

  if (!domain || !consented) return null;

  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
