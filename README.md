# Best Teleprodukter AS — nettside

Ny nettside for **Best Teleprodukter AS** (org. 974 428 393), del av Best Group.
Skandinavisk markedsleder på pasientvarsling / nurse call siden 1979.

## Stack

- **Next.js 15** (App Router, React 19)
- **React Three Fiber** (v9) + **drei** (v10) — 3D-hero
- **Tailwind CSS v4** — styling
- **next-intl** — NO + EN (default NO uten prefix)
- **Sanity** — headless CMS + Studio embedded på `/studio`
- **Resend** — transaksjonelle e-poster fra kontaktskjemaet
- **Upstash Redis** — rate-limiting av kontaktskjemaet
- **TypeScript** strict — type-checker `npm run typecheck`

## Kom i gang

```bash
npm install
cp .env.example .env.local   # fyll inn verdier
npm run dev                  # http://localhost:3000
```

### Miljøvariabler

Se `.env.example`. Minimum for dev:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — opprettes gratis på sanity.io
- `SANITY_API_READ_TOKEN` — nødvendig for preview og skjema-lagring
- `SANITY_REVALIDATE_SECRET` — delt hemmelighet for webhook
- `RESEND_API_KEY` — for utgående e-post fra kontaktskjema (valgfritt i dev)
- `UPSTASH_REDIS_REST_URL`/`_TOKEN` — rate limiting (valgfritt)

### Opprette Sanity-prosjekt

```bash
npx sanity@latest init --env
```

Pek på eksisterende `sanity.config.ts`. Etter init, gå til `/studio` i nettleseren for å redigere innhold.

## Katalogstruktur

```
src/
  actions/            # Next.js Server Actions (kontaktskjema)
  app/
    [locale]/         # alle sider med NO/EN
    api/              # revalidate + draft-mode
    studio/           # embedded Sanity Studio
    sitemap.ts, robots.ts, opengraph-image.tsx, globals.css
  components/
    3d/               # HospitalRoomScene, HeroFallback
    forms/            # ContactForm
    navigation/       # Header, Footer, LocaleSwitcher
    sanity/           # SanityImage, PortableText
    sections/         # Hero, TrustBar, ProductLines, SolutionsTeaser, FeaturedCaseStudies, ContactCTA
    ui/               # Button, LinkButton, Container, SectionHeading, Card, Icon
    widgets/          # ProductRecommender
  i18n/               # routing, request, messages/{no,en}.json
  lib/                # utils, env, rateLimit, validations
  sanity/             # schemas, lib, structure
middleware.ts         # next-intl locale routing
sanity.config.ts
next.config.ts
```

## 3D-scenen (forsiden)

`src/components/3d/HospitalRoomScene.tsx` er prosedural R3F — ingen eksterne GLB-filer.
Sceneelementer: pasientseng, sengebord, pasientvarslingsenhet, veggmonitor,
sykepleiers floating smartphone, animerte signalpartikler langs bezier-kurve.

Alarm-loopen trigger automatisk hvert 6-7 sek. Brukere på mobil eller med
`prefers-reduced-motion` ser `HeroFallback.tsx` (ren CSS).

## Lokalisering

- Ruter speilet via `pathnames` i `src/i18n/routing.ts` (f.eks. `/produkter` ↔ `/products`).
- Sanity-feltnivå via `localizedString {no, en}` — GROQ coalesce-projeksjon i queries.

## Deployment (Vercel)

```bash
vercel
```

Legg miljøvariablene i Vercel Project Settings. Produksjonsbygg med
`npm run build`. Sanity webhook → `/api/revalidate` for ISR.

## Skripts

- `npm run dev` — utviklingsserver
- `npm run build` — produksjonsbygg
- `npm run start` — server produksjonsbygg
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — ESLint

## Lisens

Proprietær — tilhører Best Teleprodukter AS.
