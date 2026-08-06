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

// emulateMedia before navigating drives the inline FOUC-prevention script in
// index.html (it reads prefers-color-scheme on first paint) — the more
// direct way to get a deterministic starting theme than toggling after
// load, and it exercises that real init path. Without this, both themes'
// axe coverage would silently depend on whichever colorScheme the test
// runner's OS happens to prefer (see portfolio's equivalent spec, where
// this exact gap hid a real contrast bug).
const colorSchemes = ["light", "dark"] as const;

// reducedMotion: "reduce" is set alongside colorScheme below, matching
// portfolio's spec — removes any CSS-transition timing race deterministically
// rather than guessing a settle duration.

// ?lang= drives resolveInitialLocale() the same way ?theme= drives the
// FOUC-prevention script above — covers both locales' translated chrome
// per route × color scheme (article content itself stays English-only,
// per the i18n plan's scope, but the chrome around it is fully bilingual).
const locales = ["en", "pt-BR"] as const;

for (const colorScheme of colorSchemes) {
  for (const locale of locales) {
    for (const route of routes) {
      test(`${route} has no automatically detectable accessibility violations (${colorScheme}, ${locale})`, async ({
        page,
      }) => {
        await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
        await page.goto(`${route}?lang=${locale}`);
        // Explicit settle signal instead of no wait at all: web fonts
        // swapping in after first paint can shift layout/contrast enough
        // for axe to catch a transient state a real user never perceives —
        // this was the dominant source of this spec's run-to-run flip-flops.
        await page.evaluate(() => document.fonts.ready);

        const results = await new AxeBuilder({ page }).analyze();

        expect(results.violations).toEqual([]);
      });
    }
  }
}
