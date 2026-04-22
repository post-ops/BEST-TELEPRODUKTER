/**
 * Typed access to environment variables with runtime checks where needed.
 * Public variables are inlined at build time, server-only ones are read on access.
 */

export const env = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://bestteleprodukter.no",
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion:
      process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01",
    readToken: process.env.SANITY_API_READ_TOKEN ?? "",
    revalidateSecret: process.env.SANITY_REVALIDATE_SECRET ?? "",
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY ?? "",
    to: process.env.CONTACT_EMAIL_TO ?? "post@bestteleprodukter.no",
    from: process.env.CONTACT_EMAIL_FROM ?? "noreply@bestteleprodukter.no",
  },
  upstash: {
    url: process.env.UPSTASH_REDIS_REST_URL ?? "",
    token: process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
  },
};

export const hasSanity = Boolean(env.sanity.projectId);
export const hasResend = Boolean(env.resend.apiKey);
export const hasRateLimit = Boolean(env.upstash.url && env.upstash.token);
