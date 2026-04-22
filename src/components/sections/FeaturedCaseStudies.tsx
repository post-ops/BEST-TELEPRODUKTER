"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/routing";
import { ArrowRightIcon } from "@/components/ui/Icon";

// Photos from bestgroup.no — used with design heritage of parent group.
// Only client names, locations and segments are stated as facts.
const FEATURED = [
  {
    slug: "dnu-aarhus",
    client: "Det Nye Universitetshospital",
    location: "Aarhus · Danmark",
    description:
      "Implementering av BEST-løsninger ved et av Nordens største sykehusprosjekter.",
    segment: "Universitetssykehus",
    image: "/images/bestgroup/dnu_referens.jpg",
    accent: "cyan",
  },
  {
    slug: "nks-stockholm",
    client: "Nya Karolinska Solna",
    location: "Stockholm · Sverige",
    description:
      "Komplett tilkallings- og overfallsalarmløsning for høyspesialisert akuttsykehus.",
    segment: "Akuttsykehus",
    image: "/images/bestgroup/nks_referens.jpg",
    accent: "indigo",
  },
  {
    slug: "skaraborg",
    client: "Skaraborg Sjukhus",
    location: "Skövde · Sverige",
    description:
      "BEST-løsninger levert for sykehusdrift og psykiatrisk avdeling.",
    segment: "Psykiatri",
    image: "/images/bestgroup/sss_referens.jpg",
    accent: "rose",
  },
];

export function FeaturedCaseStudies() {
  const t = useTranslations("caseStudies");
  const tc = useTranslations("common");

  return (
    <section className="py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Referanseprosjekter"
            title={t("title")}
            subtitle={t("subtitle")}
          />
          <Link
            href="/referanser"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-900"
          >
            {tc("viewAll")}
            <ArrowRightIcon
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <Link
                href="/referanser"
                className="group relative block h-full min-h-[480px] overflow-hidden rounded-3xl bg-navy-950 text-white shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-15px_rgba(10,37,64,0.5)]"
              >
                {/* Background image */}
                <Image
                  src={c.image}
                  alt={c.client}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  priority={i === 0}
                />

                {/* Dark gradient overlay for readability */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/20"
                  aria-hidden
                />
                {/* Subtle cyan tint top-right */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-cyan-500/20"
                  aria-hidden
                />

                {/* Frame lines */}
                <div className="absolute left-4 right-4 top-4 h-px bg-white/15" aria-hidden />
                <div className="absolute bottom-4 left-4 right-4 h-px bg-white/15" aria-hidden />
                <div className="absolute left-4 top-4 bottom-4 w-px bg-white/15" aria-hidden />
                <div className="absolute right-4 top-4 bottom-4 w-px bg-white/15" aria-hidden />

                <div className="relative flex h-full flex-col justify-between p-10">
                  <div>
                    <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300">
                      <span className="h-1 w-5 bg-cyan-400" />
                      {c.location}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                      {c.client}
                    </h3>
                    <p className="mt-3 text-pretty text-sm text-white/80 md:text-base">
                      {c.description}
                    </p>
                    <div className="mt-8 flex items-end justify-between border-t border-white/15 pt-6">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-cyan-300">
                          Segment
                        </div>
                        <div className="mt-1 text-lg font-semibold text-white">
                          {c.segment}
                        </div>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 backdrop-blur-sm transition-all duration-500 group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:text-navy-950">
                        <ArrowRightIcon size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
