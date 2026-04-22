import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Nettstedsinnstillinger",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Selskapsnavn",
      type: "string",
      initialValue: "Best Teleprodukter AS",
    }),
    defineField({
      name: "orgNr",
      title: "Organisasjonsnummer",
      type: "string",
      initialValue: "974 428 393",
    }),
    defineField({
      name: "tagline",
      title: "Slagord",
      type: "localizedString",
    }),
    defineField({
      name: "addresses",
      title: "Kontorer",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Navn", type: "string" },
            { name: "street", title: "Gateadresse", type: "string" },
            { name: "postalCode", title: "Postnummer", type: "string" },
            { name: "city", title: "Sted", type: "string" },
            { name: "phone", title: "Telefon", type: "string" },
            { name: "email", title: "E-post", type: "string" },
            { name: "mapUrl", title: "Kart-URL", type: "url" },
          ],
          preview: {
            select: { title: "label", subtitle: "city" },
          },
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Sosiale medier",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              options: {
                list: ["linkedin", "facebook", "youtube", "instagram", "x"],
              },
            },
            { name: "url", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "defaultSeo",
      title: "Standard SEO",
      type: "seo",
    }),
    defineField({
      name: "trustedBy",
      title: "Kundelogoer (tillitsrad)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string" },
            { name: "logo", type: "image" },
          ],
          preview: { select: { title: "name", media: "logo" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Nettstedsinnstillinger" }),
  },
});
