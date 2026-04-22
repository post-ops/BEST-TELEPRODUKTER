import { defineField, defineType } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "Lokalisert tekst",
  type: "object",
  fields: [
    defineField({
      name: "no",
      title: "Norsk",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "en",
      title: "Engelsk",
      type: "string",
    }),
  ],
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Lokalisert langtekst",
  type: "object",
  fields: [
    defineField({ name: "no", title: "Norsk", type: "text", rows: 3 }),
    defineField({ name: "en", title: "Engelsk", type: "text", rows: 3 }),
  ],
});

export const localizedRichText = defineType({
  name: "localizedRichText",
  title: "Lokalisert rik tekst",
  type: "object",
  fields: [
    defineField({
      name: "no",
      title: "Norsk",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "en",
      title: "Engelsk",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
});
