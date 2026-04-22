/**
 * Fallback case-study data. Client-supplied metrics should replace these
 * via Sanity once populated. Only high-level facts from public record are
 * included (client name, location, segment).
 */
export type FallbackCase = {
  slug: string;
  client: string;
  location: string;
  country: "NO" | "SE" | "DK" | "FI";
  segment: string;
  title: string;
  summary: string;
  heroImage: string;
  productsUsed: { slug: string; productLine: string; title: string }[];
};

export const FALLBACK_CASES: Record<string, FallbackCase> = {
  "dnu-aarhus": {
    slug: "dnu-aarhus",
    client: "Det Nye Universitetshospital (DNU)",
    location: "Aarhus",
    country: "DK",
    segment: "Universitetssykehus",
    title: "Implementering av BEST-løsninger ved et av Nordens største sykehusprosjekter.",
    summary:
      "Det Nye Universitetshospital i Aarhus er et av Nordens største sykehusprosjekter. BEST har vært partner gjennom prosessen med å levere intelligent pasientvarsling og kommunikasjonsløsninger tilpasset sykehusets komplekse arbeidsflyter.",
    heroImage: "/images/bestgroup/dnu_referens.jpg",
    productsUsed: [
      { slug: "best-iq", productLine: "BEST IQ", title: "BEST IQ" },
      { slug: "bestmate", productLine: "BESTmate", title: "BESTmate" },
    ],
  },
  "nks-stockholm": {
    slug: "nks-stockholm",
    client: "Nya Karolinska Solna",
    location: "Stockholm",
    country: "SE",
    segment: "Akuttsykehus",
    title: "Komplett tilkallings- og overfallsalarmløsning for høyspesialisert akuttsykehus.",
    summary:
      "Nya Karolinska Solna er et høyspesialisert universitetssykehus i Stockholm. BEST har levert en helhetlig tilkallings- og overfallsalarmløsning som dekker behovene til både somatiske og psykiatriske avdelinger.",
    heroImage: "/images/bestgroup/nks_referens.jpg",
    productsUsed: [
      { slug: "best-iq", productLine: "BEST IQ", title: "BEST IQ" },
      { slug: "bestproactive", productLine: "BESTproactive", title: "BESTproactive" },
      { slug: "bestmate", productLine: "BESTmate", title: "BESTmate" },
    ],
  },
  "sus-malmo": {
    slug: "sus-malmo",
    client: "Skånes Universitetssjukhus",
    location: "Malmö",
    country: "SE",
    segment: "Universitetssykehus",
    title: "Leveranse av kommunikasjonsløsninger for moderne sykehusdrift.",
    summary:
      "Skånes Universitetssjukhus i Malmö er en sentral institusjon i den sørsvenske helseregionen. BEST har vært leverandør av kommunikasjonsløsninger som understøtter sykehusets drift og pasientbehandling.",
    heroImage: "/images/bestgroup/sus_referens.jpg",
    productsUsed: [
      { slug: "best-iq", productLine: "BEST IQ", title: "BEST IQ" },
      { slug: "bestmate", productLine: "BESTmate", title: "BESTmate" },
    ],
  },
  "skaraborg-skovde": {
    slug: "skaraborg-skovde",
    client: "Skaraborg Sjukhus",
    location: "Skövde",
    country: "SE",
    segment: "Psykiatri",
    title: "BEST-løsninger for sykehusdrift og psykiatrisk avdeling.",
    summary:
      "Skaraborg Sjukhus i Skövde bruker BEST sine løsninger på tvers av flere avdelinger, med særlig fokus på psykiatri der sikkerhet for både personale og pasienter står sentralt.",
    heroImage: "/images/bestgroup/sss_referens.jpg",
    productsUsed: [
      { slug: "bestproactive", productLine: "BESTproactive", title: "BESTproactive" },
      { slug: "best-iq", productLine: "BEST IQ", title: "BEST IQ" },
    ],
  },
  carlanderska: {
    slug: "carlanderska",
    client: "Carlanderska",
    location: "Göteborg",
    country: "SE",
    segment: "Eldreboliger",
    title: "BEST IQ® kallelsessystem med smarttelefon-alarmhåndtering i moderne eldreboliger.",
    summary:
      "Carlanderska i Göteborg har tatt i bruk BEST IQ som kallelsessystem, med smarttelefonbasert alarmhåndtering for personalet. Løsningen bidrar til å modernisere eldreomsorgen med pålitelig og rask kommunikasjon.",
    heroImage: "/images/bestgroup/best_news_carlanderska.jpg",
    productsUsed: [
      { slug: "best-iq", productLine: "BEST IQ", title: "BEST IQ" },
      { slug: "bestmate", productLine: "BESTmate", title: "BESTmate" },
    ],
  },
  nyhaga: {
    slug: "nyhaga",
    client: "Nyhaga eldreboliger",
    location: "Vänersborg",
    country: "SE",
    segment: "Eldreboliger",
    title: "Moderne alarmsystem i eldreboliger — BESTsenior® med trådløse enheter.",
    summary:
      "Nyhaga eldreboliger i Vänersborg har installert BESTsenior med trådløse anropsenheter, NFC-støtte og nøkkelfri leilighetstilgang — en moderne alarmløsning tilpasset dagens eldreomsorg.",
    heroImage: "/images/bestgroup/best_news_nyhaga.jpg",
    productsUsed: [
      { slug: "bestsenior", productLine: "BESTsenior", title: "BESTsenior" },
    ],
  },
};
