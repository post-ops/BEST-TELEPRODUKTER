/**
 * Example job postings used when no Sanity jobOpening documents exist.
 * Clearly marked as examples via the `isExample` flag so the client knows
 * to replace them with real postings before going to production.
 */
export type FallbackJob = {
  slug: string;
  title: string;
  location: string;
  department: string;
  employmentType: string;
  summary: string;
  isExample: true;
};

export const FALLBACK_JOBS: FallbackJob[] = [
  {
    slug: "solutions-engineer-larvik",
    title: "Solutions Engineer",
    location: "Larvik",
    department: "Teknologi",
    employmentType: "Fast",
    summary:
      "Vi søker en Solutions Engineer som vil jobbe tett med kundene våre i sykehus- og sykehjemssektoren på tvers av installasjon, integrasjon og support.",
    isExample: true,
  },
  {
    slug: "customer-success-norge",
    title: "Customer Success Manager",
    location: "Høvik eller Trondheim",
    department: "Kunde",
    employmentType: "Fast",
    summary:
      "Som Customer Success Manager tar du ansvaret for langvarige kunderelasjoner i det norske markedet — fra onboarding til videre utvikling av løsningen.",
    isExample: true,
  },
  {
    slug: "servicetekniker-norge",
    title: "Servicetekniker",
    location: "Norge (reisende)",
    department: "Drift",
    employmentType: "Fast",
    summary:
      "Servicetekniker for installasjon og oppfølging av BEST-løsninger hos kunder i Norge. Reisevillighet og elektronikkforståelse er viktige forutsetninger.",
    isExample: true,
  },
];
