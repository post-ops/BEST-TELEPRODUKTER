import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  solutionBySlugQuery,
  slugsByTypeQuery,
} from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/sanity/SanityImage";
import { PortableText } from "@/components/sanity/PortableText";
import { Link } from "@/i18n/routing";
import { LinkButton } from "@/components/ui/LinkButton";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icon";

type Solution = {
  _id: string;
  slug: string;
  segment: string;
  title: string;
  overview?: unknown;
  heroImage?: { asset?: { _ref?: string } };
  keyBenefits?: { icon?: string; title: string; description?: string }[];
  recommendedProducts?: Array<{
    _id: string;
    slug: string;
    productLine: string;
    title: string;
    tagline?: string;
  }>;
  relatedCaseStudies?: Array<{
    _id: string;
    slug: string;
    client: string;
    location?: string;
    title: string;
  }>;
};

// Benefit descriptions are taken from BEST's own product language on bestgroup.no:
// "smarte løsninger innen kommunikasjon, integrasjon og effektivisering",
// "brukervennlig system for tilkalling, assistanse og panikkalarm",
// "intelligent alarmsystem med unike funksjoner".
const FALLBACK_SOLUTIONS: Record<string, Solution> = {
  sykehus: {
    _id: "sykehus",
    slug: "sykehus",
    segment: "hospital",
    title: "Løsninger for sykehus og psykiatri",
    keyBenefits: [
      {
        title: "Kommunikasjon",
        description:
          "Smarte løsninger innen tilkalling og kommunikasjon tilpasset sykehusdrift.",
      },
      {
        title: "Integrasjon",
        description:
          "BEST-plattformen samler alarm, oppgaver og planlegging i ett sømløst system.",
      },
      {
        title: "Effektivisering",
        description:
          "Mindre tid på dokumentasjon og informasjonsoverføring — mer tid til pasientbehandling.",
      },
      {
        title: "Mobil alarmhåndtering",
        description:
          "Sykepleiere mottar og behandler alarmer direkte via smarttelefonen.",
      },
    ],
  },
  helseinstitusjon: {
    _id: "helseinstitusjon",
    slug: "helseinstitusjon",
    segment: "health-institution",
    title: "Løsninger for helseinstitusjoner",
    keyBenefits: [
      {
        title: "Tilkalling og assistanse",
        description:
          "Brukervennlig system for tilkalling og assistansebehov i det daglige.",
      },
      {
        title: "Panikkalarm",
        description:
          "Beskytter ansatte i krevende arbeidsmiljøer, med tydelig prioritet.",
      },
      {
        title: "Mobil alarmhåndtering",
        description:
          "Smarttelefonen blir en komplett alarmterminal for pleiepersonell.",
      },
      {
        title: "Pasientunderholdning",
        description:
          "BESTinfotainment® gir pasienter WiFi, TV, radio, film, spill, musikk og lydbøker ved sengekanten.",
      },
    ],
  },
  sykehjem: {
    _id: "sykehjem",
    slug: "sykehjem",
    segment: "nursing-home",
    title: "Løsninger for sykehjem og omsorgsboliger",
    keyBenefits: [
      {
        title: "Trådløse anropsenheter",
        description:
          "Batteridrevne anropsenheter for fleksibel plassering — ingen graving i vegger.",
      },
      {
        title: "NFC-tilstedeværelse",
        description:
          "Ansatte registrerer tilstedeværelse automatisk gjennom smarttelefonen.",
      },
      {
        title: "Nøkkelfri tilgang",
        description:
          "Leilighetstilgang integrert med alarmsystemet for økt sikkerhet.",
      },
      {
        title: "Oversikt og statistikk",
        description:
          "Programvare for drift og statistikk gir ledere full kontroll over virksomheten.",
      },
    ],
  },
};

export async function generateStaticParams() {
  const slugs =
    (await sanityFetch<string[]>({
      query: slugsByTypeQuery,
      params: { type: "solution" },
      tags: ["solution"],
    })) ?? [];
  const sanitySlugs = slugs.map((slug) => ({ slug }));
  const fallbackSlugs = Object.keys(FALLBACK_SOLUTIONS).map((slug) => ({ slug }));
  const merged = new Map<string, { slug: string }>();
  [...sanitySlugs, ...fallbackSlugs].forEach((s) => merged.set(s.slug, s));
  return Array.from(merged.values());
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const fromSanity = await sanityFetch<Solution>({
    query: solutionBySlugQuery,
    params: { locale, slug },
    tags: ["solution"],
  });
  const solution = fromSanity ?? FALLBACK_SOLUTIONS[slug];
  if (!solution) notFound();

  return (
    <>
      <section className="relative overflow-hidden gradient-hero py-20 pt-32">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <Container className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Link
              href="/produkter"
              className="inline-flex items-center gap-1 text-sm font-medium text-cyan-700 hover:text-cyan-900"
            >
              ← Alle løsninger
            </Link>
            <h1 className="mt-3 max-w-xl text-4xl font-bold text-navy-900 md:text-5xl lg:text-6xl">
              {solution.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/kontakt">
                Be om demo
                <ArrowRightIcon size={16} />
              </LinkButton>
              <LinkButton href="/referanser" variant="secondary">
                Se referanser
              </LinkButton>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-navy-900 shadow-xl">
            <SanityImage
              image={solution.heroImage}
              alt={solution.title}
              width={1200}
              height={900}
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Container>
      </section>

      {solution.overview ? (
        <section className="py-16">
          <Container className="max-w-3xl">
            <PortableText value={solution.overview} />
          </Container>
        </section>
      ) : null}

      {solution.keyBenefits && solution.keyBenefits.length > 0 && (
        <section className="bg-paper-alt py-16">
          <Container>
            <h2 className="text-3xl font-bold text-navy-900">Nøkkelfordeler</h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {solution.keyBenefits.map((b, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-700">
                    <CheckIcon />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy-900">{b.title}</h3>
                  {b.description && (
                    <p className="mt-2 text-sm text-ink-muted">{b.description}</p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {solution.recommendedProducts && solution.recommendedProducts.length > 0 && (
        <section className="py-16">
          <Container>
            <h2 className="text-3xl font-bold text-navy-900">Anbefalte produkter</h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {solution.recommendedProducts.map((p) => (
                <Link
                  key={p._id}
                  href={{ pathname: "/produkter/[slug]", params: { slug: p.slug } }}
                  className="group rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <p className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
                    {p.productLine}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-navy-900">
                    {p.title}
                  </h3>
                  {p.tagline && (
                    <p className="mt-2 text-sm text-ink-muted">{p.tagline}</p>
                  )}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
