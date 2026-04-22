import { defineField, defineType } from "sanity";

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Kontaktinnsending",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Navn", type: "string" }),
    defineField({ name: "email", title: "E-post", type: "string" }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "company", title: "Virksomhet", type: "string" }),
    defineField({ name: "segment", title: "Segment", type: "string" }),
    defineField({ name: "message", title: "Melding", type: "text" }),
    defineField({
      name: "submittedAt",
      title: "Mottatt",
      type: "datetime",
    }),
    defineField({
      name: "handled",
      title: "Behandlet",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "email", description: "message" },
  },
});
