export type Locale = "en" | "pt-BR";

export const DEFAULT_LOCALE: Locale = "en";
export const SUPPORTED_LOCALES: Locale[] = ["en", "pt-BR"];
export const LOCALE_STORAGE_KEY = "locale";

export function isSupportedLocale(value: string | null): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}
