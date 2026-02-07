import { describe, expect, test } from "vitest";
import { getCssStyles } from "../src/utils/renderTemplate";

describe("getCssStyles", () => {
  test("returns correct tailwind classes", () => {
    const css = getCssStyles("tailwind");
    expect(css.container).toBe("container mx-auto px-4 py-8");
    expect(css.heading).toBe("text-2xl font-bold mb-4");
    expect(css.list).toBe("list-disc pl-5 mb-4");
    expect(css.ol_class).toBe("list-decimal pl-5 mb-4");
    expect(css.ul_class).toBe("list-disc pl-5 mb-4");
    expect(css.link).toBe("text-blue-500 hover:underline");
  });

  test("returns correct daisyui classes", () => {
    const css = getCssStyles("daisyui");
    expect(css.container).toBe("container mx-auto px-4 py-8");
    expect(css.heading).toBe("text-primary text-2xl font-bold mb-4");
    expect(css.ol_class).toBe("list-decimal pl-5 mb-4");
    expect(css.ul_class).toBe("list-disc pl-5 mb-4");
    expect(css.link).toBe("text-primary hover:underline");
  });

  test("returns correct semantic classes for 'classes' framework", () => {
    const css = getCssStyles("classes");
    expect(css.container).toBe("container");
    expect(css.heading).toBe("heading");
    expect(css.list).toBe("list");
    expect(css.ol_class).toBe("ordered-list");
    expect(css.ul_class).toBe("unordered-list");
    expect(css.link).toBe("link");
  });

  test("throws error for unknown framework", () => {
    expect(() => getCssStyles("unknown")).toThrow("Unknown framework: unknown");
  });
});
