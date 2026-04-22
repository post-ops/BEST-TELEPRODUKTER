"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icon";

// Downloadable material. Real PDFs/datablad should be uploaded via Sanity
// (or the client's DAM) and linked here. Placeholders point to the contact
// form so leads still flow until materials are published.
type DownloadItem = {
  title: string;
  description: string;
  format: string;
  sizeHint: string;
  // href — when real PDFs exist, swap to "/downloads/filename.pdf"
  href: "/kontakt";
};

const DOWNLOADS: DownloadItem[] = [
  {
    title: "BEST IQ — produktoversikt",
    description:
      "Samlet oversikt over plattformens kapabiliteter, integrasjoner og typiske installasjonsscenarier.",
    format: "PDF",
    sizeHint: "Kommer",
    href: "/kontakt",
  },
  {
    title: "BESTsenior — datablad",
    description:
      "Teknisk datablad for BESTsenior — trådløse enheter, NFC, batterilevetid og dekningsrekkevidde.",
    format: "PDF",
    sizeHint: "Kommer",
    href: "/kontakt",
  },
  {
    title: "Sikkerhet og GDPR",
    description:
      "Detaljert oversikt over hvordan vi håndterer sensitive helseopplysninger, kryptering og tilgangsstyring.",
    format: "PDF",
    sizeHint: "Kommer",
    href: "/kontakt",
  },
];

export function DownloadCTA() {
  return (
    <section className="py-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-700">
              <span className="h-1 w-6 rounded-full bg-cyan-500" />
              Dokumentasjon
            </span>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-navy-900 md:text-4xl lg:text-5xl">
              Last ned datablad og teknisk dokumentasjon.
            </h2>
            <p className="mt-6 max-w-lg text-pretty text-ink-muted">
              Gi teamet ditt alt de trenger for å vurdere BEST — fra
              tekniske spesifikasjoner til sikkerhetsprofil og
              integrasjonsveiledninger.
            </p>
            <ul className="mt-8 space-y-2 text-sm text-ink-muted">
              <li className="flex items-start gap-2">
                <CheckIcon size={18} className="mt-0.5 shrink-0 text-cyan-600" />
                Oppdatert for 2026
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={18} className="mt-0.5 shrink-0 text-cyan-600" />
                Klare for innkjøpsdokumentasjon
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={18} className="mt-0.5 shrink-0 text-cyan-600" />
                På norsk og engelsk
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {DOWNLOADS.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.19, 1, 0.22, 1],
                }}
              >
                <Link
                  href={d.href}
                  className="group flex items-start gap-5 rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700 transition-colors group-hover:bg-cyan-500 group-hover:text-white">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                      <path d="M12 17v-6" />
                      <path d="m9 14 3 3 3-3" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-navy-900">
                        {d.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-ink-muted">
                      {d.description}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
                      <span>{d.format}</span>
                      <span className="h-3 w-px bg-navy-900/10" />
                      <span className="text-cyan-700">{d.sizeHint}</span>
                    </div>
                  </div>
                  <ArrowRightIcon
                    size={18}
                    className="mt-1.5 shrink-0 text-cyan-600 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
