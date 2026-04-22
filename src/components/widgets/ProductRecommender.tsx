"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { Button } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  CheckIcon,
  HeartPulseIcon,
  HomeHeartIcon,
  HospitalIcon,
  ShieldIcon,
  SmartphoneIcon,
  StethoscopeIcon,
} from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Segment = "hospital" | "psychiatric" | "nursingHome" | "assistedLiving";
type Size = "small" | "medium" | "large";
type Priority = "integration" | "mobility" | "safety" | "entertainment";

type Recommendation = {
  products: string[];
  headline: string;
  summary: string;
};

/**
 * Rule table: (segment, priority) → product bundle. Size nudges cluster/edge
 * variants but keeps core recommendation stable. Kept plain-JS so it's easy
 * for non-devs to read and adjust.
 */
function recommend(
  segment: Segment,
  size: Size,
  priority: Priority,
): Recommendation {
  const big = size === "large";
  const base: Partial<Record<Segment, string[]>> = {
    hospital: ["BEST IQ", "BESTmate", "BESTcritical response"],
    psychiatric: ["BEST IQ", "BESTproactive", "BESTmate"],
    nursingHome: ["BESTsenior", "BESTmate"],
    assistedLiving: ["BESTsenior", "BESTmate"],
  };

  const products = new Set(base[segment] ?? ["BEST IQ"]);

  if (priority === "entertainment") products.add("BESTinfotainment");
  if (priority === "safety") products.add("BESTproactive");
  if (priority === "mobility") products.add("BESTmate");
  if (priority === "integration") products.add("BEST IQ");
  if (big) products.add("BESTcritical response");

  const headlines: Record<Segment, string> = {
    hospital: "Intelligent tilkalling for sykehus",
    psychiatric: "Trygghet og kontroll i psykiatri",
    nursingHome: "Trådløs pasientvarsling for sykehjem",
    assistedLiving: "Pasientvarsling for bofellesskap",
  };

  const summaries: Record<Segment, string> = {
    hospital:
      "Skalerbar arkitektur, sømløs EPJ-integrasjon og mobil alarmhåndtering for alle avdelinger.",
    psychiatric:
      "Overfallsalarm med presis posisjonering og lukket alarmflyt mellom ansatte.",
    nursingHome:
      "Trådløse knapper, NFC-tilstedeværelse og nøkkelfri romtilgang for moderne sykehjem.",
    assistedLiving:
      "Lett å installere, trygt for beboere, enkelt å skalere etter hvert som behovet vokser.",
  };

  return {
    products: Array.from(products),
    headline: headlines[segment],
    summary: summaries[segment],
  };
}

const SEGMENT_OPTIONS: { key: Segment; icon: React.ComponentType<{ size?: number }> }[] = [
  { key: "hospital", icon: HospitalIcon },
  { key: "psychiatric", icon: StethoscopeIcon },
  { key: "nursingHome", icon: HomeHeartIcon },
  { key: "assistedLiving", icon: HeartPulseIcon },
];

const SIZE_OPTIONS: Size[] = ["small", "medium", "large"];

const PRIORITY_OPTIONS: { key: Priority; icon: React.ComponentType<{ size?: number }> }[] = [
  { key: "integration", icon: HospitalIcon },
  { key: "mobility", icon: SmartphoneIcon },
  { key: "safety", icon: ShieldIcon },
  { key: "entertainment", icon: HeartPulseIcon },
];

export function ProductRecommender() {
  const t = useTranslations("recommender");
  const [step, setStep] = useState(0);
  const [segment, setSegment] = useState<Segment | null>(null);
  const [size, setSize] = useState<Size | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);

  const result =
    segment && size && priority ? recommend(segment, size, priority) : null;

  const reset = () => {
    setStep(0);
    setSegment(null);
    setSize(null);
    setPriority(null);
  };

  return (
    <section className="relative overflow-hidden bg-paper-alt py-24">
      <Container>
        <SectionHeading
          eyebrow="Konfigurator"
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        <div className="mt-14 overflow-hidden rounded-3xl border border-navy-900/5 bg-white shadow-xl shadow-navy-900/5">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr]">
            {/* Step indicator */}
            <div className="border-b border-navy-900/5 bg-navy-900 p-8 text-white md:border-b-0 md:border-r">
              <ol className="flex flex-row gap-6 md:flex-col md:gap-4">
                {[t("step1"), t("step2"), t("step3")].map((label, i) => (
                  <li
                    key={label}
                    className={cn(
                      "flex items-start gap-3 transition-opacity",
                      i <= step ? "opacity-100" : "opacity-50",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                        i < step
                          ? "bg-cyan-400 text-navy-900"
                          : i === step
                            ? "bg-white text-navy-900"
                            : "border border-white/20 text-white/60",
                      )}
                    >
                      {i < step ? <CheckIcon size={14} /> : i + 1}
                    </span>
                    <span className="text-sm font-medium">{label}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="s1"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="text-xl font-bold text-navy-900">
                      {t("step1")}
                    </h3>
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {SEGMENT_OPTIONS.map(({ key, icon: IconC }) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setSegment(key);
                            setStep(1);
                          }}
                          className={cn(
                            "group flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center transition-all",
                            segment === key
                              ? "border-cyan-500 bg-cyan-50"
                              : "border-navy-900/5 bg-white hover:border-cyan-500/40 hover:bg-paper-alt",
                          )}
                        >
                          <IconC size={28} />
                          <span className="text-sm font-semibold">
                            {t(key)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="s2"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="text-xl font-bold text-navy-900">
                      {t("step2")}
                    </h3>
                    <div className="mt-6 grid grid-cols-3 gap-3">
                      {SIZE_OPTIONS.map((key) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setSize(key);
                            setStep(2);
                          }}
                          className={cn(
                            "rounded-2xl border-2 p-6 text-center transition-all",
                            size === key
                              ? "border-cyan-500 bg-cyan-50"
                              : "border-navy-900/5 bg-white hover:border-cyan-500/40",
                          )}
                        >
                          <div className="text-2xl font-bold text-navy-900">
                            {t(key)}
                          </div>
                          <div className="mt-1 text-xs text-ink-muted">
                            sengeplasser
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && !result && (
                  <motion.div
                    key="s3"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    <h3 className="text-xl font-bold text-navy-900">
                      {t("step3")}
                    </h3>
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {PRIORITY_OPTIONS.map(({ key, icon: IconC }) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setPriority(key)}
                          className={cn(
                            "flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center transition-all",
                            priority === key
                              ? "border-cyan-500 bg-cyan-50"
                              : "border-navy-900/5 bg-white hover:border-cyan-500/40",
                          )}
                        >
                          <IconC size={28} />
                          <span className="text-sm font-semibold">
                            {t(key)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {result && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45 }}
                  >
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-700">
                      <span className="h-1 w-6 rounded-full bg-cyan-500" />
                      {t("yourRecommendation")}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold text-navy-900 md:text-3xl">
                      {result.headline}
                    </h3>
                    <p className="mt-3 text-ink-muted">{result.summary}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {result.products.map((p) => (
                        <li
                          key={p}
                          className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white"
                        >
                          <span className="h-2 w-2 rounded-full bg-cyan-400" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <LinkButton href="/kontakt" size="md">
                        {t("requestDemo")}
                        <ArrowRightIcon size={16} />
                      </LinkButton>
                      <Button
                        type="button"
                        variant="ghost"
                        size="md"
                        onClick={reset}
                      >
                        {t("startOver")}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
