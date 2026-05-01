import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { faqItems, seo, serviceCards } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import {
  createFaqSchema,
  createLocalBusinessSchema,
  createOrganizationSchema,
  createWebPageSchema,
  createWebsiteSchema,
} from "@/lib/schema";
import { createSeoAdminManifest, getSeoAdminPages } from "@/lib/seo-admin";
import { absoluteUrl } from "@/lib/utils";

describe("SEO contract", () => {
  it("keeps editable page titles and descriptions unique", () => {
    const pages = Object.values(seo.pages);
    const titles = pages.map((page) => page.title);
    const descriptions = pages.map((page) => page.description);

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("builds complete social metadata with a canonical URL", () => {
    const metadata = createPageMetadata(seo.pages.home);
    const openGraph = metadata.openGraph as {
      images?: Array<{ alt?: string; url?: string }>;
      url?: string;
    };
    const twitter = metadata.twitter as { images?: string[] };

    expect((metadata.alternates as { canonical?: string }).canonical).toBe(absoluteUrl("/"));
    expect(openGraph.url).toBe(absoluteUrl("/"));
    expect(openGraph.images?.[0]?.alt).toBe(seo.pages.home.image?.alt);
    expect(twitter.images?.[0]).toBe(absoluteUrl(seo.pages.home.image?.src));
  });

  it("exposes a platform-agnostic SEO admin manifest with resolved fallbacks", () => {
    const manifest = createSeoAdminManifest();
    const adminPages = getSeoAdminPages();
    const fieldNames = manifest.fields.map((field) => field.name);

    expect(manifest.site.canonicalBaseUrl).toBeTruthy();
    expect(fieldNames).toEqual(
      expect.arrayContaining([
        "title",
        "description",
        "canonical",
        "openGraphTitle",
        "openGraphDescription",
        "twitterTitle",
        "twitterDescription",
        "image",
        "robots",
      ]),
    );
    expect(adminPages).toHaveLength(Object.keys(seo.pages).length);

    for (const page of adminPages) {
      expect(page.label).toBeTruthy();
      expect(page.title).toBeTruthy();
      expect(page.description).toBeTruthy();
      expect(page.canonicalUrl).toMatch(/^https?:\/\//);
      expect(page.openGraphTitle).toBeTruthy();
      expect(page.openGraphDescription).toBeTruthy();
      expect(page.twitterTitle).toBeTruthy();
      expect(page.twitterDescription).toBeTruthy();
      expect(page.image.url).toMatch(/^https?:\/\//);
      expect(page.image.alt).toBeTruthy();
      expect(typeof page.robots.index).toBe("boolean");
      expect(typeof page.robots.follow).toBe("boolean");
    }
  });

  it("keeps confirmation and error pages out of the index", () => {
    const thankYouMetadata = createPageMetadata(seo.pages.thankYou);
    const notFoundMetadata = createPageMetadata(seo.pages.notFound);

    expect(thankYouMetadata.robots).toMatchObject({ index: false, follow: false });
    expect(notFoundMetadata.robots).toMatchObject({ index: false, follow: true });
  });

  it("only includes indexable canonical pages in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toContain(absoluteUrl("/"));
    expect(urls).toContain(absoluteUrl("/blog"));
    expect(urls).not.toContain(absoluteUrl("/thank-you"));
    expect(urls).not.toContain(absoluteUrl("/404"));
  });

  it("keeps robots.txt aligned with non-indexable routes", () => {
    const rules = robots().rules as { disallow?: string[] };

    expect(rules.disallow).toContain("/thank-you");
    expect(rules.disallow).toContain("/404");
  });

  it("provides local business, organization, website, and FAQ structured data", () => {
    const organization = createOrganizationSchema();
    const website = createWebsiteSchema();
    const localBusiness = createLocalBusinessSchema();
    const blogPage = createWebPageSchema({
      name: seo.pages.blog.title,
      description: seo.pages.blog.description,
      path: seo.pages.blog.path,
    });
    const faq = createFaqSchema();

    expect(organization["@type"]).toBe("Organization");
    expect(organization.sameAs).toContain("https://www.instagram.com/thandylandscaping/");
    expect(website["@type"]).toBe("WebSite");
    expect(localBusiness["@type"]).toContain("LocalBusiness");
    expect(localBusiness.sameAs).toContain("https://x.com/Thandylandscape");
    expect(blogPage["@type"]).toBe("CollectionPage");
    expect(localBusiness.hasOfferCatalog.itemListElement).toHaveLength(serviceCards.length);
    expect(faq["@type"]).toBe("FAQPage");
    expect(faq.mainEntity).toHaveLength(faqItems.length);
  });
});
