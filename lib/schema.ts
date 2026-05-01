import { faqItems, serviceAreas, serviceCards, siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type WebPageItem = {
  name: string;
  description: string;
  path: string;
};

export function createWebPageSchema({ name, description, path }: WebPageItem) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl(`${path}#webpage`),
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: "en-CA",
    isPartOf: {
      "@id": absoluteUrl("/#website"),
    },
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
  };
}

export function createProfessionalServiceSchema() {
  return createLocalBusinessSchema();
}

export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/brand/logo-black-green.png"),
      width: 3299,
      height: 1617,
    },
    telephone: siteConfig.phone.href.replace("tel:", ""),
    description: siteConfig.description,
    sameAs: siteConfig.socialLinks.map((link) => link.href),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: siteConfig.phone.href.replace("tel:", ""),
        email: siteConfig.email.label,
        areaServed: "CA-ON",
        availableLanguage: ["en"],
      },
    ],
  };
}

export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-CA",
    publisher: {
      "@id": absoluteUrl("/#organization"),
    },
  };
}

export function createLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": absoluteUrl("/#local-business"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    image: [
      absoluteUrl("/images/brand-strategy/mower-green-hero.jpg"),
      absoluteUrl("/images/brand/logo-black-green.png"),
    ],
    logo: absoluteUrl("/images/brand/logo-black-green.png"),
    telephone: siteConfig.phone.href.replace("tel:", ""),
    email: siteConfig.email.label,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    sameAs: siteConfig.socialLinks.map((link) => link.href),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    areaServed: serviceAreas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
    serviceType: serviceCards.map((service) => service.title),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Lawn care and property maintenance services",
      itemListElement: serviceCards.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          areaServed: serviceAreas.map((area) => ({
            "@type": "Place",
            name: area,
          })),
          provider: {
            "@id": absoluteUrl("/#local-business"),
          },
        },
      })),
    },
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
