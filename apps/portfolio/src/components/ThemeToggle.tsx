import { useTheme } from "../hooks/useTheme";
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";

export default function ThemeToggle() {
  const [theme, toggleTheme] = useTheme();
  const switchingTo = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${switchingTo} theme`}
      className="rounded-full p-2 text-white hover:text-blue light:text-dark-500 light:hover:text-teal-700"
    >
      {theme === "light" ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </button>
  );
}
