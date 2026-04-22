"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Link } from "@/i18n/routing";
import { ArrowRightIcon } from "@/components/ui/Icon";

export function SolutionsTeaser() {
  const t = useTranslations("solutions");
  const tc = useTranslations("common");

  const items: {
    key: "hospital" | "healthInstitution" | "nursingHome";
    slug: string;
    icon: IconName;
    feature: string[];
  }[] = [
    {
      key: "hospital",
      slug: "sykehus",
      icon: "hospital",
      feature: ["Skalerbar arkitektur", "EPJ-integrasjon", "24/7 drift"],
    },
    {
      key: "healthInstitution",
      slug: "helseinstitusjon",
      icon: "stethoscope",
      feature: ["Brukervennlig", "Overfallsalarm", "Mobil varsling"],
    },
    {
      key: "nursingHome",
      slug: "sykehjem",
      icon: "homeHeart",
      feature: ["Trådløs", "NFC-tilstedeværelse", "Nøkkelfri tilgang"],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-navy-950 py-28 text-white">
      <div className="absolute inset-0 grid-bg opacity-[0.06]" aria-hidden />
      <div className="absolute -top-80 left-1/2 h-[600px] w-[140%] -translate-x-1/2 rounded-[50%] bg-cyan-500/10 blur-3xl" aria-hidden />

      <Container className="relative">
        <SectionHeading
          eyebrow="Løsninger"
          title={t("title")}
          tone="dark"
          align="center"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
            >
              <Link
                href={{ pathname: "/losninger/[slug]", params: { slug: item.slug } }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-navy-900 to-navy-950 p-10 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40"
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:bg-cyan-500/20" aria-hidden />

                <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-300 ring-1 ring-cyan-500/30 transition-all duration-500 group-hover:bg-cyan-400 group-hover:text-navy-950 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]">
                  <Icon name={item.icon} size={30} />
                </div>

                <h3 className="mt-8 text-3xl font-bold tracking-tight">
                  {t(item.key)}
                </h3>
                <p className="mt-3 text-navy-100/70">
                  {t(`${item.key}Desc` as "hospitalDesc" | "healthInstitutionDesc" | "nursingHomeDesc")}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {item.feature.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-white/70"
                    >
                      <span className="h-1 w-4 bg-cyan-400" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>

                <span className="relative mt-auto inline-flex items-center gap-2 pt-10 text-sm font-semibold text-cyan-300 transition-all group-hover:gap-3 group-hover:text-cyan-200">
                  {tc("learnMore")}
                  <ArrowRightIcon size={16} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
