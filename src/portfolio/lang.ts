/**
 * Initial language detection for the portfolio. The saved choice wins,
 * otherwise default to German (the site's primary language) unless the
 * browser is Russian.
 */
export type Lang = "de" | "ru";

const STORAGE_KEY = "familienstory.lang";

export function detectLang(): Lang {
  if (typeof window === "undefined") return "de";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "de" || saved === "ru") return saved;
  return window.navigator.language?.toLowerCase().startsWith("ru") ? "ru" : "de";
}

export function setLang(lang: Lang): void {
  window.localStorage.setItem(STORAGE_KEY, lang);
}
