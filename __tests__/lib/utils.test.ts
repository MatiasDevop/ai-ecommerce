import { cn, formatDate, formatOrderNumber, formatPrice } from "@/lib/utils";

describe("lib/utils", () => {
  describe("formatPrice", () => {
    it("formats amounts with two decimal places", () => {
      expect(formatPrice(599.9)).toBe("£599.90");
    });

    it("falls back to zero when amount is missing", () => {
      expect(formatPrice(undefined)).toBe("£0.00");
    });

    it("supports custom currency prefixes", () => {
      expect(formatPrice(10, "$")).toBe("$10.00");
    });
  });

  describe("formatDate", () => {
    it("returns the fallback for empty values", () => {
      expect(formatDate(null)).toBe("Date unknown");
      expect(formatDate(undefined, "short", "Missing")).toBe("Missing");
    });

    it("formats long dates in en-GB format", () => {
      expect(formatDate("2025-01-05T00:00:00.000Z", "long")).toBe("5 January 2025");
    });

    it("formats short dates in en-GB format", () => {
      expect(formatDate("2025-01-05T00:00:00.000Z", "short")).toBe("5 Jan");
    });
  });

  describe("formatOrderNumber", () => {
    it("returns the last segment after a hyphen", () => {
      expect(formatOrderNumber("ORD-2024-ABC123")).toBe("ABC123");
    });

    it("returns fallback text when value is missing", () => {
      expect(formatOrderNumber(null)).toBe("N/A");
    });
  });

  describe("cn", () => {
    it("merges class names and resolves Tailwind conflicts", () => {
      expect(cn("px-2", false && "hidden", "px-4", "font-bold")).toBe("px-4 font-bold");
    });
  });
});
