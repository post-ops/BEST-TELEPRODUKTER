import { z } from "zod";

export const SEGMENTS = [
  "hospital",
  "psychiatric",
  "nursing-home",
  "assisted-living",
  "other",
] as const;

export const contactSchema = z.object({
  name: z.string().min(2, "Minst 2 tegn").max(100),
  email: z.string().email("Ugyldig e-postadresse"),
  phone: z
    .string()
    .max(30)
    .optional()
    .or(z.literal("")),
  company: z.string().max(150).optional().or(z.literal("")),
  segment: z.enum(SEGMENTS),
  message: z.string().min(10, "Minst 10 tegn").max(2000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Du må samtykke for å sende" }),
  }),
  // Honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
