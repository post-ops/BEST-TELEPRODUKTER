import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { LiveOperations } from "@/components/sections/LiveOperations";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { IntegrationSection } from "@/components/sections/IntegrationSection";
import { ProductLines } from "@/components/sections/ProductLines";
import { SolutionsTeaser } from "@/components/sections/SolutionsTeaser";
import { FeaturedCaseStudies } from "@/components/sections/FeaturedCaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { DownloadCTA } from "@/components/sections/DownloadCTA";
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
      <WorkflowSection />
      <ProductLines />
      <SolutionsTeaser />
      <IntegrationSection />
      <FeaturedCaseStudies />
      <Testimonials />
      <LiveOperations />
      <DownloadCTA />
      <ProductRecommender />
      <ContactCTA />
    </>
  );
}
