import { test, expect } from "@playwright/test";

test("blog index lists posts and links to the post page", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();

  await page.getByRole("link", { name: "Hello, Blog" }).click();
  await expect(page).toHaveURL("/blog/hello-world");
  await expect(
    page.getByRole("heading", { name: "Hello, Blog" })
  ).toBeVisible();
});

test("an unknown route shows the not-found page", async ({ page }) => {
  await page.goto("/does-not-exist");
  await expect(page.getByText(/page not found/i)).toBeVisible();
});

test("a heading's self-link navigates to its own anchor", async ({ page }) => {
  await page.goto("/blog/hello-world");

  const heading = page.getByRole("heading", { name: "Hello, Blog" });
  await heading.getByRole("link").click();

  await expect(page).toHaveURL("/blog/hello-world#hello-blog");
});

test("ADR index lists ADRs and links to the ADR page", async ({ page }) => {
  await page.goto("/adr");
  await expect(
    page.getByRole("heading", { name: "Architecture Decision Records" })
  ).toBeVisible();

  await page.getByRole("link", { name: "ADR Placeholder" }).click();
  await expect(page).toHaveURL("/adr/placeholder");
  await expect(
    page.getByRole("heading", { name: "ADR Placeholder" })
  ).toBeVisible();
});

test("the real post exercises every MDX authoring component (9.8)", async ({
  page,
}) => {
  await page.goto("/blog/building-this-blogs-content-pipeline");

  // Callout wrappers (9.2), via MDXProvider (9.8)
  await expect(
    page.getByText("pnpm workspaces, not Turborepo or Nx")
  ).toBeVisible();
  await expect(
    page.getByText("Code-splitting doesn't fully work yet")
  ).toBeVisible();
  await expect(
    page.getByText("A dependency that crashes in the browser")
  ).toBeVisible();
  await expect(
    page.getByText("Reuse proven AST-injection utilities")
  ).toBeVisible();
  await expect(page.getByText("type is derived, not authored")).toBeVisible();

  // FileTree (9.5)
  await expect(page.getByText("config-tailwind")).toBeVisible();

  // Terminal (9.6), reusing Pre's copy button (9.4)
  await expect(page.getByText("pnpm --filter blog dev")).toBeVisible();
  await expect(
    page.getByRole("button", { name: /copy/i }).first()
  ).toBeVisible();

  // Mermaid diagram, build-time SVG (9.7)
  await expect(page.locator("svg.flowchart")).toBeVisible();
});
