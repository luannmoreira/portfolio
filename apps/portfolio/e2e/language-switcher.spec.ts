import { test, expect } from "@playwright/test";

test.describe("language switcher", () => {
  test("switches the UI instantly, without a navigation, and updates <html lang>", async ({
    page,
  }) => {
    await page.goto("/");

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
    await page.goto("/");
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

    await page.goto("/");

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

    await page.goto("/");
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

  // Regression test: pt-BR strings run longer than their English source and
  // can wrap a `.text-plate` heading (Hero's "Construindo sistemas que
  // escalam.") at desktop widths where English never wrapped — a fixed
  // `max-width: 767px` media query guarding .text-plate's anti-gap
  // line-height used to assume headings only wrap below that breakpoint,
  // which silently stopped holding once translated content could be
  // longer than the English string the assumption was written against.
  // Checked at a representative desktop width (768px, where this exact
  // heading was observed wrapping in pt-BR but not en) — the underlying
  // fix removed the viewport gate entirely, so this should hold at every
  // width, but pinning one concrete desktop width here is what actually
  // catches a reintroduced viewport gate.
  test("text-plate headings keep their anti-clipping line-height at desktop widths too, in every locale", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 900 });
    await page.goto("/?lang=pt-BR");

    const ratios = await page.$$eval(".text-plate", (elements) =>
      elements.map((el) => {
        const style = getComputedStyle(el);
        return parseFloat(style.lineHeight) / parseFloat(style.fontSize);
      })
    );

    expect(ratios.length).toBeGreaterThan(0);
    for (const ratio of ratios) {
      expect(ratio).toBeGreaterThanOrEqual(1.7);
    }
  });
});
