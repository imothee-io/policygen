import { describe, expect, test } from "vitest";
import {
  validateEmail,
  validateRequiredEmail,
  validateRequiredUrl,
  validateUrl,
} from "../src/commands/init";

describe("validateEmail", () => {
  test("accepts valid email addresses", () => {
    expect(validateEmail("test@example.com")).toBe(true);
    expect(validateEmail("user.name@domain.org")).toBe(true);
    expect(validateEmail("user+tag@example.co.uk")).toBe(true);
  });

  test("rejects invalid email addresses", () => {
    expect(validateEmail("invalid")).toBe("Please enter a valid email address");
    expect(validateEmail("@example.com")).toBe(
      "Please enter a valid email address",
    );
    expect(validateEmail("test@")).toBe("Please enter a valid email address");
    expect(validateEmail("test@.com")).toBe(
      "Please enter a valid email address",
    );
  });

  test("accepts empty string for optional fields", () => {
    expect(validateEmail("")).toBe(true);
  });
});

describe("validateRequiredEmail", () => {
  test("accepts valid email addresses", () => {
    expect(validateRequiredEmail("test@example.com")).toBe(true);
  });

  test("rejects empty string", () => {
    expect(validateRequiredEmail("")).toBe("Email is required");
  });

  test("rejects invalid email addresses", () => {
    expect(validateRequiredEmail("invalid")).toBe(
      "Please enter a valid email address",
    );
  });
});

describe("validateUrl", () => {
  test("accepts valid URLs", () => {
    expect(validateUrl("https://example.com")).toBe(true);
    expect(validateUrl("http://example.com")).toBe(true);
    expect(validateUrl("https://example.com/path/to/page")).toBe(true);
    expect(validateUrl("https://sub.domain.example.com")).toBe(true);
  });

  test("rejects invalid URLs", () => {
    expect(validateUrl("example.com")).toBe(
      "Please enter a valid URL (must start with http:// or https://)",
    );
    expect(validateUrl("ftp://example.com")).toBe(
      "Please enter a valid URL (must start with http:// or https://)",
    );
    expect(validateUrl("invalid")).toBe(
      "Please enter a valid URL (must start with http:// or https://)",
    );
  });

  test("accepts empty string for optional fields", () => {
    expect(validateUrl("")).toBe(true);
  });
});

describe("validateRequiredUrl", () => {
  test("accepts valid URLs", () => {
    expect(validateRequiredUrl("https://example.com")).toBe(true);
  });

  test("rejects empty string", () => {
    expect(validateRequiredUrl("")).toBe("URL is required");
  });

  test("rejects invalid URLs", () => {
    expect(validateRequiredUrl("invalid")).toBe(
      "Please enter a valid URL (must start with http:// or https://)",
    );
  });
});
