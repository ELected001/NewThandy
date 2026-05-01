import { JsonLd } from "@/components/site/json-ld";
import {
  FinalCtaSection,
  HomeAudienceFit,
  HomeBookingFlow,
  HomeFaqSection,
  HomeHero,
  HomeQuoteSection,
  HomeServiceShowcase,
  MotionMarquee,
} from "@/components/site/marketing-sections";
import { seo } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createLocalBusinessSchema,
  createOrganizationSchema,
  createWebsiteSchema,
} from "@/lib/schema";

export const metadata = createPageMetadata(seo.pages.home);

type HomePageProps = {
  searchParams?: Promise<{
    service?: string | string[];
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const requestedService = Array.isArray(params?.service)
    ? params?.service[0]
    : params?.service;
  const schema = [
    createOrganizationSchema(),
    createWebsiteSchema(),
    createLocalBusinessSchema(),
    createFaqSchema(),
    createBreadcrumbSchema([{ name: "Home", path: "/" }]),
  ];

  return (
    <>
      <JsonLd data={schema} />
      <HomeHero />
      <MotionMarquee />
      <HomeServiceShowcase />
      <HomeAudienceFit />
      <HomeBookingFlow />
      <HomeQuoteSection service={requestedService} />
      <HomeFaqSection />
      <FinalCtaSection
        description="Send the property location, service need, and timing notes so the next conversation starts with useful context."
        title="Reliable Property Care, Season After Season."
      />
    </>
  );
}
