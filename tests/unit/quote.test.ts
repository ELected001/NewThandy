import { beforeEach, describe, expect, it } from "vitest";
import { serviceCards } from "@/content/site";
import {
  buildGoogleFormPrefillUrl,
  quoteServiceLabels,
  quoteServiceOptions,
  validateQuoteForm,
} from "@/lib/quote";

describe("quote form contract", () => {
  beforeEach(() => {
    process.env.GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/test-form/viewform";
    process.env.GOOGLE_FORM_ENTRY_NAME = "entry.1111111111";
    process.env.GOOGLE_FORM_ENTRY_PHONE = "entry.2222222222";
    process.env.GOOGLE_FORM_ENTRY_SERVICE_ADDRESS = "entry.3333333333";
    process.env.GOOGLE_FORM_ENTRY_SERVICE_NEEDED = "entry.4444444444";
    process.env.GOOGLE_FORM_ENTRY_MESSAGE = "entry.5555555555";
    process.env.GOOGLE_FORM_ENTRY_CONSENT = "entry.6666666666";
  });

  it("keeps service card slugs aligned with quote options", () => {
    for (const service of serviceCards) {
      expect(quoteServiceOptions).toContain(service.slug);
      expect(quoteServiceLabels[service.slug]).toBeTruthy();
    }
  });

  it("accepts a valid request and normalizes the phone number", () => {
    const result = validateQuoteForm({
      name: "Taylor Green",
      phone: "289-994-5553",
      serviceAddress: "Main St and King St",
      serviceNeeded: "lawn-care",
      message: "Please quote recurring mowing.",
      consent: true,
      company: "",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBe("+12899945553");
    }
  });

  it("rejects oversized PII fields before building a prefill URL", () => {
    const result = validateQuoteForm({
      name: "A".repeat(81),
      phone: "1".repeat(33),
      serviceAddress: "B".repeat(181),
      serviceNeeded: "lawn-care",
      message: "",
      consent: true,
      company: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.name).toBeTruthy();
      expect(result.fieldErrors.phone).toBeTruthy();
      expect(result.fieldErrors.serviceAddress).toBeTruthy();
    }
  });

  it("builds a Google Forms prefill URL with service labels", () => {
    const url = buildGoogleFormPrefillUrl({
      name: "Taylor Green",
      phone: "+12899945553",
      serviceAddress: "Main St and King St",
      serviceNeeded: "seasonal-cleanup",
      message: "Leaves need clearing.",
      consent: true,
      company: "",
    });

    expect(url).toContain("usp=pp_url");
    const params = new URL(url).searchParams;
    expect([...params.values()]).toContain("Leaf cleaning");
  });

  it("uses the public service title in prefill URLs", () => {
    const url = buildGoogleFormPrefillUrl({
      name: "Taylor Green",
      phone: "+12899945553",
      serviceAddress: "Main St and King St",
      serviceNeeded: "lawn-care",
      message: "Please quote recurring mowing.",
      consent: true,
      company: "",
    });

    expect([...new URL(url).searchParams.values()]).toContain("Lawn mowing");
  });
});
