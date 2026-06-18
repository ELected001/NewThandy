import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { faqItems, seo, serviceCards, type SeoPageConfig } from "@/content/site";
import { createPageMetadata } from "@/lib/metadata";
import {
  createFaqSchema,
  createLocalBusinessSchema,
  createOrganizationSchema,
  createWebPageSchema,
  createWebsiteSchema,
} from "@/lib/schema";
import {
  createSeoAdminManifest,
  getPublishedSeoAdminPages,
  getSeoAdminPages,
} from "@/lib/seo-admin";
import {
  getSeoPageConfig,
  isReadOnlySeoStoreError,
  saveSeoPageOverride,
} from "@/lib/seo-store";
import { validateSeoAdminForm } from "@/lib/seo-validation";
import { absoluteUrl } from "@/lib/utils";

describe("SEO contract", () => {
  const seoStorePath = path.join(process.cwd(), "data", "seo-overrides.json");
  let originalSeoStore: string;

  beforeEach(async () => {
    originalSeoStore = await readFile(seoStorePath, "utf8");
    await writeFile(seoStorePath, '{\n  "pages": {}\n}\n', "utf8");
  });

  afterEach(async () => {
    await writeFile(seoStorePath, originalSeoStore, "utf8");
  });

  it("keeps editable page titles and descriptions unique", () => {
    const pages = Object.values(seo.pages);
    const titles = pages.map((page) => page.title);
    const descriptions = pages.map((page) => page.description);

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("keeps default SEO page values valid for the admin editor", () => {
    for (const [pageId, page] of Object.entries(seo.pages) as Array<
      [string, SeoPageConfig]
    >) {
      const formData = new FormData();

      formData.set("pageId", pageId);
      formData.set("title", page.title);
      formData.set("description", page.description);

      if (page.canonical) {
        formData.set("canonical", page.canonical);
      }

      if (page.openGraphTitle) {
        formData.set("openGraphTitle", page.openGraphTitle);
      }

      if (page.openGraphDescription) {
        formData.set("openGraphDescription", page.openGraphDescription);
      }

      if (page.twitterTitle) {
        formData.set("twitterTitle", page.twitterTitle);
      }

      if (page.twitterDescription) {
        formData.set("twitterDescription", page.twitterDescription);
      }

      if (page.image) {
        formData.set("imageSrc", page.image.src);
        formData.set("imageAlt", page.image.alt);
        formData.set("imageWidth", String(page.image.width));
        formData.set("imageHeight", String(page.image.height));
      }

      if (page.robots?.index !== false) {
        formData.set("robotsIndex", "on");
      }

      if (page.robots?.follow !== false) {
        formData.set("robotsFollow", "on");
      }

      const result = validateSeoAdminForm(formData);

      expect(result).toMatchObject({ success: true });
    }
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

  it("exposes a platform-agnostic SEO admin manifest with resolved fallbacks", async () => {
    const manifest = await createSeoAdminManifest();
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

  it("only includes indexable canonical pages in the sitemap", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

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

  it("applies saved SEO admin overrides to published pages and the manifest", async () => {
    await saveSeoPageOverride("blog", {
      title: "Seasonal lawn care notes for Hamilton",
      description: "Updated admin-managed blog description for local lawn care notes.",
      canonical: "/blog",
      robots: {
        index: true,
        follow: true,
      },
    });

    const page = await getSeoPageConfig("blog");
    const manifest = await createSeoAdminManifest();
    const adminPages = await getPublishedSeoAdminPages();

    expect(page.title).toBe("Seasonal lawn care notes for Hamilton");
    expect(manifest.pages.find((item) => item.id === "blog")?.title).toBe(
      "Seasonal lawn care notes for Hamilton",
    );
    expect(adminPages.find((item) => item.id === "blog")?.canonicalUrl).toBe(
      absoluteUrl("/blog"),
    );
  });

  it("validates admin edits before they can break search metadata", () => {
    const formData = new FormData();

    formData.set("pageId", "home");
    formData.set("title", "A".repeat(61));
    formData.set("description", "Valid description");
    formData.set("canonical", "bad canonical");
    formData.set("imageSrc", "/images/brand/logo-black-green.png");

    const result = validateSeoAdminForm(formData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.title).toBeTruthy();
      expect(result.fieldErrors.canonical).toBeTruthy();
      expect(result.fieldErrors.imageAlt).toBeTruthy();
    }
  });

  it("keeps utility pages locked out of the index even if the form asks otherwise", () => {
    const formData = new FormData();

    formData.set("pageId", "thankYou");
    formData.set("title", seo.pages.thankYou.title);
    formData.set("description", seo.pages.thankYou.description);
    formData.set("robotsIndex", "on");
    formData.set("robotsFollow", "on");

    const result = validateSeoAdminForm(formData);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.robotsIndex).toBe("Utility pages must remain noindex.");
    }
  });

  it("recognizes read-only store errors from serverless deployments", () => {
    expect(isReadOnlySeoStoreError(Object.assign(new Error("read-only"), { code: "EROFS" }))).toBe(
      true,
    );
    expect(isReadOnlySeoStoreError(Object.assign(new Error("denied"), { code: "EACCES" }))).toBe(
      true,
    );
    expect(isReadOnlySeoStoreError(Object.assign(new Error("missing"), { code: "ENOENT" }))).toBe(
      false,
    );
  });
});
