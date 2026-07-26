import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/#/about",
  "/#/resume",
  "/#/projects",
  "/#/uses",
  "/#/now",
  "/#/contact",
];

for (const route of routes) {
  test(`${route} has no automatically detectable accessibility violations`, async ({
    page,
  }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });
}
