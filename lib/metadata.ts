import type { Metadata } from "next";
import { seo, siteConfig, type SeoPageConfig, type SeoRobots } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

export type SeoPageId = keyof typeof seo.pages;

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  canonical?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  image?: SeoPageConfig["image"];
  robots?: SeoRobots;
};

function createRobotsMetadata(robots?: SeoRobots): Metadata["robots"] {
  if (!robots) {
    return undefined;
  }

  return {
    index: robots.index,
    follow: robots.follow,
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createPageMetadata(seo.pages.home),
  title: {
    default: seo.defaultTitle,
    template: seo.titleTemplate,
  },
  applicationName: siteConfig.shortName,
  category: "home services",
};

export function createPageMetadata({
  title,
  description,
  path,
  canonical,
  openGraphTitle,
  openGraphDescription,
  twitterTitle,
  twitterDescription,
  image = seo.defaultImage,
  robots,
}: PageMetadataOptions): Metadata {
  const canonicalPath = canonical ?? path;
  const socialTitle = openGraphTitle ?? title;
  const socialDescription = openGraphDescription ?? description;
  const xTitle = twitterTitle ?? socialTitle;
  const xDescription = twitterDescription ?? socialDescription;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
    },
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: absoluteUrl(canonicalPath),
      type: "website",
      locale: "en_CA",
      siteName: siteConfig.name,
      images: [
        {
          url: absoluteUrl(image.src),
          width: image.width,
          height: image.height,
          alt: image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: xTitle,
      description: xDescription,
      images: [absoluteUrl(image.src)],
    },
    robots: createRobotsMetadata(robots),
  };
}

export function createSitePageMetadata(id: SeoPageId) {
  return createPageMetadata(seo.pages[id]);
}
