import { test, expect } from "@playwright/test";

test.describe("mobile nav overlay", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("hamburger opens the overlay and exposes nav links", async ({
    page,
  }) => {
    const toggle = page.getByRole("button", { name: "Open menu" });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();

    await expect(
      page.getByRole("button", { name: "Close menu" })
    ).toHaveAttribute("aria-expanded", "true");
    await expect(
      page
        .getByRole("navigation")
        .getByRole("link", { name: "About", exact: true })
    ).toBeVisible();
  });

  test("clicking a link in the overlay navigates and closes it", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "About", exact: true })
      .click();

    await expect(page).toHaveURL(/\/about$/);
    await expect(
      page.getByRole("button", { name: "Open menu" })
    ).toHaveAttribute("aria-expanded", "false");
  });

  test("open overlay renders a blurred, translucent backdrop", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Open menu" }).click();

    const overlay = page.locator("#mobile-nav");
    const style = await overlay.evaluate((el) => {
      const computed = getComputedStyle(el);
      return {
        backdropFilter:
          computed.backdropFilter ||
          computed.getPropertyValue("-webkit-backdrop-filter"),
        backgroundColor: computed.backgroundColor,
      };
    });

    expect(style.backdropFilter).not.toBe("none");
    // rgb(...) with no alpha channel would mean fully opaque — assert an
    // alpha-carrying color (rgba(...) or color(... / N)) so page content
    // genuinely shows through, not just a blurred solid panel.
    expect(style.backgroundColor).toMatch(/rgba|\/\s*0?\.\d+\s*\)/);
  });

  test("overlay is a dialog with an accessible name", async ({ page }) => {
    await page.getByRole("button", { name: "Open menu" }).click();

    // getByRole("dialog") with no `name` option would match any dialog
    // regardless of whether it's actually labeled — pass the expected
    // name so this fails if aria-label ever goes missing or empty.
    await expect(page.getByRole("dialog", { name: "Main menu" })).toBeVisible();
  });

  test("Escape closes the overlay", async ({ page }) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(
      page.getByRole("button", { name: "Close menu" })
    ).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
  });

  test("Tab from the closed hamburger never focuses an overlay link", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Open menu" }).focus();
    await page.keyboard.press("Tab");

    const focusedInsideOverlay = await page.evaluate(
      () => document.activeElement?.closest("#mobile-nav") !== null
    );
    expect(focusedInsideOverlay).toBe(false);
  });

  test("the mobile Resume CTA inside the overlay navigates to /resume", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Resume", exact: true })
      .click();

    await expect(page).toHaveURL(/\/resume$/);
  });

  test(".text-plate headings keep enough line-height to avoid clipping on wrap", async ({
    page,
  }) => {
    const lineHeightRatios = await page.$$eval(".text-plate", (elements) =>
      elements.map((el) => {
        const style = getComputedStyle(el);
        return parseFloat(style.lineHeight) / parseFloat(style.fontSize);
      })
    );

    expect(lineHeightRatios.length).toBeGreaterThan(0);
    for (const ratio of lineHeightRatios) {
      expect(ratio).toBeGreaterThanOrEqual(1.7);
    }
  });

  test("theme toggle and footer social links meet the 44px touch-target minimum", async ({
    page,
  }) => {
    const targets = [
      page.getByRole("button", { name: /switch to (light|dark) theme/i }),
      page.getByRole("link", { name: "GitHub", exact: true }),
      page.getByRole("link", { name: "LinkedIn", exact: true }),
      page.getByRole("link", { name: "WhatsApp", exact: true }),
    ];

    for (const target of targets) {
      const box = await target.first().boundingBox();
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThanOrEqual(44);
      expect(box!.height).toBeGreaterThanOrEqual(44);
    }
  });
});
