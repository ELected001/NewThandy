import { seo, seoAdmin, siteConfig, type SeoPageConfig, type SeoRobots } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

type SeoPageEntry = [keyof typeof seo.pages, SeoPageConfig];

const defaultRobots: SeoRobots = {
  index: true,
  follow: true,
};

export function resolveSeoPageConfig(id: keyof typeof seo.pages, page: SeoPageConfig) {
  const canonicalPath = page.canonical ?? page.path;
  const image = page.image ?? seo.defaultImage;
  const openGraphTitle = page.openGraphTitle ?? page.title;
  const openGraphDescription = page.openGraphDescription ?? page.description;
  const twitterTitle = page.twitterTitle ?? openGraphTitle;
  const twitterDescription = page.twitterDescription ?? openGraphDescription;
  const robots = page.robots ?? defaultRobots;

  return {
    id,
    label: seoAdmin.pageLabels[id],
    path: page.path,
    title: page.title,
    description: page.description,
    canonicalPath,
    canonicalUrl: absoluteUrl(canonicalPath),
    openGraphTitle,
    openGraphDescription,
    twitterTitle,
    twitterDescription,
    image: {
      ...image,
      url: absoluteUrl(image.src),
    },
    robots,
    indexable: robots.index,
    sitemapIncluded: robots.index,
  };
}

export function getSeoAdminPages() {
  return (Object.entries(seo.pages) as SeoPageEntry[]).map(([id, page]) =>
    resolveSeoPageConfig(id, page),
  );
}

export function createSeoAdminManifest() {
  return {
    version: seoAdmin.version,
    site: {
      name: siteConfig.name,
      shortName: siteConfig.shortName,
      canonicalBaseUrl: siteConfig.url,
      locale: "en_CA",
    },
    defaults: {
      titleTemplate: seo.titleTemplate,
      defaultTitle: seo.defaultTitle,
      defaultDescription: seo.defaultDescription,
      defaultImage: {
        ...seo.defaultImage,
        url: absoluteUrl(seo.defaultImage.src),
      },
      robots: defaultRobots,
    },
    fields: seoAdmin.fields,
    pages: getSeoAdminPages(),
    platformNotes: seoAdmin.platformNotes,
  };
}
