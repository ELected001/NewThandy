import type { MetadataRoute } from "next";
import { seo } from "@/content/site";
import { getSeoPageConfigs } from "@/lib/seo-store";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const pages = Object.values(await getSeoPageConfigs());

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
