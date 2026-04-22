import { notFound } from "next/navigation";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  productBySlugQuery,
  slugsByTypeQuery,
} from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { SanityImage } from "@/components/sanity/SanityImage";
import { PortableText } from "@/components/sanity/PortableText";
import { LinkButton } from "@/components/ui/LinkButton";
import { Link } from "@/i18n/routing";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icon";
import { FALLBACK_PRODUCTS } from "@/data/fallback-products";

type Product = {
  _id: string;
  slug: string;
  productLine: string;
  title: string;
  tagline?: string;
  description?: unknown;
  heroImage?: { asset?: { _ref?: string } };
  gallery?: { asset?: { _ref?: string } }[];
  features?: { icon?: string; title: string; description?: string }[];
  specifications?: { key: string; value: string }[];
  certifications?: string[];
  relatedProducts?: Array<{
    _id: string;
    slug: string;
    productLine: string;
    title: string;
    tagline?: string;
    heroImage?: { asset?: { _ref?: string } };
  }>;
};

export async function generateStaticParams() {
  const sanitySlugs =
    (await sanityFetch<string[]>({
      query: slugsByTypeQuery,
      params: { type: "product" },
      tags: ["product"],
    })) ?? [];
  const fallbackSlugs = Object.keys(FALLBACK_PRODUCTS);
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
  const product = await sanityFetch<Product>({
    query: productBySlugQuery,
    params: { locale, slug },
    tags: ["product"],
  });

  const fallback = FALLBACK_PRODUCTS[slug];

  return {
    title: product?.title ?? fallback?.title ?? "Produkt",
    description: product?.tagline ?? fallback?.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await sanityFetch<Product>({
    query: productBySlugQuery,
    params: { locale, slug },
    tags: ["product"],
  });

  const fallback = FALLBACK_PRODUCTS[slug];

  if (!product && !fallback) notFound();

  // Prefer Sanity data if available, otherwise use fallback
  const title = product?.title ?? fallback!.title;
  const productLine = product?.productLine ?? fallback!.productLine;
  const tagline = product?.tagline ?? fallback!.tagline;
  const description = product?.description;
  const heroImage = product?.heroImage;
  const heroFallbackImage = fallback?.heroImage;
  const features =
    product?.features ??
    fallback!.features.map((f) => ({
      title: f.title,
      description: f.description,
    }));
  const specifications = product?.specifications;
  const relatedProducts = product?.relatedProducts;

  return (
    <>
      <section className="border-b border-navy-900/5 bg-paper-alt py-16 pt-32">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Link
              href="/produkter"
              className="inline-flex items-center gap-1 text-sm font-medium text-cyan-700 hover:text-cyan-900"
            >
              ← Alle produkter
            </Link>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-cyan-700">
              {productLine}
            </p>
            <h1 className="mt-2 text-4xl font-bold text-navy-900 md:text-5xl lg:text-6xl">
              {title}
            </h1>
            {tagline && (
              <p className="mt-4 max-w-xl text-lg text-ink-muted">{tagline}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/kontakt">
                Be om demo <ArrowRightIcon size={16} />
              </LinkButton>
              <LinkButton href="/referanser" variant="secondary">
                Se referanser
              </LinkButton>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-navy-100 to-cyan-100 shadow-xl">
            {heroImage ? (
              <SanityImage
                image={heroImage}
                alt={title}
                width={1200}
                height={900}
                className="h-full w-full object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : heroFallbackImage ? (
              <Image
                src={heroFallbackImage}
                alt={title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-6xl font-bold text-navy-900/20">
                  {productLine}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {description ? (
        <section className="py-16">
          <Container className="max-w-3xl">
            <PortableText value={description} />
          </Container>
        </section>
      ) : fallback ? (
        <section className="py-16">
          <Container className="max-w-3xl">
            <p className="text-lg leading-relaxed text-ink-muted">
              {fallback.description}
            </p>
          </Container>
        </section>
      ) : null}

      {features && features.length > 0 && (
        <section className="bg-paper-alt py-16">
          <Container>
            <h2 className="text-3xl font-bold text-navy-900">Funksjoner</h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-navy-900/5 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-700">
                    <CheckIcon />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-navy-900">
                    {f.title}
                  </h3>
                  {f.description && (
                    <p className="mt-2 text-sm text-ink-muted">
                      {f.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {specifications && specifications.length > 0 && (
        <section className="py-16">
          <Container className="max-w-3xl">
            <h2 className="text-3xl font-bold text-navy-900">Spesifikasjoner</h2>
            <dl className="mt-8 divide-y divide-navy-900/5 rounded-2xl border border-navy-900/5 bg-white">
              {specifications.map((s) => (
                <div
                  key={s.key}
                  className="grid grid-cols-1 gap-2 px-6 py-4 text-sm md:grid-cols-[200px_1fr] md:gap-6"
                >
                  <dt className="font-semibold text-navy-900">{s.key}</dt>
                  <dd className="text-ink-muted">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      )}

      {relatedProducts && relatedProducts.length > 0 && (
        <section className="bg-paper-alt py-16">
          <Container>
            <h2 className="text-3xl font-bold text-navy-900">
              Relaterte produkter
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedProducts.map((p) => (
                <Link
                  key={p._id}
                  href={{
                    pathname: "/produkter/[slug]",
                    params: { slug: p.slug },
                  }}
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

      <section className="py-16">
        <Container>
          <div className="rounded-3xl bg-gradient-to-br from-navy-900 to-navy-800 p-10 text-white md:p-14">
            <h2 className="text-2xl font-bold md:text-3xl">
              Vil du se {title} i drift?
            </h2>
            <p className="mt-3 max-w-xl text-navy-100/80">
              Ta kontakt for demo, teknisk dokumentasjon eller pristilbud
              tilpasset din institusjon.
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
                Se referanseprosjekter
              </LinkButton>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
