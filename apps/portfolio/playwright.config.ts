import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // HTML report only in CI (uploaded as an artifact) — locally, the list
  // reporter's console output is enough and avoids an unread report dir.
  reporter: process.env.CI ? [["html", { open: "never" }]] : "list",
  use: {
    baseURL: "http://localhost:4173/portfolio/",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      // mobile-nav.spec.ts assumes a collapsed/inert desktop nav overlay
      // (md:hidden) and would fail its own assertions at this viewport —
      // it's mobile-chromium-only, see that project below.
      testIgnore: /mobile-nav\.spec\.ts/,
    },
    {
      // Stays on Chromium (not devices["iPhone ..."], which defaults to
      // WebKit and would need its own `playwright install` step in CI) —
      // scoped via testMatch, not every spec: navigation.spec.ts assumes
      // desktop nav visibility and isn't viewport-aware, so it stays on
      // the default "chromium" project only.
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
      testMatch: /accessibility\.spec\.ts|mobile-nav\.spec\.ts/,
    },
  ],
  webServer: {
    command: "pnpm build && pnpm preview",
    url: "http://localhost:4173/portfolio/",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
