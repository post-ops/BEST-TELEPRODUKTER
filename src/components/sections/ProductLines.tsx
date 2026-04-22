"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Link } from "@/i18n/routing";
import { ArrowRightIcon } from "@/components/ui/Icon";

const PRODUCTS: {
  name: string;
  line: string;
  description: string;
  icon: IconName;
  accent: string;
  glow: string;
  image?: string;
}[] = [
  {
    name: "BEST IQ",
    line: "Intelligent tilkalling",
    description:
      "Integrert plattform som samler alle alarmer og ruter dem via smarttelefon.",
    icon: "network",
    accent: "from-cyan-400 to-cyan-600",
    glow: "shadow-cyan-500/30",
    image: "/images/bestgroup/best_news_workflow.png",
  },
  {
    name: "BESTsenior",
    line: "Sykehjem",
    description:
      "Trådløse alarmenheter, NFC-tilstedeværelse og nøkkelfri romtilgang.",
    icon: "homeHeart",
    accent: "from-teal-400 to-emerald-500",
    glow: "shadow-teal-500/30",
    image: "/images/bestgroup/best_news_wireless_call_units.jpg",
  },
  {
    name: "BESTinfotainment",
    line: "Pasientunderholdning",
    description:
      "Touch-terminal ved sengen — TV, radio, film, musikk, spill og internett.",
    icon: "smartphone",
    accent: "from-indigo-400 to-violet-600",
    glow: "shadow-indigo-500/30",
    image: "/images/bestgroup/best_news_medipad.png",
  },
  {
    name: "BESTproactive",
    line: "Overfallsalarm",
    description:
      "Personlig overfallsalarm med presis posisjonering. For psykiatri og akuttmottak.",
    icon: "shield",
    accent: "from-rose-400 to-rose-600",
    glow: "shadow-rose-500/30",
  },
  {
    name: "BESTmate",
    line: "Alarmhåndtering",
    description:
      "App som gjør smarttelefonen til en komplett alarm-terminal for pleiepersonell.",
    icon: "activity",
    accent: "from-amber-400 to-orange-500",
    glow: "shadow-amber-500/30",
  },
  {
    name: "BESTcritical response",
    line: "Kritiske alarmer",
    description:
      "Høyprioritets håndtering med garantert leveringsbekreftelse.",
    icon: "heartPulse",
    accent: "from-red-400 to-red-600",
    glow: "shadow-red-500/30",
  },
];

export function ProductLines() {
  const t = useTranslations("productLines");
  const tc = useTranslations("common");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-28">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(0,180,216,0.08),transparent)]"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="Produktlinjer"
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.07,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <Link
                href="/produkter"
                className={`group relative block h-full overflow-hidden rounded-3xl border border-navy-900/10 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/30 hover:shadow-2xl hover:${p.glow}`}
              >
                <div
                  className={`absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${p.accent} opacity-10 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-30`}
                  aria-hidden
                />
                <div
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden
                />

                {/* Product photo, if available — sits behind the icon */}
                {p.image && (
                  <div className="absolute -right-8 top-4 h-32 w-32 opacity-30 transition-all duration-500 group-hover:-right-4 group-hover:opacity-50 md:h-40 md:w-40">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-contain"
                      aria-hidden
                    />
                  </div>
                )}

                <div
                  className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${p.accent} text-white shadow-lg transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110`}
                >
                  <Icon name={p.icon} size={26} />
                </div>
                <p className="relative mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-muted">
                  {p.line}
                </p>
                <h3 className="relative mt-2 text-2xl font-bold tracking-tight text-navy-900">
                  {p.name}
                </h3>
                <p className="relative mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
                  {p.description}
                </p>
                <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition-all group-hover:gap-3 group-hover:text-cyan-900">
                  {tc("learnMore")}
                  <ArrowRightIcon size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
