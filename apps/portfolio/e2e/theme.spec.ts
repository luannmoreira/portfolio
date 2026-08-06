import { test, expect } from "@playwright/test";

// Unit tests cover ThemeToggle.tsx and useTheme.ts in isolation, but nothing
// end-to-end verified: clicking the toggle actually flips `.light` on
// <html>, the choice persists to localStorage across a reload, or that the
// synchronous inline FOUC-prevention <script> in index.html (CLAUDE.md:
// "must stay synchronous, stay inline, and stay before first paint") reads
// that persisted choice back correctly on the next load — exactly the kind
// of cross-cutting, easy-to-silently-break behavior a unit test structurally
// can't catch.
test("theme choice persists across reload with no flash", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByRole("button", {
    name: /switch to (light|dark) theme/i,
  });
  const initialClass = await page.locator("html").getAttribute("class");

  await toggle.click();

  const afterClickClass = await page.locator("html").getAttribute("class");
  expect(afterClickClass).not.toBe(initialClass);

  const persisted = await page.evaluate(() => localStorage.getItem("theme"));
  expect(persisted).toBe(afterClickClass?.includes("light") ? "light" : "dark");

  await page.reload();

  // Read immediately after reload (before waiting on anything else) — this
  // is exactly the window a flash-of-wrong-theme regression would show up
  // in, since the inline script runs before first paint but a bug in it
  // (or in what it reads) would still leave the wrong class present here.
  await expect(page.locator("html")).toHaveClass(afterClickClass ?? "");
});
