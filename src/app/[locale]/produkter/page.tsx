import { setRequestLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import { productsListQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/routing";
import { SanityImage } from "@/components/sanity/SanityImage";
import { ArrowRightIcon } from "@/components/ui/Icon";

type ProductListItem = {
  _id: string;
  slug: string;
  productLine: string;
  title: string;
  tagline?: string;
  heroImage?: { asset?: { _ref?: string } };
};

const FALLBACK_PRODUCTS: (ProductListItem & { fallbackImage?: string })[] = [
  {
    _id: "best-iq",
    slug: "best-iq",
    productLine: "BEST IQ",
    title: "BEST IQ",
    tagline: "Intelligent tilkallings- og kommunikasjonsplattform.",
    fallbackImage: "/images/bestgroup/best_news_workflow.png",
  },
  {
    _id: "bestsenior",
    slug: "bestsenior",
    productLine: "BESTsenior",
    title: "BESTsenior",
    tagline: "Trådløs alarmløsning for sykehjem med NFC-tilstedeværelse.",
    fallbackImage: "/images/bestgroup/best_news_wireless_call_units.jpg",
  },
  {
    _id: "bestinfotainment",
    slug: "bestinfotainment",
    productLine: "BESTinfotainment",
    title: "BESTinfotainment",
    tagline: "Pasientterminaler med TV, spill, internett og apper ved sengen.",
    fallbackImage: "/images/bestgroup/best_news_medipad.png",
  },
  {
    _id: "bestproactive",
    slug: "bestproactive",
    productLine: "BESTproactive",
    title: "BESTproactive",
    tagline: "Overfallsalarm med presis posisjonering for psykiatri.",
  },
  {
    _id: "bestmate",
    slug: "bestmate",
    productLine: "BESTmate",
    title: "BESTmate",
    tagline: "Mobil alarmhåndtering via smarttelefon for pleiepersonell.",
    fallbackImage: "/images/bestgroup/best_news_workflow.png",
  },
  {
    _id: "bestcritical",
    slug: "bestcritical-response",
    productLine: "BESTcritical response",
    title: "BESTcritical response",
    tagline: "Høyprioriterte kritiske alarmer med leveringsgaranti.",
  },
  {
    _id: "bestaid",
    slug: "bestaid",
    productLine: "BESTaid",
    title: "BESTaid",
    tagline: "Tilkallings- og informasjonsdisplayer med tydelige statusvisninger.",
    fallbackImage: "/images/bestgroup/best_news_keyless_access.jpg",
  },
];

export const metadata = {
  title: "Produkter",
  description: "Se alle produktlinjer fra BEST Teleprodukter — fra BEST IQ til BESTinfotainment.",
};

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const products =
    (await sanityFetch<ProductListItem[]>({
      query: productsListQuery,
      params: { locale },
      tags: ["product"],
    })) ?? [];

  const items = products.length > 0 ? products : FALLBACK_PRODUCTS;

  return (
    <>
      <section className="border-b border-navy-900/5 bg-paper-alt py-20 pt-32">
        <Container>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-700">
            <span className="h-1 w-6 rounded-full bg-cyan-500" />
            Produkter
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-navy-900 md:text-5xl">
            Et komplett produktspekter for moderne helsekommunikasjon.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            Fra pasientens seng til sykepleiers smarttelefon — alt fungerer
            sømløst sammen og lar deg skalere med virksomheten.
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <Link
                key={p._id}
                href={{ pathname: "/produkter/[slug]", params: { slug: p.slug } }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[5/3] w-full overflow-hidden bg-gradient-to-br from-navy-50 to-cyan-50">
                  <SanityImage
                    image={p.heroImage}
                    alt={p.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    fallback={
                      "fallbackImage" in p && p.fallbackImage
                        ? (p.fallbackImage as string)
                        : undefined
                    }
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
                    {p.productLine}
                  </p>
                  <h3 className="mt-2 text-xl font-bold text-navy-900">
                    {p.title}
                  </h3>
                  {p.tagline && (
                    <p className="mt-3 text-sm text-ink-muted">{p.tagline}</p>
                  )}
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition-transform group-hover:translate-x-1">
                    Les mer
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
