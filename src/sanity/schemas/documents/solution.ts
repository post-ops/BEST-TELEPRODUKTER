import { defineField, defineType } from "sanity";

export const solution = defineType({
  name: "solution",
  title: "Løsning",
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
      name: "segment",
      title: "Segment",
      type: "string",
      options: {
        list: [
          { title: "Sykehus", value: "hospital" },
          { title: "Psykiatri", value: "psychiatry" },
          { title: "Sykehjem", value: "nursing-home" },
          { title: "Bofellesskap", value: "assisted-living" },
          { title: "Helseinstitusjon", value: "health-institution" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "heroImage",
      title: "Hero-bilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "overview",
      title: "Oversikt",
      type: "localizedRichText",
    }),
    defineField({
      name: "keyBenefits",
      title: "Nøkkelfordeler",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", type: "string" },
            { name: "title", type: "localizedString" },
            { name: "description", type: "localizedText" },
          ],
          preview: { select: { title: "title.no" } },
        },
      ],
    }),
    defineField({
      name: "recommendedProducts",
      title: "Anbefalte produkter",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "relatedCaseStudies",
      title: "Relaterte case studies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),
    defineField({ name: "seo", type: "seo" }),
  ],
  preview: {
    select: { title: "title.no", subtitle: "segment", media: "heroImage" },
  },
});
