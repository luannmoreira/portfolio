import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

// /uses and /now are anchor sections on / and /about (not their own
// routes), so their content is already covered by those two scans.
const routes = ["/", "/about", "/resume", "/projects", "/contact"];

// emulateMedia before navigating drives the inline FOUC-prevention script in
// index.html (it reads prefers-color-scheme on first paint) — the more
// direct way to get a deterministic starting theme than toggling after load,
// and it exercises that real init path. Without this, both themes' axe
// coverage would silently depend on whichever colorScheme the test runner's
// OS happens to prefer.
const colorSchemes = ["light", "dark"] as const;

// ?lang= drives resolveInitialLocale() the same way ?theme= drives the
// FOUC-prevention script above — covers both locales' translated content
// (including pt-BR's generally longer strings) for layout/contrast
// regressions axe can catch, per route × color scheme.
const locales = ["en", "pt-BR"] as const;

for (const colorScheme of colorSchemes) {
  for (const locale of locales) {
    for (const route of routes) {
      test(`${route} has no automatically detectable accessibility violations (${colorScheme}, ${locale})`, async ({
        page,
      }) => {
        await page.emulateMedia({ colorScheme });
        await page.goto(`${route}?lang=${locale}`);
        // Reveal fades content in via a CSS opacity transition (up to 1500ms,
        // Hero's) — scanning mid-transition catches a genuinely-blended,
        // lower-contrast color that isn't what a settled page ever shows a
        // real user. Longest transition + margin, not a guess.
        await page.waitForTimeout(1600);

        const results = await new AxeBuilder({ page }).analyze();

        expect(results.violations).toEqual([]);
      });
    }
  }
}
