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

  test("clicking the internal Blog link navigates and closes the overlay", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Blog", exact: true })
      .click();

    await expect(page).toHaveURL(/\/blog$/);
    await expect(
      page.getByRole("button", { name: "Open menu" })
    ).toHaveAttribute("aria-expanded", "false");
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

  test("theme toggle and footer social links meet the 44px touch-target minimum", async ({
    page,
  }) => {
    const targets = [
      page.getByRole("button", { name: /switch to (light|dark) theme/i }),
      page.getByRole("link", { name: "RSS feed", exact: true }),
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
