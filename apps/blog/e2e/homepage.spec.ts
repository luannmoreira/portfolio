import { test, expect } from "@playwright/test";

test("homepage loads with the correct title and Home content", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Blog");
  await expect(page.getByRole("heading", { name: "Blog" })).toBeVisible();
});
