import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Referanseprosjekt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "localizedString",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.no" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "client",
      title: "Kunde",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "clientLogo",
      title: "Kundelogo",
      type: "image",
    }),
    defineField({ name: "location", title: "By", type: "string" }),
    defineField({
      name: "country",
      title: "Land",
      type: "string",
      options: {
        list: [
          { title: "Norge", value: "NO" },
          { title: "Sverige", value: "SE" },
          { title: "Danmark", value: "DK" },
          { title: "Finland", value: "FI" },
          { title: "Annet", value: "OTHER" },
        ],
      },
    }),
    defineField({
      name: "segment",
      title: "Segment",
      type: "string",
      options: {
        list: [
          "hospital",
          "psychiatry",
          "nursing-home",
          "assisted-living",
          "health-institution",
        ],
      },
    }),
    defineField({
      name: "challenge",
      title: "Utfordring",
      type: "localizedRichText",
    }),
    defineField({
      name: "solution",
      title: "Løsning",
      type: "localizedRichText",
    }),
    defineField({
      name: "outcome",
      title: "Resultat",
      type: "localizedRichText",
    }),
    defineField({
      name: "metrics",
      title: "Måltall",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Tittel", type: "localizedString" },
            { name: "value", title: "Verdi", type: "string" },
          ],
          preview: {
            select: { title: "label.no", subtitle: "value" },
          },
        },
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero-bilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Galleri",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "productsUsed",
      title: "Produkter brukt",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "testimonial",
      title: "Sitat",
      type: "object",
      fields: [
        { name: "quote", title: "Sitat", type: "localizedText" },
        { name: "author", title: "Navn", type: "string" },
        { name: "role", title: "Rolle", type: "localizedString" },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Publisert",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: {
      title: "title.no",
      subtitle: "client",
      media: "heroImage",
    },
  },
  orderings: [
    {
      title: "Nyeste først",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
