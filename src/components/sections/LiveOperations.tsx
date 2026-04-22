"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sub: string;
  accent: string;
};

/**
 * Only verified facts:
 *  - Founded 1979 → 45+ years of operation
 *  - Market leader in Scandinavia = 4 Nordic countries of operation
 *  - Part of Best Group (HQ Göteborg)
 *  - References at DNU Aarhus, NKS Stockholm, SUS Malmö, Skaraborg Sjukhus
 *
 * Specific performance metrics (response times, uptime %, monthly alarm
 * volumes) require documentation from the customer before going live.
 */
const STATS: Stat[] = [
  {
    value: 45,
    suffix: "+",
    label: "År i bransjen",
    sub: "siden grunnleggelse i 1979",
    accent: "from-cyan-400 to-cyan-600",
  },
  {
    value: 4,
    label: "Nordiske land",
    sub: "Norge · Sverige · Danmark · internasjonalt",
    accent: "from-indigo-400 to-indigo-600",
  },
  {
    value: 3,
    label: "Kontorer i Norge",
    sub: "Larvik · Høvik · Trondheim",
    accent: "from-emerald-400 to-emerald-600",
  },
  {
    value: 1,
    prefix: "#",
    label: "Markedsposisjon",
    sub: "nurse call i Skandinavia",
    accent: "from-rose-400 to-rose-600",
  },
];

function Counter({
  target,
  prefix,
  suffix,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null!);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [text, setText] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.19, 1, 0.22, 1],
      onUpdate: (v) => setText(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix && <span className="text-cyan-300">{prefix}</span>}
      {text}
      {suffix && <span className="text-cyan-300">{suffix}</span>}
    </span>
  );
}

export function LiveOperations() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-28 text-white">
      <div className="absolute inset-0 grid-bg opacity-[0.06]" aria-hidden />
      <div
        className="absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 left-0 h-[500px] w-[500px] rounded-full bg-indigo-500/15 blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <SectionHeading
          eyebrow="BEST i tall"
          title="Erfaring bygget gjennom fire tiår."
          subtitle="Fra Larvik til Nordens ledende helseinstitusjoner — BEST har vært partneren pleiepersonell stoler på siden 1979."
          tone="dark"
        />

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/5 bg-white/5 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="group relative bg-navy-900 p-8 md:p-10"
            >
              <div
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${s.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                aria-hidden
              />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                {s.label}
              </p>
              <div className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">
                <Counter target={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm text-white/50">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
