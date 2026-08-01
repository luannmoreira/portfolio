import type { Locale } from "./locale";

// Replaces what used to be 3 independent hardcoded English date-formatting
// implementations (blog's ContentIndex.tsx/Post.tsx, portfolio's
// experience.ts month abbreviations) with one locale-aware call site.
export function formatDate(
  isoDate: string,
  locale: Locale,
  options: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(isoDate));
}
