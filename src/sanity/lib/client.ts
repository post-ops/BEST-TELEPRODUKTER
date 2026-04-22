import { createClient, type SanityClient } from "next-sanity";
import { env, hasSanity } from "@/lib/env";

/**
 * Create a client lazily — when projectId isn't configured (eg. during build
 * before credentials are provisioned), we return a stub with the same surface
 * so consumers can guard with `hasSanity` and skip fetches gracefully.
 */

function makeClient(opts: {
  useCdn: boolean;
  perspective: "published" | "drafts";
  token?: string;
}): SanityClient {
  return createClient({
    projectId: env.sanity.projectId || "placeholder",
    dataset: env.sanity.dataset,
    apiVersion: env.sanity.apiVersion,
    useCdn: opts.useCdn,
    perspective: opts.perspective,
    token: opts.token,
  });
}

let _client: SanityClient | null = null;
let _draftClient: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!hasSanity) return null;
  if (!_client) _client = makeClient({ useCdn: true, perspective: "published" });
  return _client;
}

export function getSanityDraftClient(): SanityClient | null {
  if (!hasSanity) return null;
  if (!_draftClient)
    _draftClient = makeClient({
      useCdn: false,
      perspective: "drafts",
      token: env.sanity.readToken,
    });
  return _draftClient;
}

/**
 * Convenience: a "safe" client that falls back to a placeholder project id.
 * Use this only for image URL building — not for data fetches.
 */
export const sanityClient: SanityClient = makeClient({
  useCdn: true,
  perspective: "published",
});
