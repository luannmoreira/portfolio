import { useState } from "react";

export type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

// The `.light` class itself is set before first paint by an inline script
// in index.html (avoids a flash of the wrong theme) — this hook just reads
// that starting state back and keeps localStorage/the class in sync on
// every toggle after.
export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(readTheme);

  function toggleTheme() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("light", next === "light");
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  return [theme, toggleTheme];
}
