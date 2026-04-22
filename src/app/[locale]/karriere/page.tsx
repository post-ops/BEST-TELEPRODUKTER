import { setRequestLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import { activeJobsQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/routing";
import { ArrowRightIcon, MapPinIcon } from "@/components/ui/Icon";

type Job = {
  _id: string;
  slug: string;
  title: string;
  location: string;
  department?: string;
  employmentType?: string;
  applicationDeadline?: string;
};

export const metadata = {
  title: "Karriere",
  description:
    "Bli med på å bygge helseteknologien som redder tid og liv. Se ledige stillinger hos Best Teleprodukter.",
};

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const jobs =
    (await sanityFetch<Job[]>({
      query: activeJobsQuery,
      params: { locale },
      tags: ["jobOpening"],
    })) ?? [];

  return (
    <>
      <section className="border-b border-navy-900/5 bg-paper-alt py-20">
        <Container>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-700">
            <span className="h-1 w-6 rounded-full bg-cyan-500" />
            Karriere
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-navy-900 md:text-5xl">
            Bygg teknologi som gir helsepersonell mer tid til pasientene.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted">
            Hos BEST jobber du med systemer som brukes i noen av Nordens mest
            komplekse sykehus — og med kolleger som bryr seg like mye om
            kvalitet som om resultat.
          </p>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Ledige stillinger"
            title={
              jobs.length > 0
                ? `${jobs.length} stilling${jobs.length === 1 ? "" : "er"} akkurat nå`
                : "Ingen åpne stillinger for øyeblikket"
            }
          />

          {jobs.length > 0 ? (
            <ul className="mt-10 divide-y divide-navy-900/5 overflow-hidden rounded-2xl border border-navy-900/5 bg-white shadow-sm">
              {jobs.map((j) => (
                <li key={j._id}>
                  <Link
                    href={{ pathname: "/karriere/[slug]", params: { slug: j.slug } }}
                    className="group flex items-center justify-between gap-4 p-6 transition-colors hover:bg-paper-alt md:p-8"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-navy-900 md:text-xl">
                        {j.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-ink-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPinIcon size={14} />
                          {j.location}
                        </span>
                        {j.department && <span>· {j.department}</span>}
                        {j.employmentType && <span>· {j.employmentType}</span>}
                      </div>
                    </div>
                    <ArrowRightIcon
                      size={24}
                      className="shrink-0 text-cyan-600 transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-navy-900/10 bg-white p-10 text-center text-ink-muted">
              <p>
                Send oss gjerne en åpen søknad på{" "}
                <a
                  className="font-semibold text-navy-900 hover:text-cyan-700"
                  href="mailto:karriere@bestteleprodukter.no"
                >
                  karriere@bestteleprodukter.no
                </a>
                .
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
