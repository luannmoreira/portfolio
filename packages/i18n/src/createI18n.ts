import i18next, { type i18n as I18nInstance, type Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LOCALE, type Locale } from "./locale";

interface CreateI18nOptions {
  locale: Locale;
  resources: Resource;
}

// One resources object per app, statically imported and passed in whole —
// no lazy backend/namespace-loading, which the "instant switch" requirement
// needs anyway and this string count doesn't justify avoiding.
export function createI18n({
  locale,
  resources,
}: CreateI18nOptions): I18nInstance {
  const instance = i18next.createInstance();
  void instance.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: DEFAULT_LOCALE,
    interpolation: { escapeValue: false },
  });
  return instance;
}
