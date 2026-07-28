import type { Theme } from "../hooks/useTheme";

const SUN_PATH =
  "M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a5 5 0 100-10 5 5 0 000 10zM10 18a.75.75 0 01.75.75v0a.75.75 0 01-1.5 0v0A.75.75 0 0110 18zM16.364 5.636a.75.75 0 010 1.06l-1.06 1.062a.75.75 0 11-1.062-1.06l1.06-1.06a.75.75 0 011.06 0zM6.697 15.303a.75.75 0 010 1.061l-1.06 1.06a.75.75 0 01-1.061-1.06l1.06-1.06a.75.75 0 011.06 0zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.243 15.303a.75.75 0 011.061 0l1.06 1.06a.75.75 0 01-1.06 1.061l-1.06-1.06a.75.75 0 010-1.061zM5.636 5.636a.75.75 0 011.06 0l1.061 1.06a.75.75 0 11-1.06 1.062l-1.061-1.06a.75.75 0 010-1.061z";

const MOON_PATH =
  "M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z";

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
      <svg
        viewBox="0 0 20 20"
        className="h-5 w-5"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d={theme === "light" ? MOON_PATH : SUN_PATH} />
      </svg>
    </button>
  );
}
