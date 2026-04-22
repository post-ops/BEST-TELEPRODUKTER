import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { slugsByTypeQuery } from "@/sanity/lib/queries";
import { routing } from "@/i18n/routing";

const STATIC_PATHS = [
  "/",
  "/om",
  "/produkter",
  "/referanser",
  "/support",
  "/karriere",
  "/kontakt",
  "/losninger/sykehus",
  "/losninger/helseinstitusjon",
  "/losninger/sykehjem",
] as const;

function withLocale(base: string, path: string, locale: string) {
  if (locale === routing.defaultLocale) return `${base}${path}`;
  // Translated paths — for en mapping
  const map: Record<string, string> = {
    "/om": "/about",
    "/produkter": "/products",
    "/referanser": "/references",
    "/karriere": "/careers",
    "/kontakt": "/contact",
    "/losninger/sykehus": "/solutions/sykehus",
    "/losninger/helseinstitusjon": "/solutions/helseinstitusjon",
    "/losninger/sykehjem": "/solutions/sykehjem",
  };
  const translated = map[path] ?? path;
  return `${base}/${locale}${translated}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    for (const locale of routing.locales) {
      entries.push({
        url: withLocale(base, path, locale),
        lastModified: now,
        changeFrequency: "monthly",
        priority: path === "/" ? 1 : 0.7,
      });
    }
  }

  for (const type of ["product", "solution", "caseStudy", "jobOpening"]) {
    const slugs =
      (await sanityFetch<string[]>({
        query: slugsByTypeQuery,
        params: { type },
        tags: [type],
      })) ?? [];
    for (const slug of slugs) {
      const sub =
        type === "product"
          ? "produkter"
          : type === "solution"
            ? "losninger"
            : type === "caseStudy"
              ? "referanser"
              : "karriere";
      for (const locale of routing.locales) {
        entries.push({
          url: withLocale(base, `/${sub}/${slug}`, locale),
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
