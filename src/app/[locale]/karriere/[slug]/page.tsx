import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { sanityFetch } from "@/sanity/lib/fetch";
import { jobBySlugQuery, slugsByTypeQuery } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { PortableText } from "@/components/sanity/PortableText";
import { CheckIcon, MailIcon, MapPinIcon } from "@/components/ui/Icon";
import { FALLBACK_JOBS } from "@/data/fallback-jobs";

type Job = {
  _id: string;
  slug: string;
  title: string;
  location: string;
  department?: string;
  employmentType?: string;
  description?: unknown;
  requirements?: string[];
  benefits?: string[];
  applicationEmail?: string;
  applicationDeadline?: string;
};

export async function generateStaticParams() {
  const sanitySlugs =
    (await sanityFetch<string[]>({
      query: slugsByTypeQuery,
      params: { type: "jobOpening" },
      tags: ["jobOpening"],
    })) ?? [];
  const fallbackSlugs = FALLBACK_JOBS.map((j) => j.slug);
  return Array.from(new Set([...sanitySlugs, ...fallbackSlugs])).map((slug) => ({
    slug,
  }));
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const job = await sanityFetch<Job>({
    query: jobBySlugQuery,
    params: { locale, slug },
    tags: ["jobOpening"],
  });
  const fallback = FALLBACK_JOBS.find((j) => j.slug === slug);

  if (!job && !fallback) notFound();

  const title = job?.title ?? fallback!.title;
  const location = job?.location ?? fallback!.location;
  const department = job?.department ?? fallback!.department;
  const employmentType = job?.employmentType ?? fallback!.employmentType;
  const summary = fallback?.summary;
  const applicationEmail = job?.applicationEmail ?? "post@bestgroup.no";
  const applicationDeadline = job?.applicationDeadline;

  return (
    <article className="py-20 pt-32">
      <Container className="max-w-3xl">
        <header>
          <h1 className="text-4xl font-bold text-navy-900 md:text-5xl">
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon size={14} />
              {location}
            </span>
            {department && <span>· {department}</span>}
            {employmentType && <span>· {employmentType}</span>}
            {applicationDeadline && (
              <span>
                · Frist{" "}
                {new Date(applicationDeadline).toLocaleDateString(locale)}
              </span>
            )}
          </div>
        </header>

        {job?.description ? (
          <div className="mt-10">
            <PortableText value={job.description} />
          </div>
        ) : summary ? (
          <p className="mt-10 text-lg leading-relaxed text-ink-muted">
            {summary}
          </p>
        ) : null}

        {job?.requirements && job.requirements.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-navy-900">Vi ser etter</h2>
            <ul className="mt-4 space-y-2">
              {job.requirements.map((r, i) => (
                <li key={i} className="flex gap-3 text-ink-muted">
                  <CheckIcon
                    size={20}
                    className="mt-0.5 shrink-0 text-cyan-600"
                  />
                  {r}
                </li>
              ))}
            </ul>
          </section>
        )}

        {job?.benefits && job.benefits.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold text-navy-900">Vi tilbyr</h2>
            <ul className="mt-4 space-y-2">
              {job.benefits.map((b, i) => (
                <li key={i} className="flex gap-3 text-ink-muted">
                  <CheckIcon
                    size={20}
                    className="mt-0.5 shrink-0 text-cyan-600"
                  />
                  {b}
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="mt-12 rounded-2xl bg-paper-alt p-8">
          <h2 className="text-xl font-bold text-navy-900">Send søknad</h2>
          <p className="mt-2 text-ink-muted">
            Send søknad, CV og attester til{" "}
            <a
              className="font-semibold text-navy-900 hover:text-cyan-700"
              href={`mailto:${applicationEmail}`}
            >
              {applicationEmail}
            </a>
          </p>
          <div className="mt-6">
            <LinkButton
              external
              href={
                `mailto:${applicationEmail}?subject=${encodeURIComponent(
                  `Søknad: ${title}`,
                )}` as string
              }
            >
              <MailIcon size={16} />
              Send søknad
            </LinkButton>
          </div>
        </footer>
      </Container>
    </article>
  );
}
