import { expect, test } from "@playwright/test";

test("homepage presents the guide-led conversion path", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /Reliable lawn care and property maintenance/i,
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /^Get a free quote$/i })).toHaveAttribute(
    "href",
    "/#quote-form",
  );
  await expect(page.locator("#home").getByRole("link", { name: /Call Thandy/i })).toHaveAttribute(
    "href",
    "tel:+12899945553",
  );
  await expect(page.getByRole("link", { name: /Visit Thandy on Instagram/i })).toHaveAttribute(
    "href",
    "https://www.instagram.com/thandylandscaping/",
  );
});

test("logo returns to the homepage", async ({ page }) => {
  await page.goto("/#pricing");

  await page.locator("header").getByLabel("Go to Thandy homepage").click();

  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("#home")).toBeVisible();
});

test("primary navigation scrolls the single-page sections", async ({ page }) => {
  await page.goto("/");

  const primaryNav = page.getByLabel("Primary");

  await expect(primaryNav.getByRole("link")).toHaveText([
    "Home",
    "Services",
    "Profile",
    "Pricing",
    "Contact",
    "Blog",
  ]);

  await primaryNav.getByRole("link", { name: /^Services$/i }).click();
  await expect(page).toHaveURL(/\/#services$/);
  await expect(page.locator("#services")).toBeVisible();
  await expect
    .poll(async () =>
      page.evaluate(() => {
        const header = document.querySelector("header");
        const section = document.querySelector("#services");

        if (!header || !section) {
          return false;
        }

        return section.getBoundingClientRect().top > header.getBoundingClientRect().bottom + 8;
      }),
    )
    .toBe(true);
  await expect(primaryNav.getByRole("link", { name: /^Services$/i })).toHaveAttribute(
    "aria-current",
    "location",
  );

  await primaryNav.getByRole("link", { name: /^Profile$/i }).click();
  await expect(page).toHaveURL(/\/#profile$/);
  await expect(page.locator("#profile")).toBeVisible();
  await expect(primaryNav.getByRole("link", { name: /^Profile$/i })).toHaveAttribute(
    "aria-current",
    "location",
  );

  await primaryNav.getByRole("link", { name: /^Pricing$/i }).click();
  await expect(page).toHaveURL(/\/#pricing$/);
  await expect(page.locator("#pricing")).toBeVisible();
  await expect(primaryNav.getByRole("link", { name: /^Pricing$/i })).toHaveAttribute(
    "aria-current",
    "location",
  );

  await primaryNav.getByRole("link", { name: /^Contact$/i }).click();
  await expect(page).toHaveURL(/\/#quote-form$/);
  await expect(page.locator("#quote-form")).toBeVisible();
  await expect
    .poll(async () =>
      page.evaluate(() => {
        const header = document.querySelector("header");
        const section = document.querySelector("#quote-form");

        if (!header || !section) {
          return null;
        }

        return Math.round(
          section.getBoundingClientRect().top - header.getBoundingClientRect().bottom,
        );
      }),
    )
    .toBeGreaterThan(0);
  await expect(primaryNav.getByRole("link", { name: /^Contact$/i })).toHaveAttribute(
    "aria-current",
    "location",
  );
});

test("primary navigation highlights visible homepage sections while scrolling", async ({ page }) => {
  await page.goto("/");

  const primaryNav = page.getByLabel("Primary");

  await expect
    .poll(() =>
      page.evaluate(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        const servicesStyles = getComputedStyle(document.querySelector("#services")!);
        const contactStyles = getComputedStyle(document.querySelector("#quote-form")!);

        return {
          behavior: rootStyles.scrollBehavior,
          servicesMargin: Number.parseFloat(servicesStyles.scrollMarginTop),
          contactMargin: Number.parseFloat(contactStyles.scrollMarginTop),
        };
      }),
    )
    .toEqual({ behavior: "smooth", servicesMargin: 128, contactMargin: 112 });

  await expect(primaryNav.getByRole("link", { name: /^Home$/i })).toHaveAttribute(
    "aria-current",
    "location",
  );

  await page.locator("#services").scrollIntoViewIfNeeded();
  await expect(primaryNav.getByRole("link", { name: /^Services$/i })).toHaveAttribute(
    "aria-current",
    "location",
  );

  await page.locator("#profile").scrollIntoViewIfNeeded();
  await expect(primaryNav.getByRole("link", { name: /^Profile$/i })).toHaveAttribute(
    "aria-current",
    "location",
  );

  await page.locator("#pricing").scrollIntoViewIfNeeded();
  await expect(primaryNav.getByRole("link", { name: /^Pricing$/i })).toHaveAttribute(
    "aria-current",
    "location",
  );
});

test("homepage exposes decorative scroll-depth layers without horizontal overflow", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("[data-scroll-depth-scene]").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Request this service/i }).first()).toBeVisible();

  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
    )
    .toBe(true);
});

test("reduced motion keeps the 3d layer static and the quote path usable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.locator("[data-scroll-depth-scene][data-motion-state='reduced']").first()).toBeVisible();
  await expect(page.locator(".scroll-progress-shell")).toBeHidden();
  await expect(page.getByRole("link", { name: /^Get a free quote$/i })).toBeVisible();

  await page.getByRole("link", { name: /^Get a free quote$/i }).click();

  await expect(page).toHaveURL(/\/#quote-form$/);
  await expect(page.locator("#quote-form")).toBeVisible();
});

test("blog navigation opens the SEO blog hub", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Primary").getByRole("link", { name: /^Blog$/i }).click();

  await expect(page).toHaveURL(/\/blog$/);
  await expect(page.getByLabel("Primary").getByRole("link", { name: /^Blog$/i })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.getByRole("heading", { name: /Outdoor Care Journal/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /What affects a leaf cleanup quote/i })).toBeVisible();
});

test("service intent preselects the contact quote service", async ({ page }) => {
  await page.goto("/contact?service=seasonal-cleanup");

  await expect(page).toHaveURL(/\/\?service=seasonal-cleanup#quote-form$/);
  await expect(page.locator("#serviceNeeded")).toHaveValue("seasonal-cleanup");
});

test("legacy homepage quote links keep service intent", async ({ page }) => {
  await page.goto("/?service=property-maintenance#quote-form");

  await expect(page.locator("#quote-form")).toBeVisible();
  await expect(page.locator("#serviceNeeded")).toHaveValue("property-maintenance");
});

test("legacy homepage section anchors still resolve", async ({ page }) => {
  await page.goto("/#services");
  await expect(page.locator("#services")).toBeVisible();

  await page.goto("/#pricing");
  await expect(page.locator("#pricing")).toBeVisible();

  await page.goto("/#about");
  await expect(page.locator("#about")).toBeVisible();
});

test("legacy page routes redirect to homepage sections", async ({ page }) => {
  await page.goto("/services");
  await expect(page).toHaveURL(/\/#services$/);

  await page.goto("/profile");
  await expect(page).toHaveURL(/\/#profile$/);

  await page.goto("/pricing");
  await expect(page).toHaveURL(/\/#pricing$/);

  await page.goto("/about");

  await expect(page).toHaveURL(/\/#profile$/);
  await expect(page.locator("#profile")).toBeVisible();
});
