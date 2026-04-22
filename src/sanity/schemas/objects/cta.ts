import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Knappetekst",
      type: "localizedString",
    }),
    defineField({
      name: "href",
      title: "Lenke",
      type: "string",
      description: "Intern (/produkter) eller ekstern (https://…)",
    }),
    defineField({
      name: "variant",
      title: "Stil",
      type: "string",
      options: {
        list: [
          { title: "Primær", value: "primary" },
          { title: "Sekundær", value: "secondary" },
          { title: "Spøkelse", value: "ghost" },
        ],
      },
      initialValue: "primary",
    }),
  ],
});
