import { useTranslation } from "react-i18next";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  isSupportedLocale,
} from "./locale";
import type { Locale } from "./locale";

/**
 * Reads and persists the active locale, mirroring it into i18next.
 *
 * Shaped like useTheme.ts's [value, setter] tuple, for the same reason:
 * a small, testable hook that keeps a persisted choice in sync with the
 * piece of global state (here, i18next's active language; there, the
 * `.light` class) that the rest of the app actually reads from.
 *
 * `locale` is derived fresh from `i18n.language` every render rather than
 * mirrored into its own `useState` — `useTranslation()` already re-renders
 * this component on i18next's `languageChanged` event, so a local copy was
 * only ever a second, driftable source of truth. Two independent
 * `useLocale()` instances under the same provider (e.g. the Navbar's
 * language switcher and a page reading the locale for date formatting)
 * used to disagree after a switch until the second one happened to
 * remount — see useLocale.test.tsx's cross-instance test.
 */
export function useLocale(): [Locale, (next: Locale) => void] {
  const { i18n } = useTranslation();
  const locale = isSupportedLocale(i18n.language)
    ? i18n.language
    : DEFAULT_LOCALE;

  function setLocale(next: Locale) {
    if (next === locale) return;
    void i18n.changeLanguage(next);
    document.documentElement.lang = next;
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
  }

  return [locale, setLocale];
}
