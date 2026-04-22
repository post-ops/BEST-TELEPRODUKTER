import { localizedString, localizedText, localizedRichText } from "./objects/localizedString";
import { seo } from "./objects/seo";
import { cta } from "./objects/cta";

import { product } from "./documents/product";
import { solution } from "./documents/solution";
import { caseStudy } from "./documents/caseStudy";
import { jobOpening } from "./documents/jobOpening";
import { teamMember } from "./documents/teamMember";
import { contactSubmission } from "./documents/contactSubmission";

import { siteSettings } from "./singletons/siteSettings";

export const schemaTypes = [
  // Objects
  localizedString,
  localizedText,
  localizedRichText,
  seo,
  cta,
  // Documents
  product,
  solution,
  caseStudy,
  jobOpening,
  teamMember,
  contactSubmission,
  // Singletons
  siteSettings,
];
