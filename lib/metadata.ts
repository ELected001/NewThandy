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
        url: absoluteUrl("/images/brand/logo-black-green.png"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Hamilton property care`,
    description: siteConfig.description,
    images: [absoluteUrl("/images/brand/logo-black-green.png")],
  },
  applicationName: siteConfig.shortName,
  category: "home services",
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/images/brand/logo-black-green.png",
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
