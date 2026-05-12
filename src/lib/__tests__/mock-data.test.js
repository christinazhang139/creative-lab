import { describe, it, expect } from "vitest";
import { getMockHooks, getMockVariants, getMockRefinedVariants } from "../mock-data";

describe("getMockHooks", () => {
  it("returns sneaker hooks for Nike-related text", () => {
    const result = getMockHooks("Nike Air Max Pulse sneakers with cushioning");
    expect(result.hooks).toHaveLength(3);
    expect(result.hooks[0].hook).toBe("All-Day Cloud Comfort");
  });

  it("returns SaaS hooks for tech/AI text", () => {
    const result = getMockHooks("Enterprise AI deployment platform with cloud infrastructure");
    expect(result.hooks[0].hook).toBe("10x Faster Deployment");
  });

  it("returns food hooks for food-related text", () => {
    const result = getMockHooks("Organic healthy meal prep with clean ingredients");
    expect(result.hooks[0].hook).toBe("Clean Ingredients Only");
  });

  it("returns ecommerce hooks for shop/brand text", () => {
    const result = getMockHooks("Shopify store brand D2C product catalog");
    expect(result.hooks[0].hook).toBe("3x Content, Zero Extra Work");
  });

  it("returns generic hooks for unrecognized text", () => {
    const result = getMockHooks("Something completely unrelated to any category");
    expect(result.hooks[0].hook).toBe("Solves a Real Problem");
  });

  it("returns image-specific hooks when only images provided", () => {
    const result = getMockHooks("", [{ url: "data:image/png;base64,abc" }]);
    expect(result.hooks[0].hook).toBe("Visual-First Experience");
  });

  it("always returns exactly 3 hooks", () => {
    const inputs = ["Nike shoes", "AI platform", "healthy food", "random text", ""];
    inputs.forEach((text) => {
      const result = getMockHooks(text);
      expect(result.hooks).toHaveLength(3);
    });
  });

  it("hooks always have required fields", () => {
    const result = getMockHooks("test");
    result.hooks.forEach((hook) => {
      expect(hook).toHaveProperty("id");
      expect(hook).toHaveProperty("hook");
      expect(hook).toHaveProperty("angle");
      expect(typeof hook.id).toBe("number");
      expect(typeof hook.hook).toBe("string");
      expect(typeof hook.angle).toBe("string");
    });
  });
});

describe("getMockVariants", () => {
  it("returns matching variants for sneaker hooks", () => {
    const hooks = getMockHooks("Nike sneakers").hooks;
    const result = getMockVariants(hooks);
    expect(result.variants).toHaveProperty("google");
    expect(result.variants).toHaveProperty("instagram");
    expect(result.variants).toHaveProperty("tiktok");
    expect(result.variants).toHaveProperty("email");
  });

  it("google variants have headline and description", () => {
    const hooks = getMockHooks("test").hooks;
    const result = getMockVariants(hooks);
    expect(result.variants.google).toHaveProperty("headline");
    expect(result.variants.google).toHaveProperty("description");
  });

  it("tiktok has 3 scenes", () => {
    const hooks = getMockHooks("test").hooks;
    const result = getMockVariants(hooks);
    expect(result.variants.tiktok.scenes).toHaveLength(3);
  });

  it("email has 3 subject lines", () => {
    const hooks = getMockHooks("test").hooks;
    const result = getMockVariants(hooks);
    expect(result.variants.email.subject_lines).toHaveLength(3);
  });
});

describe("getMockRefinedVariants", () => {
  it("returns different variants per hook", () => {
    const hooks = getMockHooks("Nike sneakers").hooks;
    const v1 = getMockRefinedVariants(hooks[0], hooks);
    const v2 = getMockRefinedVariants(hooks[1], hooks);
    expect(v1.variants.google.headline).not.toBe(v2.variants.google.headline);
  });

  it("refined variants have all 4 channels", () => {
    const hooks = getMockHooks("test").hooks;
    const result = getMockRefinedVariants(hooks[0], hooks);
    expect(result.variants).toHaveProperty("google");
    expect(result.variants).toHaveProperty("instagram");
    expect(result.variants).toHaveProperty("tiktok");
    expect(result.variants).toHaveProperty("email");
  });
});
