import { defineField, defineType } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Ansatt",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Navn",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Rolle",
      type: "localizedString",
    }),
    defineField({
      name: "image",
      title: "Bilde",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "email", title: "E-post", type: "string" }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({
      name: "office",
      title: "Kontor",
      type: "string",
      options: {
        list: ["Larvik", "Høvik", "Trondheim", "Göteborg"],
      },
    }),
    defineField({
      name: "order",
      title: "Rekkefølge",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: { select: { title: "name", subtitle: "role.no", media: "image" } },
});
