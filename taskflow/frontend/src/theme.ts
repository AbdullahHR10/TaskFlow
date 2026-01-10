type Theme = "light" | "dark"

const THEME_KEY = "theme";

export function getInitialTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored) return stored;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  localStorage.setItem(THEME_KEY, theme);
}

export function toggleTheme() {
  const next = document.documentElement.classList.contains("dark")
  ? "light"
  : "dark";

  applyTheme(next);
}
