import { faqItems, serviceAreas, serviceCards, siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function createProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: siteConfig.url,
    image: absoluteUrl("/images/brand/logo-black-green.png"),
    telephone: siteConfig.phone.href.replace("tel:", ""),
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    areaServed: serviceAreas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    serviceType: serviceCards.map((service) => service.title),
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createFaqSchema(items = faqItems): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
