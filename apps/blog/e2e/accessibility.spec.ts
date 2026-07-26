import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

const routes = [
  "/",
  "/blog",
  "/blog/hello-world",
  "/blog/building-this-blogs-content-pipeline",
  "/adr",
  "/adr/placeholder",
  "/does-not-exist",
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
