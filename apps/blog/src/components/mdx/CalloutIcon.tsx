import type { CalloutVariant } from "./Callout";

interface CalloutIconProps {
  variant: CalloutVariant;
  className?: string;
}

// One small hand-rolled SVG per variant — no icon library, mirroring the
// convention portfolio established in Phase 5 (removed FontAwesome runtime).
// Bundled into a single switch, unlike portfolio's one-file-per-icon
// pattern, since these are only ever used by Callout, not shared elsewhere.
function CalloutIcon({ variant, className }: CalloutIconProps) {
  const shared = {
    className,
    "aria-hidden": true,
    focusable: false,
  } as const;

  switch (variant) {
    case "decision":
      return (
        <svg {...shared} viewBox="0 0 20 20" fill="none" stroke="currentColor">
          <circle cx="10" cy="10" r="8" strokeWidth="1.5" />
          <path
            d="M6.5 10.5l2.5 2.5 4.5-5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "tradeoff":
      return (
        <svg {...shared} viewBox="0 0 20 20" fill="none" stroke="currentColor">
          <path
            d="M3 7h11m0 0l-3-3m3 3l-3 3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 13H6m0 0l3 3m-3-3l3-3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "warning":
      return (
        <svg {...shared} viewBox="0 0 20 20" fill="none" stroke="currentColor">
          <path
            d="M10 3l8.5 14.5H1.5L10 3z"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M10 8v4" strokeWidth="1.5" strokeLinecap="round" />
          <circle
            cx="10"
            cy="14.5"
            r="0.75"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "tip":
      return (
        <svg {...shared} viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.472 5.01 5.528.803-4 3.899.944 5.508L10 14.9l-4.944 2.72.944-5.508-4-3.899 5.528-.803L10 1.5z" />
        </svg>
      );
    case "note":
      return (
        <svg {...shared} viewBox="0 0 20 20" fill="none" stroke="currentColor">
          <circle cx="10" cy="10" r="8" strokeWidth="1.5" />
          <path d="M10 9v4.5" strokeWidth="1.5" strokeLinecap="round" />
          <circle
            cx="10"
            cy="6.75"
            r="0.75"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
  }
}

export default CalloutIcon;
