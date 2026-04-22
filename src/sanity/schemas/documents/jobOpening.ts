import { defineField, defineType } from "sanity";

export const jobOpening = defineType({
  name: "jobOpening",
  title: "Ledig stilling",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Stillingstittel",
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
      name: "location",
      title: "Lokasjon",
      type: "string",
      options: {
        list: ["Larvik", "Høvik", "Trondheim", "Göteborg", "Remote"],
      },
    }),
    defineField({
      name: "department",
      title: "Avdeling",
      type: "string",
    }),
    defineField({
      name: "employmentType",
      title: "Type stilling",
      type: "string",
      options: {
        list: [
          { title: "Fast", value: "full-time" },
          { title: "Deltid", value: "part-time" },
          { title: "Kontrakt", value: "contract" },
          { title: "Praksis", value: "internship" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Beskrivelse",
      type: "localizedRichText",
    }),
    defineField({
      name: "requirements",
      title: "Krav",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
    defineField({
      name: "benefits",
      title: "Fordeler",
      type: "array",
      of: [{ type: "localizedString" }],
    }),
    defineField({
      name: "applicationEmail",
      title: "Søknad sendes til",
      type: "string",
      initialValue: "karriere@bestteleprodukter.no",
    }),
    defineField({
      name: "applicationDeadline",
      title: "Søknadsfrist",
      type: "date",
    }),
    defineField({
      name: "active",
      title: "Aktiv",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title.no",
      subtitle: "location",
    },
  },
});
