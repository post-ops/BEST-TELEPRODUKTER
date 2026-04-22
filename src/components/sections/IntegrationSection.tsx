"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";

// Generic integration capabilities based on BEST's own product language
// ("integrasjon med eksisterende systemer"). Specific EHR/PAS/DECT partner
// names must be confirmed with the client before being listed publicly.
const CAPABILITIES: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "network",
    title: "Åpne grensesnitt",
    body: "Veldefinerte API-er gjør det mulig å knytte BEST-plattformen sammen med fagsystemer, personal­lister og drifts­verktøy.",
  },
  {
    icon: "smartphone",
    title: "Smartphone + DECT + WiFi",
    body: "Alarmer rutes til riktig enhet — enten det er en smarttelefon i lomma, en DECT-telefon eller en stasjonær arbeidsstasjon.",
  },
  {
    icon: "shield",
    title: "Nøkkelfri tilgang",
    body: "Integrasjon mot elektroniske låser og tilgangssystemer — tilgang og alarm fungerer som én helhet.",
  },
  {
    icon: "activity",
    title: "Statistikk og rapport",
    body: "Eksporter driftdata til kundens egne BI-verktøy for dypere analyser og rapportering.",
  },
];

export function IntegrationSection() {
  return (
    <section className="relative overflow-hidden bg-paper-alt py-28">
      <div
        className="absolute inset-0 grid-bg opacity-[0.04]"
        aria-hidden
      />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="Integrasjon"
            title="Løsninger som spiller på lag med resten av huset."
            subtitle="BEST-plattformen er bygget for å integrere med systemene og infrastrukturen kunden allerede har — ikke erstatte alt."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {CAPABILITIES.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.19, 1, 0.22, 1],
                }}
                className="rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700">
                  <Icon name={c.icon} size={20} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {c.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
