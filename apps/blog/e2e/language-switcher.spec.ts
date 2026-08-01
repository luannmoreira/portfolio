import { test, expect } from "@playwright/test";

test.describe("language switcher", () => {
  test("switches the UI instantly, without a navigation, and updates <html lang>", async ({
    page,
  }) => {
    await page.goto("/blog");

    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.getByRole("link", { name: "About", exact: true }).first()
    ).toBeVisible();

    const navigations: string[] = [];
    page.on("framenavigated", (frame) => navigations.push(frame.url()));

    await page.getByRole("button", { name: "PT" }).first().click();

    await expect(
      page.getByRole("link", { name: "Sobre", exact: true }).first()
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(
      page.getByRole("button", { name: "PT" }).first()
    ).toHaveAttribute("aria-current", "true");
    expect(navigations).toHaveLength(0);
  });

  test("persists an explicit choice across a reload", async ({ page }) => {
    await page.goto("/blog");
    await page.getByRole("button", { name: "PT" }).first().click();
    await expect(
      page.getByRole("link", { name: "Sobre", exact: true }).first()
    ).toBeVisible();

    await page.reload();

    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(
      page.getByRole("link", { name: "Sobre", exact: true }).first()
    ).toBeVisible();
  });

  test("auto-detects a Portuguese browser locale on first visit", async ({
    browser,
  }) => {
    const context = await browser.newContext({ locale: "pt-BR" });
    const page = await context.newPage();

    await page.goto("/blog");

    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(
      page.getByRole("link", { name: "Sobre", exact: true }).first()
    ).toBeVisible();

    await context.close();
  });

  test("does not override an explicit choice with browser-language detection", async ({
    browser,
  }) => {
    const context = await browser.newContext({ locale: "pt-BR" });
    const page = await context.newPage();

    await page.goto("/blog");
    await page.getByRole("button", { name: "EN" }).first().click();
    await expect(
      page.getByRole("link", { name: "About", exact: true }).first()
    ).toBeVisible();

    await page.reload();

    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.getByRole("link", { name: "About", exact: true }).first()
    ).toBeVisible();

    await context.close();
  });
});
