import { useTranslation } from "react-i18next";
import type { Theme } from "../hooks/useTheme";
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  const { t } = useTranslation();
  const switchingTo = theme === "light" ? "dark" : "light";
  const label =
    switchingTo === "light"
      ? t("themeToggle.switchToLight")
      : t("themeToggle.switchToDark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="rounded-full p-3 text-on-surface transition-colors hover:text-primary"
    >
      {theme === "light" ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  );
}
