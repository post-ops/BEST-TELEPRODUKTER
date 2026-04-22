import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Meta-tittel",
      type: "localizedString",
      description: "Maks 60 tegn anbefales.",
    }),
    defineField({
      name: "description",
      title: "Meta-beskrivelse",
      type: "localizedText",
      description: "Maks 160 tegn anbefales.",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph-bilde",
      type: "image",
      options: { hotspot: true },
      description: "Anbefalt 1200×630 px.",
    }),
    defineField({
      name: "noindex",
      title: "Skjul fra søkemotorer",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
