import { notFound } from "next/navigation";
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
import { ArrowRightIcon, MapPinIcon } from "@/components/ui/Icon";

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
  const slugs =
    (await sanityFetch<string[]>({
      query: slugsByTypeQuery,
      params: { type: "caseStudy" },
      tags: ["caseStudy"],
    })) ?? [];
  return slugs.map((slug) => ({ slug }));
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
  if (!c) notFound();

  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 py-20 text-white">
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
              {c.location}
              {c.country && ` · ${c.country}`}
            </p>
            <h1 className="mt-3 max-w-xl text-4xl font-bold md:text-5xl lg:text-6xl">
              {c.client}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-navy-100/80">{c.title}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <SanityImage
              image={c.heroImage}
              alt={c.client}
              width={1200}
              height={900}
              className="h-full w-full object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </Container>
      </section>

      {c.metrics && c.metrics.length > 0 && (
        <section className="border-b border-navy-900/5 py-12">
          <Container className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {c.metrics.map((m, i) => (
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

      <section className="py-16">
        <Container className="max-w-3xl space-y-12">
          {c.challenge ? (
            <div>
              <h2 className="text-2xl font-bold text-navy-900">Utfordring</h2>
              <div className="mt-4">
                <PortableText value={c.challenge} />
              </div>
            </div>
          ) : null}
          {c.solution ? (
            <div>
              <h2 className="text-2xl font-bold text-navy-900">Løsning</h2>
              <div className="mt-4">
                <PortableText value={c.solution} />
              </div>
            </div>
          ) : null}
          {c.outcome ? (
            <div>
              <h2 className="text-2xl font-bold text-navy-900">Resultat</h2>
              <div className="mt-4">
                <PortableText value={c.outcome} />
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      {c.testimonial?.quote && (
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
              &ldquo;{c.testimonial.quote}&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-semibold text-navy-900">
              {c.testimonial.author}
            </p>
            {c.testimonial.role && (
              <p className="text-sm text-ink-muted">{c.testimonial.role}</p>
            )}
          </Container>
        </section>
      )}

      {c.productsUsed && c.productsUsed.length > 0 && (
        <section className="py-16">
          <Container>
            <h2 className="text-3xl font-bold text-navy-900">
              Produkter brukt i prosjektet
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {c.productsUsed.map((p) => (
                <Link
                  key={p._id}
                  href={{ pathname: "/produkter/[slug]", params: { slug: p.slug } }}
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
    </>
  );
}
