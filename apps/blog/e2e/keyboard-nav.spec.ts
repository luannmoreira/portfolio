import { test, expect } from "@playwright/test";

test.describe("keyboard navigation", () => {
  test("a skip-to-content link is the first focusable element and jumps to main", async ({
    page,
  }) => {
    await page.goto("/blog");

    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toBeFocused();

    await page.keyboard.press("Enter");
    // Visible is true regardless of whether the link actually worked (it's
    // in the DOM either way) — assert keyboard focus itself moved there,
    // which is the actual point of a skip link: without a focusable
    // target (tabindex="-1"), fragment navigation scrolls but leaves focus
    // wherever it was, so the very next Tab would jump back into the nav.
    await expect(page.locator("#main-content")).toBeFocused();
  });

  test("a keyboard-focused link renders our token-colored focus ring, not just the UA default", async ({
    page,
  }) => {
    await page.goto("/blog");

    // Tab past the skip link to the first real nav link.
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const outline = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el) return null;
      const style = getComputedStyle(el);

      // Resolve --color-primary through the browser's own cascade (via a
      // throwaway element) rather than comparing raw strings — the custom
      // property may be a hex literal while outlineColor always computes
      // to rgb(...), so a direct string compare would false-negative even
      // when the color genuinely matches.
      const probe = document.createElement("span");
      probe.style.color = "var(--color-primary)";
      document.body.appendChild(probe);
      const tokenColor = getComputedStyle(probe).color;
      probe.remove();

      return {
        style: style.outlineStyle,
        width: style.outlineWidth,
        color: style.outlineColor,
        tokenColor,
      };
    });

    expect(outline).not.toBeNull();
    expect(outline!.style).not.toBe("none");
    expect(parseFloat(outline!.width)).toBeGreaterThan(0);
    expect(outline!.color).toBe(outline!.tokenColor);
  });
});
