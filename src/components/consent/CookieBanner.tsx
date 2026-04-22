"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/routing";
import { XIcon } from "@/components/ui/Icon";

const STORAGE_KEY = "best-cookie-consent";

type ConsentValue = "accepted" | "declined" | null;

function readConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  if (v === "accepted" || v === "declined") return v;
  return null;
}

function writeConsent(v: Exclude<ConsentValue, null>) {
  localStorage.setItem(STORAGE_KEY, v);
  // Fire a custom event so analytics can enable/disable dynamically
  window.dispatchEvent(new CustomEvent("cookie-consent", { detail: v }));
}

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setConsent(readConsent());
  }, []);

  const handle = (v: Exclude<ConsentValue, null>) => {
    writeConsent(v);
    setConsent(v);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {consent === null && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="fixed inset-x-0 bottom-0 z-[60] pointer-events-none p-3 sm:p-5"
          role="region"
          aria-label="Informasjonskapsler"
        >
          <div className="pointer-events-auto mx-auto max-w-3xl">
            <div className="rounded-2xl border border-white/10 bg-navy-900 p-5 text-white shadow-2xl shadow-navy-900/30 backdrop-blur-xl md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                    Informasjonskapsler
                  </h2>
                  <p className="mt-2 text-sm text-navy-100/85">
                    Vi bruker kun tekniske informasjonskapsler som er
                    nødvendige for å gi deg en trygg og fungerende opplevelse.
                    For anonym besøksanalyse (ingen sporing på tvers av
                    nettsteder) ber vi om ditt samtykke. Les mer i{" "}
                    <Link
                      href="/sikkerhet"
                      className="underline decoration-cyan-400 underline-offset-4 hover:text-cyan-200"
                    >
                      personvernerklæringen
                    </Link>
                    .
                  </p>
                </div>
                <button
                  onClick={() => handle("declined")}
                  aria-label="Lukk"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
                >
                  <XIcon size={16} />
                </button>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handle("accepted")}
                >
                  Godta anonym statistikk
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handle("declined")}
                  className="!text-white hover:!bg-white/10"
                >
                  Kun nødvendige
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
