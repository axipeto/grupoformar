export type ThemeCssVariables = Record<string, string>;

export function applyThemeVariables(vars: ThemeCssVariables) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
}
