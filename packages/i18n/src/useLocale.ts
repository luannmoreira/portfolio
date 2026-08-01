import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LOCALE_STORAGE_KEY, type Locale } from "./locale";

// Shaped like useTheme.ts's [value, setter] tuple, for the same reason:
// a small, testable hook that keeps a persisted choice in sync with the
// piece of global state (here, i18next's active language; there, the
// `.light` class) that the rest of the app actually reads from.
export function useLocale(): [Locale, (next: Locale) => void] {
  const { i18n } = useTranslation();
  const [locale, setLocaleState] = useState<Locale>(i18n.language as Locale);

  function setLocale(next: Locale) {
    if (next === locale) return;
    void i18n.changeLanguage(next);
    document.documentElement.lang = next;
    localStorage.setItem(LOCALE_STORAGE_KEY, next);
    setLocaleState(next);
  }

  return [locale, setLocale];
}
