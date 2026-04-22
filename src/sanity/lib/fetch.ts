import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { getSanityClient, getSanityDraftClient } from "./client";

type FetchOptions = {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
};

/**
 * Unified Sanity fetch with ISR tags and draft-mode awareness.
 * Returns null if Sanity isn't configured yet (so the site still builds in dev).
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
  revalidate = 60,
}: FetchOptions): Promise<T | null> {
  const publishedClient = getSanityClient();
  if (!publishedClient) return null;

  const { isEnabled: isDraftMode } = await draftMode();
  const client = isDraftMode
    ? (getSanityDraftClient() ?? publishedClient)
    : publishedClient;

  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: isDraftMode ? 0 : revalidate,
        tags,
      },
      perspective: isDraftMode ? "drafts" : "published",
    });
  } catch (error) {
    console.error("Sanity fetch error:", error);
    return null;
  }
}
