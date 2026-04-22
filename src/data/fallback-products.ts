/**
 * Fallback product data used when the Sanity CMS is not configured.
 * Lets the detail pages render something meaningful instead of 404ing.
 *
 * This is intentionally short — the real content should come from Sanity
 * once the client populates it.
 */
export type FallbackProduct = {
  slug: string;
  productLine: string;
  title: string;
  tagline: string;
  description: string;
  heroImage?: string;
  features: { title: string; description: string }[];
};

export const FALLBACK_PRODUCTS: Record<string, FallbackProduct> = {
  "best-iq": {
    slug: "best-iq",
    productLine: "BEST IQ",
    title: "BEST IQ",
    tagline: "Intelligent tilkallings- og kommunikasjonsplattform.",
    description:
      "BEST IQ samler alarmhåndtering, oppgavehåndtering, kritiske alarmer, planlegging og statistikk i én helhetlig plattform. Systemet er designet for å gi pleiepersonell riktig informasjon til rett tid, direkte på smarttelefonen.",
    heroImage: "/images/bestgroup/best_news_workflow.png",
    features: [
      { title: "Kommunikasjon", description: "Smarte løsninger for tilkalling og kommunikasjon mellom pasienter og helsepersonell." },
      { title: "Integrasjon", description: "Sømløs integrasjon med eksisterende sykehussystemer og arbeidsflyter." },
      { title: "Effektivisering", description: "Mindre tid på dokumentasjon og informasjonsoverføring, mer tid til pasientbehandling." },
      { title: "Mobil alarmhåndtering", description: "Pleiepersonell mottar og svarer på alarmer via smarttelefonen." },
    ],
  },
  bestsenior: {
    slug: "bestsenior",
    productLine: "BESTsenior",
    title: "BESTsenior",
    tagline: "Trådløs alarmløsning for sykehjem med NFC-tilstedeværelse.",
    description:
      "BESTsenior er et intelligent alarmsystem utviklet for sykehjem og bofellesskap. Med trådløse anropsenheter, NFC-støtte og nøkkelfri leilighetstilgang, er det designet for enkel installasjon og trygg drift.",
    heroImage: "/images/bestgroup/best_news_wireless_call_units.jpg",
    features: [
      { title: "Trådløse anropsenheter", description: "Batteridrevne enheter for fleksibel plassering — ingen graving i vegger." },
      { title: "NFC-tilstedeværelse", description: "Ansatte registrerer tilstedeværelse automatisk med smarttelefonen." },
      { title: "Nøkkelfri tilgang", description: "Leilighetstilgang integrert med sikkerhetsalarmen." },
      { title: "Tale- og alarmfunksjoner", description: "Direkte toveis kommunikasjon mellom beboer og pleier." },
    ],
  },
  bestinfotainment: {
    slug: "bestinfotainment",
    productLine: "BESTinfotainment",
    title: "BESTinfotainment",
    tagline: "Pasientterminaler med TV, spill, internett og apper ved sengen.",
    description:
      "BESTinfotainment er en touchbasert pasientterminal som gir pasienten tilgang til TV, radio, film, spill, musikk, lydbøker og internett — alt tilgjengelig ved sengekanten. Designet for å heve pasientopplevelsen under sykehusopphold.",
    heroImage: "/images/bestgroup/best_news_medipad.png",
    features: [
      { title: "Underholdning ved sengen", description: "TV, radio, film, spill, musikk, lydbøker — tilgjengelig på touchskjerm." },
      { title: "WiFi og internett", description: "Pasienter holder kontakt med familie og venner under oppholdet." },
      { title: "Telefoni", description: "Innebygd telefonfunksjon for innkommende og utgående samtaler." },
      { title: "Pasientinformasjon", description: "Dedikerte apper for pasientinformasjon og kommunikasjon med personalet." },
    ],
  },
  bestproactive: {
    slug: "bestproactive",
    productLine: "BESTproactive",
    title: "BESTproactive",
    tagline: "Overfallsalarm med presis posisjonering for psykiatri.",
    description:
      "BESTproactive er en personlig overfallsalarm utviklet for krevende arbeidsmiljøer som psykiatri og akuttmottak. Med presis posisjonering og rask varsling ivaretar systemet sikkerheten til både personale og pasienter.",
    features: [
      { title: "Personlig overfallsalarm", description: "Bæres av ansatte og aktiveres ved behov for umiddelbar assistanse." },
      { title: "Presis posisjonering", description: "Systemet lokaliserer den ansatte så hjelpen kommer til rett sted." },
      { title: "Prioritert alarmflyt", description: "Overfallsalarmer går direkte til vaktteam med høyeste prioritet." },
      { title: "Bygget for psykiatri", description: "Designet for lukkede avdelinger og akuttmottak med høye sikkerhetskrav." },
    ],
  },
  bestmate: {
    slug: "bestmate",
    productLine: "BESTmate",
    title: "BESTmate",
    tagline: "Mobil alarmhåndtering via smarttelefon for pleiepersonell.",
    description:
      "BESTmate gjør smarttelefonen til en komplett alarmterminal for pleiepersonell. Alle alarmer, oppgaver og kommunikasjon samles i én app — slik at pleieren har full oversikt og kan respondere fra hvor enn hun befinner seg i bygget.",
    heroImage: "/images/bestgroup/best_news_workflow.png",
    features: [
      { title: "Alarmer i lommen", description: "Alle alarmer leveres direkte til smarttelefonen med full kontekst." },
      { title: "Oppgavehåndtering", description: "Tildel, aksepter og fullfør oppgaver uten papir og penn." },
      { title: "Integrert kommunikasjon", description: "Samtaler og meldinger mellom pleiere i samme app." },
      { title: "Leveringsbekreftelse", description: "Systemet sikrer at kritiske alarmer faktisk blir levert og akseptert." },
    ],
  },
  "bestcritical-response": {
    slug: "bestcritical-response",
    productLine: "BESTcritical response",
    title: "BESTcritical response",
    tagline: "Høyprioriterte kritiske alarmer med leveringsgaranti.",
    description:
      "BESTcritical response håndterer alarmene som ikke kan feile. Med dedikert rutingsmotor og leveringsbekreftelse sikrer systemet at kritiske hendelser blir varslet, mottatt og håndtert av tilgjengelig personale — alltid.",
    features: [
      { title: "Leveringsgaranti", description: "Systemet eskalerer automatisk hvis kritiske alarmer ikke bekreftes innen tid." },
      { title: "Prioritert ruting", description: "Alarmer prioriteres etter alvorlighet og rutes til rett vaktteam." },
      { title: "Redundans", description: "Bygget for 24/7-drift i kritiske miljøer uten rom for nedetid." },
      { title: "Full sporbarhet", description: "Hver alarm logges med tidslinje for senere gjennomgang og læring." },
    ],
  },
  bestaid: {
    slug: "bestaid",
    productLine: "BESTaid",
    title: "BESTaid",
    tagline: "Tilkallings- og informasjonsdisplayer med tydelige statusvisninger.",
    description:
      "BESTaid er et kommunikasjonssystem med fokus på tydelige informasjonsdisplayer. Designet for å gi pleiepersonell oversikt over avdelingsstatus på ett blikk.",
    heroImage: "/images/bestgroup/best_news_keyless_access.jpg",
    features: [
      { title: "Tydelige statusvisninger", description: "Informasjonsdisplayer med klare fargekoder og lesbar typografi." },
      { title: "Sentralisert oversikt", description: "Samle alarmstatus fra hele avdelingen på ett sted." },
      { title: "Fleksibel integrasjon", description: "Kan integreres med øvrige BEST-løsninger og tredjepartssystemer." },
      { title: "Brukervennlig", description: "Enkelt grensesnitt som krever minimalt med opplæring." },
    ],
  },
};
