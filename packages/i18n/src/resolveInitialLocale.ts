import { DEFAULT_LOCALE, isSupportedLocale, type Locale } from "./locale";

interface PickLocaleInput {
  fromLink: string | null;
  stored: string | null;
  navigatorLanguages: readonly string[];
}

// Pure — the one place detection precedence is decided, so there's never a
// second source of truth (deliberately not using i18next-browser-detector,
// which would configure this same precedence separately).
export function pickLocale({
  fromLink,
  stored,
  navigatorLanguages,
}: PickLocaleInput): Locale {
  if (isSupportedLocale(fromLink)) return fromLink;
  if (isSupportedLocale(stored)) return stored;
  const hasPortuguese = navigatorLanguages.some((lang) =>
    lang.toLowerCase().startsWith("pt")
  );
  return hasPortuguese ? "pt-BR" : DEFAULT_LOCALE;
}

// Thin, impure wrapper used only at the real app entry point. Unlike the
// `.light` class (which gates CSS painted before React even mounts, and so
// needs a pre-paint inline <script>), no text renders before React mounts —
// there's no flash to prevent, so this can be plain, testable TS run from
// the entry point instead of an inline <head> script.
export function resolveInitialLocale(): Locale {
  const fromLink = new URLSearchParams(location.search).get("lang");
  if (isSupportedLocale(fromLink)) {
    localStorage.setItem("locale", fromLink);
  }
  return pickLocale({
    fromLink,
    stored: localStorage.getItem("locale"),
    navigatorLanguages: navigator.languages,
  });
}
