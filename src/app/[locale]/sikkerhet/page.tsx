import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { Icon, type IconName } from "@/components/ui/Icon";

export const metadata = {
  title: "Sikkerhet og personvern",
  description:
    "Hvordan Best Teleprodukter ivaretar sikkerhet, personvern og tilgjengelighet for helsesektoren.",
};

// Generic principles — not claims about specific certifications. Customer-
// supplied documentation (ISO, GDPR assessments, SLA tall) should replace
// these bullets before publishing.
const PRINCIPLES: {
  icon: IconName;
  title: string;
  body: string;
}[] = [
  {
    icon: "shield",
    title: "Personvern som premiss",
    body: "Løsningene våre er bygget for å behandle sensitive helseopplysninger på måter som respekterer GDPR og norske krav. Vi henter kun inn data som faktisk trengs for tjenestens formål.",
  },
  {
    icon: "network",
    title: "Kryptering i ro og transport",
    body: "Data krypteres både når de lagres og når de overføres mellom enheter, servere og applikasjoner.",
  },
  {
    icon: "bell",
    title: "Tilgangskontroll",
    body: "Rollebasert tilgangsstyring sikrer at ansatte kun ser informasjonen de trenger for sin oppgave. Autentisering kan kobles til kundens sentrale identitetssystem.",
  },
  {
    icon: "heartPulse",
    title: "Robusthet og oppetid",
    body: "Systemene er designet for å levere kritiske alarmer 24/7. Overvåking, redundans og responsprosedyrer er innebygd i driftskonseptet.",
  },
  {
    icon: "check",
    title: "Dokumentasjon og revisjon",
    body: "Alle hendelser logges slik at kunden kan gjennomgå alarmflyter, responstider og systemhendelser i ettertid.",
  },
  {
    icon: "stethoscope",
    title: "Utviklet sammen med helsepersonell",
    body: "Sikkerhet handler også om riktig brukeropplevelse. Løsningene er designet i tett samarbeid med sykepleiere, leger og driftsteam.",
  },
];

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <section className="border-b border-navy-900/5 bg-paper-alt py-20 pt-32">
        <Container>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-700">
            <span className="h-1 w-6 rounded-full bg-cyan-500" />
            Sikkerhet og personvern
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-navy-900 md:text-5xl lg:text-6xl">
            Tillit er et grunnleggende krav i helsesektoren.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            BEST leverer løsninger til noen av Nordens mest krevende
            helseinstitusjoner. Derfor jobber vi systematisk med sikkerhet,
            personvern og drift — som grunnleggende premisser, ikke som
            ettertanke.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Prinsipper"
            title="Slik tenker vi om sikkerhet"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-navy-900/5 bg-white p-7 shadow-sm"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-700">
                  <Icon name={p.icon} size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper-alt py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-navy-900">
                Informasjonskapsler
              </h2>
              <p className="mt-4 text-ink-muted">
                Vi bruker kun tekniske informasjonskapsler som er nødvendige
                for nettsidens grunnleggende funksjonalitet. For anonym
                besøksanalyse ber vi eksplisitt om samtykke før vi aktiverer
                statistikksporing. Vi sporer ikke besøkende på tvers av
                nettsteder.
              </p>
              <p className="mt-4 text-ink-muted">
                Du kan når som helst trekke tilbake samtykke ved å slette
                lokalt lagrede innstillinger i nettleseren.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy-900">
                Spørsmål eller avvik?
              </h2>
              <p className="mt-4 text-ink-muted">
                For spørsmål om hvordan vi behandler dine personopplysninger,
                eller for å melde en sikkerhetshendelse, ta direkte kontakt
                via e-post.
              </p>
              <div className="mt-6">
                <LinkButton href="/kontakt">Kontakt oss</LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
