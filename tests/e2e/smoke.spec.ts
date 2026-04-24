import { expect, test } from "@playwright/test";

test("home hero surfaces core CTAs and routes to the quote section", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /Reliable property care you can count on/i,
    }),
  ).toBeVisible();
  await expect(page.locator('a[href="tel:+12899945553"]').first()).toBeVisible();

  await page.getByRole("link", { name: /Get a free quote/i }).first().click();
  await expect(page).toHaveURL(/#quote-form/);
  await expect(
    page.getByRole("heading", {
      name: /Share the details and keep the callback simple/i,
    }),
  ).toBeVisible();
});

test("contact route redirects into the homepage quote form and shows validation when submitted empty", async ({ page }) => {
  await page.goto("/contact");
  await expect(page).toHaveURL(/#quote-form/);
  await page.getByRole("button", { name: /Request quote/i }).click();

  await expect(page.getByText(/Please share your name/i)).toBeVisible();
  await expect(page.getByText(/Please enter a valid phone number/i)).toBeVisible();
  await expect(page.getByText(/Share the property address or a nearby intersection/i)).toBeVisible();
});

test("contact form hands off to the Google Form draft route", async ({ page }) => {
  await page.goto("/contact?service=lawn-care");
  await expect(page).toHaveURL(/\/\?service=lawn-care#quote-form/);

  await page.getByLabel("Name", { exact: true }).fill("Jordan Client");
  await page.getByLabel("Phone", { exact: true }).fill("289-994-5553");
  await page
    .getByLabel("Property address or nearest intersection", { exact: true })
    .fill("Hamilton mountain");
  await page.getByLabel("Service needed", { exact: true }).selectOption("lawn-care");
  await page
    .getByLabel("Message", { exact: true })
    .fill("Looking for recurring lawn care for the front and back yard.");
  await page.getByLabel(/I agree that Thandy can contact me/i).check();

  await Promise.all([
    page.waitForURL(/docs\.google\.com\/forms/i),
    page.getByRole("button", { name: /Request quote/i }).click(),
  ]);
  await expect(page).toHaveURL(/entry\.1111111111=Jordan\+Client/i);
  await expect(page).toHaveURL(/entry\.4444444444=Lawn\+care/i);
});

test.describe("mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("menu opens and the quote path stays reachable", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Open menu/i }).click();

    await expect(
      page.locator("#mobile-nav").getByRole("link", { name: "Services", exact: true }),
    ).toBeVisible();
    await page.locator("#mobile-nav").getByRole("link", { name: "Get Quote", exact: true }).click();
    await expect(page).toHaveURL(/#quote-form/);
  });
});
