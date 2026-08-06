import type { Locale } from "@portfolio/i18n";

// Language names are conventionally shown as their own autonym/code
// regardless of the currently active UI language (a Portuguese-reading
// visitor still expects to see "EN", not a translated word for "English")
// — so, unlike ThemeToggle, these labels are never routed through
// translation. `label` (the group's accessible name) *is* supplied by the
// caller via translation, same as every other string in the app.
const OPTIONS: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "pt-BR", label: "PT" },
];

interface LanguageSwitcherProps {
  locale: Locale;
  onChange: (locale: Locale) => void;
  label: string;
}

/**
 * A locale picker rendered as two always-visible, always-labeled buttons.
 *
 * Two always-visible buttons rather than a single toggle: unlike sun/moon
 * iconography, "EN"/"PT" text has no universal single-glyph convention for
 * "this is what you'll get if you click", so unambiguous current-selection
 * state needs both options shown at once with `aria-current` marking the
 * active one — the same pattern TimelineItem.tsx already uses for its
 * active milestone.
 */
export default function LanguageSwitcher({
  locale,
  onChange,
  label,
}: LanguageSwitcherProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-1 rounded-full border border-outline-variant/30 p-0.5"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-current={option.value === locale ? "true" : undefined}
          onClick={() => onChange(option.value)}
          className={
            option.value === locale
              ? "rounded-full bg-primary px-2.5 py-1 font-label-mono text-caption text-on-primary"
              : "rounded-full px-2.5 py-1 font-label-mono text-caption text-on-surface-variant transition-colors hover:text-primary"
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
