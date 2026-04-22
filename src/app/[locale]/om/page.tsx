import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Om Best Teleprodukter",
  description:
    "Best Teleprodukter har siden 1979 levert tilkallings- og alarmsystemer for helsesektoren. Del av Best Group.",
};

// Verified milestones from bestgroup.no: founding year, current market
// position, and global presence (Europa, USA, Asia).
const TIMELINE = [
  {
    year: "1979",
    title: "Grunnleggelse",
    text: "BEST etableres og starter utvikling av kommunikasjonssystemer for helsesektoren.",
  },
  {
    year: "I dag",
    title: "Skandinavisk markedsleder",
    text: "Markedsledende innen tilkallingssystemer og overfallsalarmer for helsesektoren, med BEST Center i Göteborg og norske kontorer i Larvik, Høvik og Trondheim.",
  },
  {
    year: "Globalt",
    title: "Tilstede i Europa, USA og Asia",
    text: "Gjennom datterselskaper og forhandlere leverer BEST helhetlige kommunikasjonsløsninger til helseinstitusjoner verden rundt.",
  },
];

const VALUES = [
  {
    title: "Menneske først",
    text: "Løsningene utvikles i tett samarbeid med helsepersonell — designet for virkeligheten de jobber i.",
  },
  {
    title: "Driftsikkerhet",
    text: "Systemene må fungere når det betyr mest. Robusthet er en grunnleggende premiss i alt vi bygger.",
  },
  {
    title: "Åpne standarder",
    text: "Vi jobber for at løsningene skal integrere smidig med det økosystemet kundene allerede bruker.",
  },
  {
    title: "Ansvarlig teknologi",
    text: "Sikker og personvernvennlig teknologi bygget for helsesektorens strenge krav.",
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="border-b border-navy-900/5 bg-paper-alt py-20">
        <Container>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-700">
            <span className="h-1 w-6 rounded-full bg-cyan-500" />
            Om BEST
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-navy-900 md:text-5xl lg:text-6xl">
            Pasientvarsling som gir helsepersonell tid til det som teller.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            Best Teleprodukter har siden 1979 bygget intelligente alarm- og
            kommunikasjonsløsninger for helse- og omsorgssektoren. Vi leverer
            maskinvare, programvare og mobilapper som helhetsleverandør, med
            hovedkontor i Larvik og er en del av{" "}
            <a
              className="underline decoration-cyan-500 underline-offset-4"
              href="https://www.bestgroup.no"
              target="_blank"
              rel="noopener noreferrer"
            >
              Best Group
            </a>{" "}
            (BEST Center, Göteborg).
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Verdier" title="Hva vi står for" />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-navy-900/5 bg-white p-7 shadow-sm"
              >
                <h3 className="text-lg font-bold text-navy-900">{v.title}</h3>
                <p className="mt-3 text-sm text-ink-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-navy-900 py-24 text-white">
        <Container>
          <SectionHeading
            eyebrow="Historikk"
            title="Fra 1979 til i dag"
            tone="dark"
          />
          <ol className="relative mt-12 space-y-10 before:absolute before:left-6 before:top-3 before:h-[calc(100%-24px)] before:w-px before:bg-cyan-500/30 md:space-y-12">
            {TIMELINE.map((t) => (
              <li
                key={t.year}
                className="relative grid grid-cols-[48px_1fr] gap-5 pl-1 md:grid-cols-[140px_1fr]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-navy-900 md:h-14 md:w-14">
                  {t.year}
                </div>
                <div className="pt-2 md:pt-3">
                  <h3 className="text-xl font-bold">{t.title}</h3>
                  <p className="mt-2 max-w-xl text-navy-100/80">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
