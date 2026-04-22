import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Produkt",
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
      options: { source: "title.no", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "productLine",
      title: "Produktlinje",
      type: "string",
      options: {
        list: [
          "BEST IQ",
          "BESTsenior",
          "BESTinfotainment",
          "BESTaid",
          "BESTmate",
          "BESTproactive",
          "BESTcritical response",
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Kort beskrivelse",
      type: "localizedString",
    }),
    defineField({
      name: "description",
      title: "Full beskrivelse",
      type: "localizedRichText",
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
      name: "features",
      title: "Funksjoner",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Ikon (lucide-navn)", type: "string" },
            { name: "title", title: "Tittel", type: "localizedString" },
            {
              name: "description",
              title: "Beskrivelse",
              type: "localizedText",
            },
          ],
          preview: {
            select: { title: "title.no", subtitle: "description.no" },
          },
        },
      ],
    }),
    defineField({
      name: "specifications",
      title: "Spesifikasjoner",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "key", title: "Nøkkel", type: "string" },
            { name: "value", title: "Verdi", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "targetSegments",
      title: "Aktuelle segmenter",
      type: "array",
      of: [{ type: "reference", to: [{ type: "solution" }] }],
    }),
    defineField({
      name: "certifications",
      title: "Sertifiseringer",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "downloadables",
      title: "Nedlastinger",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Tittel", type: "localizedString" },
            { name: "file", title: "Fil", type: "file" },
          ],
        },
      ],
    }),
    defineField({
      name: "relatedProducts",
      title: "Relaterte produkter",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "order",
      title: "Rekkefølge",
      type: "number",
      initialValue: 0,
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: {
    select: { title: "title.no", subtitle: "productLine", media: "heroImage" },
  },
  orderings: [
    {
      title: "Rekkefølge",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
