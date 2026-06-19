import type { MetadataRoute } from "next";
import { seo, type SeoPageConfig } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = Object.values(seo.pages) as SeoPageConfig[];

  return pages
    .filter((page) => page.robots?.index !== false)
    .map((page) => ({
      url: absoluteUrl(page.canonical ?? page.path),
      lastModified,
      changeFrequency: "weekly",
      priority: page.path === "/" ? 1 : 0.7,
      images: [absoluteUrl((page.image ?? seo.defaultImage).src)],
    }));
}
