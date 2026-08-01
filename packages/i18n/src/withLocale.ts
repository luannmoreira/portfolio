import type { Locale } from "./locale";

// Mirrors each app's own withTheme() helper: localStorage can't cross the
// portfolio/blog origin boundary, so an explicit locale choice is carried
// across via the URL on cross-app nav links instead, read back by the
// receiving app's resolveInitialLocale().
export function withLocale(url: string, locale: Locale): string {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}lang=${locale}`;
}
