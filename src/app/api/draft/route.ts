import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { env } from "@/lib/env";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") ?? "/";

  if (secret !== env.sanity.revalidateSecret) {
    return new Response("Invalid token", { status: 401 });
  }

  const mode = await draftMode();
  mode.enable();

  redirect(slug);
}
