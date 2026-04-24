import { describe, expect, it } from "vitest";
import { navigation, packageCards, siteConfig } from "@/content/site";

describe("content guardrails", () => {
  it("keeps navigation on internal routes", () => {
    for (const item of navigation) {
      expect(item.href.startsWith("/")).toBe(true);
    }
  });

  it("does not leak numeric pricing into package copy", () => {
    const packageCopy = JSON.stringify(packageCards);
    expect(packageCopy).not.toMatch(/\$\d|\b\d+\s?(CAD|USD|dollars?)\b/i);
  });

  it("uses a consistent phone number source of truth", () => {
    expect(siteConfig.phone.href).toBe("tel:+12899945553");
    expect(siteConfig.phone.label).toBe("+1 289-994-5553");
  });
});
