"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/routing";
import { ArrowRightIcon } from "@/components/ui/Icon";

// Only client names and locations are retained — specific performance
// metrics have been removed pending documentation from Best Teleprodukter.
const FEATURED = [
  {
    slug: "dnu-aarhus",
    client: "Det Nye Universitetshospital",
    location: "Aarhus · Danmark",
    description:
      "Omfattende implementering av BEST IQ ved et av Nordens største sykehusprosjekter.",
    segment: "Universitetssykehus",
    image:
      "bg-[radial-gradient(ellipse_80%_60%_at_30%_30%,rgba(34,211,238,0.5),transparent_60%),radial-gradient(ellipse_70%_50%_at_80%_80%,rgba(79,70,229,0.4),transparent_60%),linear-gradient(135deg,#0a2540,#05152a)]",
  },
  {
    slug: "nks-stockholm",
    client: "Nya Karolinska Solna",
    location: "Stockholm · Sverige",
    description:
      "Komplett tilkallings- og overfallsalarmløsning for høyspesialisert akuttsykehus.",
    segment: "Akuttsykehus",
    image:
      "bg-[radial-gradient(ellipse_70%_60%_at_60%_20%,rgba(139,92,246,0.45),transparent_60%),radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(34,211,238,0.35),transparent_60%),linear-gradient(135deg,#0a2540,#05152a)]",
  },
  {
    slug: "skaraborg",
    client: "Skaraborg Sjukhus",
    location: "Skövde · Sverige",
    description:
      "BESTproactive implementert på psykiatrisk avdeling for styrket sikkerhet for både personale og pasienter.",
    segment: "Psykiatri",
    image:
      "bg-[radial-gradient(ellipse_70%_60%_at_30%_70%,rgba(244,63,94,0.4),transparent_60%),radial-gradient(ellipse_60%_50%_at_80%_20%,rgba(249,115,22,0.3),transparent_60%),linear-gradient(135deg,#0a2540,#05152a)]",
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
                className={`group relative block h-full min-h-[420px] overflow-hidden rounded-3xl text-white shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-15px_rgba(10,37,64,0.5)] ${c.image}`}
              >
                <div className="absolute inset-0 grid-bg opacity-[0.08]" aria-hidden />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent transition-opacity duration-500 group-hover:from-navy-950/90"
                  aria-hidden
                />

                <div className="absolute left-4 right-4 top-4 h-px bg-white/10" aria-hidden />
                <div className="absolute bottom-4 left-4 right-4 h-px bg-white/10" aria-hidden />
                <div className="absolute left-4 top-4 bottom-4 w-px bg-white/10" aria-hidden />
                <div className="absolute right-4 top-4 bottom-4 w-px bg-white/10" aria-hidden />

                <div className="relative flex h-full flex-col justify-between p-10">
                  <div>
                    <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300">
                      <span className="h-1 w-5 bg-cyan-400" />
                      {c.location}
                    </p>
                    <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight md:text-3xl">
                      {c.client}
                    </h3>
                  </div>

                  <div>
                    <p className="text-pretty text-sm text-white/75 md:text-base">
                      {c.description}
                    </p>
                    <div className="mt-8 flex items-end justify-between border-t border-white/10 pt-6">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-cyan-300">
                          Segment
                        </div>
                        <div className="mt-1 text-lg font-semibold text-white">
                          {c.segment}
                        </div>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 transition-all duration-500 group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:text-navy-950">
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
