"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";
import { env, hasResend, hasSanity } from "@/lib/env";
import { getSanityClient } from "@/sanity/lib/client";
import { checkRateLimit } from "@/lib/rateLimit";

export type ContactFormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Partial<Record<keyof ContactInput, string>>;
};

export async function submitContactForm(
  _prev: ContactFormState | undefined,
  formData: FormData,
): Promise<ContactFormState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    company: String(formData.get("company") ?? ""),
    segment: String(formData.get("segment") ?? ""),
    message: String(formData.get("message") ?? ""),
    consent: formData.get("consent") === "on",
    website: String(formData.get("website") ?? ""),
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
    parsed.error.issues.forEach((issue) => {
      const key = issue.path[0] as keyof ContactInput;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    });
    return { ok: false, message: "Sjekk feltene og prøv igjen.", fieldErrors };
  }

  // Honeypot filled -> silently succeed (bot)
  if (parsed.data.website && parsed.data.website.length > 0) {
    return { ok: true };
  }

  // Rate limit by IP
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "anon";

  const { success } = await checkRateLimit(ip);
  if (!success) {
    return {
      ok: false,
      message: "For mange forespørsler. Prøv igjen om et øyeblikk.",
    };
  }

  const submittedAt = new Date().toISOString();

  // 1) Send transactional email via Resend (best-effort)
  if (hasResend) {
    try {
      const resend = new Resend(env.resend.apiKey);
      await resend.emails.send({
        from: env.resend.from,
        to: env.resend.to,
        replyTo: parsed.data.email,
        subject: `Ny henvendelse — ${parsed.data.name} (${parsed.data.segment})`,
        text: [
          `Navn: ${parsed.data.name}`,
          `E-post: ${parsed.data.email}`,
          `Telefon: ${parsed.data.phone || "—"}`,
          `Virksomhet: ${parsed.data.company || "—"}`,
          `Segment: ${parsed.data.segment}`,
          "",
          "Melding:",
          parsed.data.message,
          "",
          `Mottatt: ${submittedAt}`,
        ].join("\n"),
      });
    } catch (err) {
      console.error("Resend error:", err);
    }
  }

  // 2) Persist to Sanity for follow-up
  const sanity = getSanityClient();
  if (hasSanity && sanity && env.sanity.readToken) {
    try {
      await sanity.withConfig({ token: env.sanity.readToken }).create({
        _type: "contactSubmission",
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || undefined,
        company: parsed.data.company || undefined,
        segment: parsed.data.segment,
        message: parsed.data.message,
        submittedAt,
        handled: false,
      });
    } catch (err) {
      console.error("Sanity persist error:", err);
    }
  }

  return { ok: true };
}
