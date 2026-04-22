import type { StructureBuilder } from "sanity/structure";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Innhold")
    .items([
      S.listItem()
        .title("Nettstedsinnstillinger")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Nettstedsinnstillinger"),
        ),
      S.divider(),
      S.documentTypeListItem("product").title("Produkter"),
      S.documentTypeListItem("solution").title("Løsninger"),
      S.documentTypeListItem("caseStudy").title("Referanseprosjekter"),
      S.documentTypeListItem("jobOpening").title("Ledige stillinger"),
      S.documentTypeListItem("teamMember").title("Ansatte"),
      S.divider(),
      S.documentTypeListItem("contactSubmission").title("Kontaktinnsendinger"),
    ]);
