/**
 * Sanity Studio is embedded at /studio.
 * Uses force-dynamic so drafts work and we don't statically prerender the admin UI.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Studio",
  robots: "noindex",
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
