import { setRequestLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import { caseStudiesListQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/routing";
import { SanityImage } from "@/components/sanity/SanityImage";
import { ArrowRightIcon, MapPinIcon } from "@/components/ui/Icon";

type CaseItem = {
  _id: string;
  slug: string;
  client: string;
  location?: string;
  country?: string;
  segment?: string;
  title: string;
  heroImage?: { asset?: { _ref?: string } };
  publishedAt?: string;
};

const FALLBACK_CASES: CaseItem[] = [
  {
    _id: "dnu",
    slug: "dnu-aarhus",
    client: "Det Nye Universitetshospital (DNU)",
    location: "Aarhus",
    country: "DK",
    segment: "hospital",
    title: "Implementering av BEST IQ ved et av Nordens største sykehusprosjekter",
  },
  {
    _id: "nks",
    slug: "nks-stockholm",
    client: "Nya Karolinska Solna",
    location: "Stockholm",
    country: "SE",
    segment: "hospital",
    title: "Komplett tilkallings- og overfallsalarmløsning",
  },
  {
    _id: "sus",
    slug: "sus-malmo",
    client: "Skånes Universitetssjukhus",
    location: "Malmö",
    country: "SE",
    segment: "hospital",
    title: "Leveranse av kommunikasjonsløsninger for moderne sykehusdrift",
  },
  {
    _id: "skaraborg",
    slug: "skaraborg-skovde",
    client: "Skaraborg Sjukhus",
    location: "Skövde",
    country: "SE",
    segment: "psychiatry",
    title: "BESTproactive på psykiatrisk avdeling — styrket sikkerhet for personale og pasienter",
  },
];

export const metadata = {
  title: "Referanseprosjekter",
  description: "Utvalg av referanseprosjekter fra Nordens ledende helseinstitusjoner — BEST Teleprodukter.",
};

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cases =
    (await sanityFetch<CaseItem[]>({
      query: caseStudiesListQuery,
      params: { locale },
      tags: ["caseStudy"],
    })) ?? [];

  const items = cases.length > 0 ? cases : FALLBACK_CASES;

  return (
    <>
      <section className="border-b border-navy-900/5 bg-paper-alt py-20">
        <Container>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-700">
            <span className="h-1 w-6 rounded-full bg-cyan-500" />
            Referanser
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-navy-900 md:text-5xl">
            Nordens ledende sykehus har valgt BEST.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            Fra spesialiserte psykiatriposter til 8 000-sengers universitetshospital
            — BEST skalerer med kompleksiteten i din institusjon.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((c) => (
              <Link
                key={c._id}
                href={{ pathname: "/referanser/[slug]", params: { slug: c.slug } }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-navy-900 text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <SanityImage
                    image={c.heroImage}
                    alt={c.client}
                    width={600}
                    height={360}
                    className="h-full w-full object-cover opacity-70 transition-transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" aria-hidden />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
                    <MapPinIcon size={12} />
                    {c.location}
                    {c.country && ` · ${c.country}`}
                  </p>
                  <h3 className="mt-2 text-lg font-bold">{c.client}</h3>
                  <p className="mt-2 text-sm text-white/80">{c.title}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-cyan-300">
                    Les case
                    <ArrowRightIcon size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
