import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { LiveOperations } from "@/components/sections/LiveOperations";
import { ProductLines } from "@/components/sections/ProductLines";
import { SolutionsTeaser } from "@/components/sections/SolutionsTeaser";
import { FeaturedCaseStudies } from "@/components/sections/FeaturedCaseStudies";
import { ProductRecommender } from "@/components/widgets/ProductRecommender";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustBar />
      <LiveOperations />
      <ProductLines />
      <SolutionsTeaser />
      <FeaturedCaseStudies />
      <ProductRecommender />
      <ContactCTA />
    </>
  );
}
