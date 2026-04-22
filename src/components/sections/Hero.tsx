"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { HeroScene } from "@/components/3d/HeroScene";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { ArrowRightIcon } from "@/components/ui/Icon";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pt-32 md:pt-36">
      {/* Background field */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_30%,rgba(0,180,216,0.18),transparent_60%),radial-gradient(ellipse_60%_50%_at_20%_80%,rgba(79,70,229,0.12),transparent_60%)]"
        aria-hidden
      />
      <div className="absolute inset-0 grid-bg opacity-[0.04]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Kinetic marquee */}
      <div className="relative border-y border-white/5 bg-black/30 py-2.5 backdrop-blur-sm">
        <div className="mask-fade-x overflow-hidden">
          <div className="flex animate-marquee gap-12 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.3em] text-white/50">
            {Array.from({ length: 2 }).map((_, g) => (
              <div key={g} className="flex shrink-0 gap-12">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  Markedsleder i Skandinavia
                </span>
                <span>·</span>
                <span>Siden 1979</span>
                <span>·</span>
                <span>DNU Aarhus</span>
                <span>·</span>
                <span>Nya Karolinska Solna</span>
                <span>·</span>
                <span>SUS Malmö</span>
                <span>·</span>
                <span>Skaraborg Sjukhus</span>
                <span>·</span>
                <span>Del av Best Group</span>
                <span>·</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Container className="relative grid grid-cols-1 items-center gap-10 pb-28 pt-16 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:pb-36 lg:pt-24">
        {/* Text column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="relative z-10 max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-200 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
            </span>
            {t("eyebrow")}
          </span>

          <h1 className="mt-8 text-balance text-4xl font-bold leading-[1.02] tracking-[-0.025em] text-white sm:text-5xl md:text-6xl lg:text-[72px]">
            Pasientvarsling som{" "}
            <span className="bg-gradient-to-br from-cyan-300 via-cyan-400 to-white bg-clip-text text-transparent">
              redder tid og liv.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base text-white/70 md:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <LinkButton href="/produkter" size="lg">
              {t("ctaPrimary")}
              <ArrowRightIcon size={18} />
            </LinkButton>
            <LinkButton
              href="/referanser"
              size="lg"
              variant="ghost"
              className="!text-white/90 hover:!bg-white/10"
            >
              {t("ctaSecondary")}
            </LinkButton>
          </div>

          {/* Inline spec strip */}
          <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-8 md:gap-8">
            {[
              { v: "1979", l: "grunnlagt" },
              { v: "#1", l: "Skandinavia" },
              { v: "3", l: "kontorer i Norge" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="text-3xl font-bold text-white md:text-4xl">
                  {s.v}
                </dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-white/50">
                  {s.l}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* 3D column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
          className="relative aspect-square w-full max-w-lg justify-self-center lg:max-w-none lg:h-[560px]"
        >
          <HeroScene />

          {/* Floating status pills */}
          <div
            className="pointer-events-none absolute left-2 top-10 md:left-0 md:top-16"
            aria-hidden
          >
            <Callout dotColor="bg-rose-400" label="Alarm" value="Rom 214" subtle="prio 1" />
          </div>
          <div
            className="pointer-events-none absolute right-2 top-1/2 md:right-0"
            aria-hidden
          >
            <Callout dotColor="bg-cyan-400" label="Ruting" value="28 ms" subtle="EPJ sync" />
          </div>
          <div
            className="pointer-events-none absolute bottom-12 left-4 md:bottom-16 md:left-2"
            aria-hidden
          >
            <Callout
              dotColor="bg-emerald-400"
              label="Mottatt"
              value="Smartphone"
              subtle="ack 142 ms"
            />
          </div>
        </motion.div>
      </Container>

      {/* Scroll hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/40">
        <span className="flex flex-col items-center gap-2">
          Scroll
          <span className="relative block h-8 w-px bg-gradient-to-b from-white/40 to-transparent">
            <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 animate-scroll-hint bg-cyan-400" />
          </span>
        </span>
      </div>
    </section>
  );
}

function Callout({
  dotColor,
  label,
  value,
  subtle,
}: {
  dotColor: string;
  label: string;
  value: string;
  subtle: string;
}) {
  return (
    <div className="glass-dark flex animate-float-slow items-center gap-3 rounded-2xl border-white/10 px-3.5 py-2 shadow-xl">
      <span className="relative flex h-2 w-2 shrink-0">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dotColor} opacity-60`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${dotColor}`}
        />
      </span>
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/50">
          {label}
        </p>
        <p className="text-sm font-semibold leading-tight text-white">{value}</p>
        <p className="text-[10px] text-white/40">{subtle}</p>
      </div>
    </div>
  );
}
