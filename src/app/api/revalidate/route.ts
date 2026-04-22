import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { env } from "@/lib/env";

type WebhookPayload = {
  _type?: string;
  slug?: { current?: string };
};

export async function POST(req: NextRequest) {
  try {
    if (!env.sanity.revalidateSecret) {
      return NextResponse.json(
        { message: "Revalidate secret not configured" },
        { status: 500 },
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      env.sanity.revalidateSecret,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 },
      );
    }

    const type = body?._type;
    if (!type) {
      return NextResponse.json(
        { message: "No _type in payload" },
        { status: 400 },
      );
    }

    // Revalidate by document type so all pages using that type are refreshed.
    revalidateTag(type);
    // Also nudge shared collections
    revalidateTag("siteSettings");

    return NextResponse.json({ revalidated: true, type });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 },
    );
  }
}
