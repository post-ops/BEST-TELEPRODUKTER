import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  caseStudyBySlugQuery,
  slugsByTypeQuery,
} from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/sanity/SanityImage";
import { PortableText } from "@/components/sanity/PortableText";
import { Link } from "@/i18n/routing";
import { LinkButton } from "@/components/ui/LinkButton";
import { ArrowRightIcon, MapPinIcon } from "@/components/ui/Icon";
import { FALLBACK_CASES } from "@/data/fallback-cases";

type CaseStudy = {
  _id: string;
  slug: string;
  client: string;
  location?: string;
  country?: string;
  segment?: string;
  title: string;
  challenge?: unknown;
  solution?: unknown;
  outcome?: unknown;
  metrics?: { label: string; value: string }[];
  heroImage?: { asset?: { _ref?: string } };
  productsUsed?: Array<{
    _id: string;
    slug: string;
    productLine: string;
    title: string;
  }>;
  testimonial?: {
    quote?: string;
    author?: string;
    role?: string;
  };
};

export async function generateStaticParams() {
  const sanitySlugs =
    (await sanityFetch<string[]>({
      query: slugsByTypeQuery,
      params: { type: "caseStudy" },
      tags: ["caseStudy"],
    })) ?? [];
  const fallbackSlugs = Object.keys(FALLBACK_CASES);
  return Array.from(new Set([...sanitySlugs, ...fallbackSlugs])).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const c = await sanityFetch<CaseStudy>({
    query: caseStudyBySlugQuery,
    params: { locale, slug },
    tags: ["caseStudy"],
  });
  const fallback = FALLBACK_CASES[slug];
  return {
    title: c?.client ?? fallback?.client ?? "Referanseprosjekt",
    description: c?.title ?? fallback?.title,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const c = await sanityFetch<CaseStudy>({
    query: caseStudyBySlugQuery,
    params: { locale, slug },
    tags: ["caseStudy"],
  });
  const fallback = FALLBACK_CASES[slug];

  if (!c && !fallback) notFound();

  const client = c?.client ?? fallback!.client;
  const location = c?.location ?? fallback!.location;
  const country = c?.country ?? fallback!.country;
  const segment = c?.segment ?? fallback!.segment;
  const title = c?.title ?? fallback!.title;
  const summary = fallback?.summary;
  const challenge = c?.challenge;
  const solution = c?.solution;
  const outcome = c?.outcome;
  const metrics = c?.metrics;
  const heroImage = c?.heroImage;
  const heroFallbackImage = fallback?.heroImage;
  const productsUsed = c?.productsUsed ?? fallback?.productsUsed;
  const testimonial = c?.testimonial;

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 py-20 pt-32 text-white">
        <div className="absolute inset-0 grid-bg opacity-10" aria-hidden />
        <Container className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Link
              href="/referanser"
              className="inline-flex items-center gap-1 text-sm font-medium text-cyan-300 hover:text-cyan-100"
            >
              ← Alle referanser
            </Link>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300">
              <MapPinIcon size={12} />
              {location}
              {country && ` · ${country}`}
            </p>
            <h1 className="mt-3 max-w-xl text-4xl font-bold md:text-5xl lg:text-6xl">
              {client}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-navy-100/80">{title}</p>
            {segment && (
              <span className="mt-6 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-200">
                {segment}
              </span>
            )}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            {heroImage ? (
              <SanityImage
                image={heroImage}
                alt={client}
                width={1200}
                height={900}
                className="h-full w-full object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : heroFallbackImage ? (
              <Image
                src={heroFallbackImage}
                alt={client}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : null}
          </div>
        </Container>
      </section>

      {metrics && metrics.length > 0 && (
        <section className="border-b border-navy-900/5 py-12">
          <Container className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {metrics.map((m, i) => (
              <div key={i}>
                <dt className="text-sm text-ink-muted">{m.label}</dt>
                <dd className="mt-1 text-3xl font-bold text-cyan-700 md:text-4xl">
                  {m.value}
                </dd>
              </div>
            ))}
          </Container>
        </section>
      )}

      {(summary || challenge || solution || outcome) && (
        <section className="py-16">
          <Container className="max-w-3xl space-y-12">
            {summary && !challenge && (
              <p className="text-lg leading-relaxed text-ink-muted">
                {summary}
              </p>
            )}
            {challenge ? (
              <div>
                <h2 className="text-2xl font-bold text-navy-900">Utfordring</h2>
                <div className="mt-4">
                  <PortableText value={challenge} />
                </div>
              </div>
            ) : null}
            {solution ? (
              <div>
                <h2 className="text-2xl font-bold text-navy-900">Løsning</h2>
                <div className="mt-4">
                  <PortableText value={solution} />
                </div>
              </div>
            ) : null}
            {outcome ? (
              <div>
                <h2 className="text-2xl font-bold text-navy-900">Resultat</h2>
                <div className="mt-4">
                  <PortableText value={outcome} />
                </div>
              </div>
            ) : null}
          </Container>
        </section>
      )}

      {testimonial?.quote && (
        <section className="bg-paper-alt py-16">
          <Container className="max-w-3xl text-center">
            <svg
              className="mx-auto text-cyan-500"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
            </svg>
            <blockquote className="mt-6 text-pretty text-2xl font-semibold text-navy-900 md:text-3xl">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-semibold text-navy-900">
              {testimonial.author}
            </p>
            {testimonial.role && (
              <p className="text-sm text-ink-muted">{testimonial.role}</p>
            )}
          </Container>
        </section>
      )}

      {productsUsed && productsUsed.length > 0 && (
        <section className="py-16">
          <Container>
            <h2 className="text-3xl font-bold text-navy-900">
              Produkter brukt i prosjektet
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {productsUsed.map((p, i) => (
                <Link
                  key={`${p.slug}-${i}`}
                  href={{
                    pathname: "/produkter/[slug]",
                    params: { slug: p.slug },
                  }}
                  className="group flex items-center justify-between rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
                      {p.productLine}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-navy-900">
                      {p.title}
                    </h3>
                  </div>
                  <ArrowRightIcon
                    size={20}
                    className="text-cyan-600 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-navy-900 to-navy-800 p-10 text-white md:p-14">
            <h2 className="text-2xl font-bold md:text-3xl">
              Vil du ha en tilsvarende løsning?
            </h2>
            <p className="mt-3 max-w-xl text-navy-100/80">
              Ta kontakt for en uforpliktende samtale om hvordan BEST kan
              støtte din institusjon.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="/kontakt">
                Kontakt oss
                <ArrowRightIcon size={16} />
              </LinkButton>
              <LinkButton
                href="/referanser"
                variant="ghost"
                className="!text-white hover:!bg-white/10"
              >
                Se flere referanser
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
