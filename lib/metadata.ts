import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Hamilton property care`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Hamilton property care`,
    description: siteConfig.description,
    type: "website",
    locale: "en_CA",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl("/images/photography/hero-home.jpg"),
        width: 1600,
        height: 900,
        alt: siteConfig.hero.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Hamilton property care`,
    description: siteConfig.description,
    images: [absoluteUrl("/images/photography/hero-home.jpg")],
  },
  applicationName: siteConfig.shortName,
  category: "home services",
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/images/photography/hero-home.jpg",
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: absoluteUrl(path),
      type: "website",
      images: [
        {
          url: absoluteUrl(image),
          width: 1600,
          height: 900,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [absoluteUrl(image)],
    },
  };
}
