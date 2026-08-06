import AxeBuilder from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

// /uses and /now are anchor sections on / and /about (not their own
// routes), so their content is already covered by those two scans.
// /does-not-exist covers the catch-all NotFound route (see navigation.spec.ts
// for its own behavioral test), matching the blog's equivalent coverage.
const routes = [
  "/",
  "/about",
  "/resume",
  "/projects",
  "/contact",
  "/does-not-exist",
];

// emulateMedia before navigating drives the inline FOUC-prevention script in
// index.html (it reads prefers-color-scheme on first paint) — the more
// direct way to get a deterministic starting theme than toggling after load,
// and it exercises that real init path. Without this, both themes' axe
// coverage would silently depend on whichever colorScheme the test runner's
// OS happens to prefer.
const colorSchemes = ["light", "dark"] as const;

// reducedMotion: "reduce" is set alongside colorScheme below — Reveal.tsx
// and TimelineItem.tsx both render fully settled (opacity 1, transition
// none) under prefers-reduced-motion, so this removes the fade-in transition
// race entirely rather than guessing how long it takes to finish (the
// previous fixed waitForTimeout(1600) approach — replaced because it still
// left 4 of these tests flipping pass/fail between identical runs; a
// deterministic "no transition ever runs" beats a longer guessed wait).

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
        await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
        await page.goto(`${route}?lang=${locale}`);
        // Explicit settle signal instead of a guessed duration: web fonts
        // swapping in after first paint can shift layout/contrast enough
        // for axe to catch a transient state a real user never perceives.
        await page.evaluate(() => document.fonts.ready);

        const results = await new AxeBuilder({ page }).analyze();

        expect(results.violations).toEqual([]);
      });
    }
  }
}
