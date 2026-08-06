import type { Resource, i18n as I18nInstance } from "i18next";
import { createI18n } from "./createI18n";
import { resolveInitialLocale } from "./resolveInitialLocale";

/**
 * Resolves the boot locale, sets it on <html lang>, and initializes an
 * i18next instance from it — the entry-point sequence both apps' i18n.ts
 * files ran identically except for their own resources object.
 */
export function setupI18n(resources: Resource): I18nInstance {
  const locale = resolveInitialLocale();
  document.documentElement.lang = locale;

  return createI18n({ locale, resources });
}
