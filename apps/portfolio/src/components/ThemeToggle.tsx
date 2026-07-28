import type { Theme } from "../hooks/useTheme";
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  const switchingTo = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${switchingTo} theme`}
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
