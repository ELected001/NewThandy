import { expect, test } from "@playwright/test";

test("homepage presents the guide-led conversion path", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /Reliable lawn care and property maintenance in Hamilton\./i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /^Get a free quote$/i })).toHaveAttribute(
    "href",
    "/#quote-form",
  );
  await expect(page.locator("#home").getByRole("link", { name: /Call Thandy/i })).toHaveAttribute(
    "href",
    "tel:+12899945553",
  );
});

test("primary navigation scrolls the single-page sections", async ({ page }) => {
  await page.goto("/");

  const primaryNav = page.getByLabel("Primary");

  await primaryNav.getByRole("link", { name: /^Services$/i }).click();
  await expect(page).toHaveURL(/\/#services$/);
  await expect(page.locator("#services")).toBeVisible();

  await primaryNav.getByRole("link", { name: /^Profile$/i }).click();
  await expect(page).toHaveURL(/\/#profile$/);
  await expect(page.locator("#profile")).toBeVisible();

  await primaryNav.getByRole("link", { name: /^Pricing$/i }).click();
  await expect(page).toHaveURL(/\/#pricing$/);
  await expect(page.locator("#pricing")).toBeVisible();

  await primaryNav.getByRole("link", { name: /^Contact$/i }).click();
  await expect(page).toHaveURL(/\/#quote-form$/);
  await expect(page.locator("#quote-form")).toBeVisible();
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
