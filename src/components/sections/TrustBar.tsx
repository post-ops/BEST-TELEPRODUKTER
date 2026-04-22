import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

// Only verified references from Best Teleprodukter / Best Group public
// material. Additional customer logos should be added as they are confirmed.
const LOGOS = [
  "DNU Aarhus",
  "Nya Karolinska Solna",
  "SUS Malmö",
  "Skaraborg Sjukhus",
];

export function TrustBar() {
  const t = useTranslations("trustBar");

  return (
    <section className="relative border-y border-white/5 bg-navy-950 py-14 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,180,216,0.15),transparent)]" aria-hidden />
      <Container className="relative">
        <p className="mb-8 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-300/70">
          {t("title")}
        </p>
      </Container>
      <div className="mask-fade-x relative overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-marquee">
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-3 text-xl font-semibold text-white/40 transition-colors hover:text-white md:text-2xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/50" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
