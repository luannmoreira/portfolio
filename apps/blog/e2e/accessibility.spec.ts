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
        await page.emulateMedia({ colorScheme });
        await page.goto(`${route}?lang=${locale}`);

        const results = await new AxeBuilder({ page }).analyze();

        expect(results.violations).toEqual([]);
      });
    }
  }
}
