"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { ArrowRightIcon } from "@/components/ui/Icon";

export function ContactCTA() {
  const t = useTranslations("contactCta");

  return (
    <section className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-10 text-white md:p-16"
        >
          <div className="absolute inset-0 grid-bg opacity-10" aria-hidden />
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" aria-hidden />
          <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-navy-500/30 blur-3xl" aria-hidden />

          <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                {t("title")}
              </h2>
              <p className="mt-4 text-pretty text-lg text-navy-100/80">
                {t("subtitle")}
              </p>
            </div>
            <LinkButton href="/kontakt" size="lg">
              {t("cta")}
              <ArrowRightIcon size={18} />
            </LinkButton>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
