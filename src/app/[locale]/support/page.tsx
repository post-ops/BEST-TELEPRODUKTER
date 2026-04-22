import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/LinkButton";
import { MailIcon, PhoneIcon } from "@/components/ui/Icon";

export const metadata = {
  title: "Support",
  description: "Support og service for BEST-løsninger.",
};

// Generic FAQ — specific claims about response times, EHR integrations
// and training programs should be filled in by the customer.
const FAQS = [
  {
    q: "Hvordan får jeg hjelp ved en driftsforstyrrelse?",
    a: "Kunder med serviceavtale kan kontakte vårt driftsteam direkte. Ta kontakt med oss for å avtale hvilken support som passer for din institusjon.",
  },
  {
    q: "Kan BEST-løsningene integreres med vårt journalsystem?",
    a: "Våre systemer er bygget med tanke på integrasjon mot eksisterende infrastruktur. Vi gjennomgår dine behov og avklarer integrasjonsmuligheter som del av prosjektplanleggingen.",
  },
  {
    q: "Tilbyr dere opplæring for helsepersonell?",
    a: "Ja — opplæring er en naturlig del av innføringen hos nye kunder. Vi tilpasser formen etter institusjonens behov.",
  },
  {
    q: "Hvordan ivaretar dere personvern og informasjonssikkerhet?",
    a: "Løsningene er utviklet med helsesektorens krav til personvern og sikkerhet som premiss. Ta kontakt for detaljert teknisk dokumentasjon.",
  },
];

export default async function SupportPage({
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
            Support
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-navy-900 md:text-5xl">
            Vi står ved siden av deg — både før, under og etter installasjon.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            BEST leverer løsninger til noen av Nordens mest krevende
            helseinstitusjoner. Vi tilbyr rådgivning, installasjon, opplæring
            og service gjennom hele livssyklusen.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-white to-cyan-50/40 p-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500 text-white">
              <PhoneIcon />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-navy-900">Telefon</h2>
            <p className="mt-2 text-ink-muted">
              Ta direkte kontakt med hovedkontoret.
            </p>
            <a
              href="tel:+4733135290"
              className="mt-5 inline-flex items-center gap-2 text-2xl font-bold text-cyan-700 hover:text-cyan-900"
            >
              +47 33 13 52 90
            </a>
          </div>
          <div className="rounded-2xl border border-navy-900/5 bg-white p-8 shadow-sm">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-white">
              <MailIcon />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-navy-900">E-post</h2>
            <p className="mt-2 text-ink-muted">
              Send oss en melding, så setter vi deg i kontakt med riktig team.
            </p>
            <a
              href="mailto:post@bestgroup.no"
              className="mt-5 inline-flex items-center gap-2 text-xl font-semibold text-navy-900 hover:text-cyan-700"
            >
              post@bestgroup.no
            </a>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Ofte stilte spørsmål" />
          <dl className="mt-10 divide-y divide-navy-900/5 rounded-2xl border border-navy-900/5 bg-white">
            {FAQS.map((f) => (
              <div key={f.q} className="p-6 md:p-8">
                <dt className="text-lg font-semibold text-navy-900">{f.q}</dt>
                <dd className="mt-3 text-ink-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 text-center">
            <LinkButton href="/kontakt" size="lg">
              Har du andre spørsmål? Kontakt oss
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  );
}
