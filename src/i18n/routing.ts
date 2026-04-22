import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["no", "en"],
  defaultLocale: "no",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/om": {
      no: "/om",
      en: "/about",
    },
    "/produkter": {
      no: "/produkter",
      en: "/products",
    },
    "/produkter/[slug]": {
      no: "/produkter/[slug]",
      en: "/products/[slug]",
    },
    "/losninger/[slug]": {
      no: "/losninger/[slug]",
      en: "/solutions/[slug]",
    },
    "/referanser": {
      no: "/referanser",
      en: "/references",
    },
    "/referanser/[slug]": {
      no: "/referanser/[slug]",
      en: "/references/[slug]",
    },
    "/support": "/support",
    "/karriere": {
      no: "/karriere",
      en: "/careers",
    },
    "/karriere/[slug]": {
      no: "/karriere/[slug]",
      en: "/careers/[slug]",
    },
    "/kontakt": {
      no: "/kontakt",
      en: "/contact",
    },
    "/sikkerhet": {
      no: "/sikkerhet",
      en: "/security",
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
