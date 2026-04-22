// GROQ queries. `$locale` is passed as parameter; we coalesce to Norwegian as fallback.
// Use `groq` template from next-sanity for editor syntax highlighting where available.
import { groq } from "next-sanity";

const localizedProjection = (field: string) =>
  `"${field}": coalesce(${field}[$locale], ${field}.no)`;

export const siteSettingsQuery = groq`
*[_type == "siteSettings"][0]{
  companyName,
  orgNr,
  ${localizedProjection("tagline")},
  addresses[],
  socialLinks[],
  trustedBy[]{
    name,
    logo
  },
  defaultSeo{
    ${localizedProjection("title")},
    ${localizedProjection("description")},
    ogImage,
    noindex
  }
}
`;

export const productsListQuery = groq`
*[_type == "product"] | order(order asc){
  _id,
  "slug": slug.current,
  productLine,
  ${localizedProjection("title")},
  ${localizedProjection("tagline")},
  heroImage,
  "segments": targetSegments[]->segment
}
`;

export const productBySlugQuery = groq`
*[_type == "product" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  productLine,
  ${localizedProjection("title")},
  ${localizedProjection("tagline")},
  ${localizedProjection("description")},
  heroImage,
  gallery[],
  features[]{
    icon,
    ${localizedProjection("title")},
    ${localizedProjection("description")}
  },
  specifications[]{ key, value },
  certifications,
  downloadables[]{
    file,
    ${localizedProjection("label")}
  },
  "targetSegments": targetSegments[]->{
    "slug": slug.current,
    ${localizedProjection("title")},
    segment
  },
  "relatedProducts": relatedProducts[]->{
    _id,
    "slug": slug.current,
    productLine,
    ${localizedProjection("title")},
    ${localizedProjection("tagline")},
    heroImage
  },
  seo{
    ${localizedProjection("title")},
    ${localizedProjection("description")},
    ogImage,
    noindex
  }
}
`;

export const solutionsListQuery = groq`
*[_type == "solution"]{
  _id,
  "slug": slug.current,
  segment,
  ${localizedProjection("title")},
  heroImage
}
`;

export const solutionBySlugQuery = groq`
*[_type == "solution" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  segment,
  ${localizedProjection("title")},
  ${localizedProjection("overview")},
  heroImage,
  keyBenefits[]{
    icon,
    ${localizedProjection("title")},
    ${localizedProjection("description")}
  },
  "recommendedProducts": recommendedProducts[]->{
    _id,
    "slug": slug.current,
    productLine,
    ${localizedProjection("title")},
    ${localizedProjection("tagline")},
    heroImage
  },
  "relatedCaseStudies": relatedCaseStudies[]->{
    _id,
    "slug": slug.current,
    client,
    location,
    ${localizedProjection("title")},
    heroImage
  },
  seo{
    ${localizedProjection("title")},
    ${localizedProjection("description")},
    ogImage,
    noindex
  }
}
`;

export const caseStudiesListQuery = groq`
*[_type == "caseStudy"] | order(publishedAt desc){
  _id,
  "slug": slug.current,
  client,
  clientLogo,
  location,
  country,
  segment,
  ${localizedProjection("title")},
  heroImage,
  publishedAt
}
`;

export const caseStudyBySlugQuery = groq`
*[_type == "caseStudy" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  client,
  clientLogo,
  location,
  country,
  segment,
  ${localizedProjection("title")},
  ${localizedProjection("challenge")},
  ${localizedProjection("solution")},
  ${localizedProjection("outcome")},
  metrics[]{
    value,
    ${localizedProjection("label")}
  },
  heroImage,
  gallery[],
  "productsUsed": productsUsed[]->{
    _id,
    "slug": slug.current,
    productLine,
    ${localizedProjection("title")}
  },
  testimonial{
    ${localizedProjection("quote")},
    author,
    ${localizedProjection("role")}
  },
  publishedAt,
  seo{
    ${localizedProjection("title")},
    ${localizedProjection("description")},
    ogImage,
    noindex
  }
}
`;

export const featuredCaseStudiesQuery = groq`
*[_type == "caseStudy"] | order(publishedAt desc)[0...3]{
  _id,
  "slug": slug.current,
  client,
  location,
  country,
  ${localizedProjection("title")},
  heroImage
}
`;

export const activeJobsQuery = groq`
*[_type == "jobOpening" && active == true] | order(applicationDeadline asc){
  _id,
  "slug": slug.current,
  ${localizedProjection("title")},
  location,
  department,
  employmentType,
  applicationDeadline
}
`;

export const jobBySlugQuery = groq`
*[_type == "jobOpening" && slug.current == $slug && active == true][0]{
  _id,
  "slug": slug.current,
  ${localizedProjection("title")},
  location,
  department,
  employmentType,
  ${localizedProjection("description")},
  "requirements": requirements[]{ "text": coalesce(@[$locale], @.no) }.text,
  "benefits": benefits[]{ "text": coalesce(@[$locale], @.no) }.text,
  applicationEmail,
  applicationDeadline
}
`;

export const teamQuery = groq`
*[_type == "teamMember"] | order(order asc){
  _id,
  name,
  ${localizedProjection("role")},
  image,
  email,
  phone,
  office
}
`;

export const slugsByTypeQuery = groq`
*[_type == $type && defined(slug.current)][].slug.current
`;
