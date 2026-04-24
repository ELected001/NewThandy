import { describe, expect, it } from "vitest";
import {
  buildGoogleFormPrefillUrl,
  normalizePhone,
  validateQuoteForm,
} from "@/lib/quote";

describe("normalizePhone", () => {
  it("normalizes local 10-digit numbers to E.164", () => {
    expect(normalizePhone("289-994-5553")).toBe("+12899945553");
  });

  it("keeps valid international numbers", () => {
    expect(normalizePhone("+1 (289) 994-5553")).toBe("+12899945553");
  });

  it("rejects invalid numbers", () => {
    expect(normalizePhone("5553")).toBeNull();
  });
});

describe("validateQuoteForm", () => {
  it("returns field errors for missing or invalid values", () => {
    const result = validateQuoteForm({
      name: "A",
      phone: "123",
      serviceAddress: "",
      serviceNeeded: "",
      message: "",
      consent: false,
      company: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.fieldErrors.name).toBeTruthy();
      expect(result.fieldErrors.phone).toBeTruthy();
      expect(result.fieldErrors.serviceAddress).toBeTruthy();
      expect(result.fieldErrors.serviceNeeded).toBeTruthy();
      expect(result.fieldErrors.consent).toBeTruthy();
    }
  });

  it("accepts a valid payload and normalizes the phone", () => {
    const result = validateQuoteForm({
      name: "Jordan Client",
      phone: "289-994-5553",
      serviceAddress: "Hamilton mountain",
      serviceNeeded: "lawn-care",
      message: "Weekly care for the front and back yard.",
      consent: true,
      company: "",
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.phone).toBe("+12899945553");
    }
  });
});

describe("buildGoogleFormPrefillUrl", () => {
  it("builds a Google Form URL with prefilled placeholder entries", () => {
    const url = new URL(
      buildGoogleFormPrefillUrl({
        name: "Jordan Client",
        phone: "+12899945553",
        serviceAddress: "Hamilton mountain",
        serviceNeeded: "lawn-care",
        message: "Weekly care for the front and back yard.",
        consent: true,
        company: "",
      }),
    );

    expect(url.origin).toBe("https://docs.google.com");
    expect(url.pathname).toContain("/forms/");
    expect(url.searchParams.get("usp")).toBe("pp_url");
    expect(url.searchParams.get("entry.1111111111")).toBe("Jordan Client");
    expect(url.searchParams.get("entry.2222222222")).toBe("+12899945553");
    expect(url.searchParams.get("entry.3333333333")).toBe("Hamilton mountain");
    expect(url.searchParams.get("entry.4444444444")).toBe("Lawn care");
    expect(url.searchParams.get("entry.5555555555")).toBe(
      "Weekly care for the front and back yard.",
    );
    expect(url.searchParams.get("entry.6666666666")).toBe("Yes");
  });
});
