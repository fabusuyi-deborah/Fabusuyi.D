export type Theme = "light" | "dark";

export const CONSOLE_PATH = "/terminal";

/** Normal view opens in light, console opens in dark. */
export function defaultThemeFor(pathname: string): Theme {
  return pathname.startsWith(CONSOLE_PATH) ? "dark" : "light";
}

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
}

export function toggleTheme() {
  setTheme(getTheme() === "dark" ? "light" : "dark");
}

/** Runs before first paint (inlined in layout.tsx) so there is no flash of the wrong theme. */
export const themeInitScript = `document.documentElement.dataset.theme=location.pathname.startsWith("${CONSOLE_PATH}")?"dark":"light";`;
