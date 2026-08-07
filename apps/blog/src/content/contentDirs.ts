import type { ContentType } from "./schema";
import type { Locale } from "@portfolio/i18n";

// Single source of truth for the content-type <-> directory mapping, shared
// by contentEntries.ts (Node fs walk, build time) and loader.ts
// (import.meta.glob, browser) so the two never drift apart on what "blog"
// vs "post" means.
export const CONTENT_DIRS: Record<ContentType, string> = {
  post: "blog",
  project: "projects",
  adr: "adr",
};

// Mirrors packages/i18n/src/locale.ts's SUPPORTED_LOCALES/DEFAULT_LOCALE as
// plain literals rather than importing them from @portfolio/i18n at
// runtime — this module is reached from vite.config.js's own top-level
// import chain (via contentEntries.ts and feed/plugin.ts) when Vite loads
// its config, which runs under plain Node ESM rather than through Vite's
// module graph. @portfolio/i18n's package.json points "exports" straight
// at its extensionless .ts source (meant to be resolved by a bundler), so
// a runtime import of it fails there with ERR_MODULE_NOT_FOUND even though
// the exact same import works fine everywhere else in this app (browser
// code and test files are transformed by Vite/Vitest, not run as plain
// Node ESM). Keep these two literals in sync with locale.ts by hand — the
// import.meta.glob locale segment in loader.ts already has to be, for the
// same static-analysis reason.
export const CONTENT_LOCALES: Locale[] = ["en", "pt-BR"];
export const DEFAULT_CONTENT_LOCALE: Locale = "en";
