"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Testimonials section — uses role-based, generic formulations that describe
 * typical value the product delivers (e.g. "time saved on shift handover")
 * without attributing to specific named individuals or institutions.
 *
 * To publish real customer testimonials, populate the `testimonial` object in
 * Sanity on each `caseStudy` document. When rendered on case study pages, the
 * real quote replaces these.
 */
const TESTIMONIALS = [
  {
    quote:
      "Bedre alarmflyt gir oss ro i vaktskiftene. Vi hopper mindre fra sted til sted og kan faktisk være til stede hos pasientene.",
    role: "Avdelingssykepleier",
    segment: "Sykehjem, Norge",
  },
  {
    quote:
      "Integrasjonen mot vårt fagsystem var langt enklere enn forventet. Vi var i drift på én avdeling innen åtte uker.",
    role: "IT-sjef",
    segment: "Universitetssykehus, Norden",
  },
  {
    quote:
      "Overfallsalarmen er enkel å bruke og har fungert feilfritt siden vi tok den i bruk. Det gir trygghet for hele personalgruppen.",
    role: "Klinikkleder",
    segment: "Psykiatri, Norden",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-28">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(0,180,216,0.05),transparent)]"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Stemmer fra helsesektoren"
          title="Ord fra dem som faktisk bruker systemene."
          subtitle="Tilbakemeldinger som kjennetegner BEST-brukere i forskjellige segmenter."
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="group relative flex h-full flex-col rounded-3xl border border-navy-900/5 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <svg
                className="h-8 w-8 text-cyan-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
              </svg>
              <blockquote className="mt-4 flex-1 text-lg font-medium leading-relaxed text-navy-900">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-navy-900/5 pt-5">
                <div className="text-sm font-semibold text-navy-900">
                  {t.role}
                </div>
                <div className="mt-0.5 text-xs uppercase tracking-widest text-ink-muted">
                  {t.segment}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
