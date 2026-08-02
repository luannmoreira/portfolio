import { useTranslation } from "react-i18next";
import type { Theme } from "../hooks/useTheme";

const MOON_PATH =
  "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z";

// Plain trigonometry, not a transcribed third-party icon path: a filled
// circle (r=4) at center (12,12), plus 8 stroked rays at 45°-increments,
// each spanning radius 6→9 from center (cos/sin(angle) * radius, added to
// the 12,12 center) — e.g. 45°: cos=sin=0.7071, 12 ± 4.24 (r=6) and
// 12 ± 6.36 (r=9). Every coordinate here can be checked by hand, unlike
// the previous version of this icon (mirrors apps/portfolio's SunIcon.tsx),
// which had a malformed, asymmetric bottom ray.
const SUN_RAYS = [
  ["18", "12", "21", "12"],
  ["16.24", "16.24", "18.36", "18.36"],
  ["12", "18", "12", "21"],
  ["7.76", "16.24", "5.64", "18.36"],
  ["6", "12", "3", "12"],
  ["7.76", "7.76", "5.64", "5.64"],
  ["12", "6", "12", "3"],
  ["16.24", "7.76", "18.36", "5.64"],
] as const;

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  const { t } = useTranslation();
  const label =
    theme === "light"
      ? t("themeToggle.switchToDark")
      : t("themeToggle.switchToLight");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="rounded-full p-3 text-on-surface transition-colors hover:text-primary"
    >
      {theme === "light" ? (
        <svg
          viewBox="0 0 20 20"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d={MOON_PATH} />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="4" stroke="none" />
          {SUN_RAYS.map(([x1, y1, x2, y2]) => (
            <line key={x1 + y1} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </svg>
      )}
    </button>
  );
}
