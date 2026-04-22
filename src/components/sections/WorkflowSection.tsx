"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { LinkButton } from "@/components/ui/LinkButton";
import { ArrowRightIcon } from "@/components/ui/Icon";

// Feature bullets are BEST's own product module categories as stated on
// bestgroup.no: alarmhåndtering, oppgavehåndtering, kritiske alarmer,
// planlegging og statistikk.
const MODULES: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "bell",
    title: "Alarmhåndtering",
    description:
      "Mottak, prioritering og håndtering av alarmer direkte på smarttelefonen.",
  },
  {
    icon: "activity",
    title: "Oppgavehåndtering",
    description:
      "Strukturert fordeling av oppgaver mellom vaktlag og avdelinger.",
  },
  {
    icon: "heartPulse",
    title: "Kritiske alarmer",
    description:
      "Høyprioriterte alarmer med garantert leveringsbekreftelse.",
  },
  {
    icon: "network",
    title: "Planlegging og statistikk",
    description:
      "Oversikt, rapportering og innsikt i driften over tid.",
  },
];

export function WorkflowSection() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_50%,rgba(0,180,216,0.06),transparent)]" aria-hidden />
      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-700">
            <span className="h-1 w-6 rounded-full bg-cyan-500" />
            Workflow @ the point of care
          </span>

          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-navy-900 md:text-5xl">
            Bruk mindre tid på dokumentasjon
            <br />
            <span className="bg-gradient-to-br from-cyan-500 to-navy-700 bg-clip-text text-transparent">
              — og mer på pasientbehandling.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-pretty text-lg text-ink-muted">
            BEST sine intelligente alarm- og kommunikasjonsløsninger samler
            maskinvare, programvare og mobilapper i én plattform — slik at
            pleiepersonell kan planlegge, håndtere og dokumentere hvor enn de
            befinner seg.
          </p>

          <dl className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {MODULES.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700">
                  <Icon name={m.icon} size={20} />
                </div>
                <div>
                  <dt className="font-semibold text-navy-900">{m.title}</dt>
                  <dd className="mt-1 text-sm text-ink-muted">{m.description}</dd>
                </div>
              </motion.div>
            ))}
          </dl>

          <div className="mt-10">
            <LinkButton href="/produkter">
              Utforsk BEST-plattformen
              <ArrowRightIcon size={16} />
            </LinkButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="relative"
        >
          {/* Decorative glow */}
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(0,180,216,0.3),transparent_60%)]"
            aria-hidden
          />

          {/* Main workflow app image — phone with BEST app */}
          <div className="relative mx-auto max-w-sm">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/images/bestgroup/best_news_workflow.png"
                alt="BESTmate mobile alarm-håndtering på smarttelefon"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-contain drop-shadow-[0_30px_40px_rgba(0,180,216,0.25)]"
              />
            </div>
          </div>

          {/* Floating badges */}
          <div className="absolute left-0 top-10 hidden rounded-2xl border border-navy-900/5 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm md:block">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan-700">
              Smartphone
            </p>
            <p className="mt-0.5 text-sm font-semibold text-navy-900">
              NFC-tilstedeværelse
            </p>
          </div>
          <div className="absolute bottom-12 right-0 hidden rounded-2xl border border-navy-900/5 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm md:block">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan-700">
              Integrert
            </p>
            <p className="mt-0.5 text-sm font-semibold text-navy-900">
              Alarm · oppgave · plan
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
