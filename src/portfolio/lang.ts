/**
 * Language handling for the portfolio.
 *
 * German is the default and lives at the root, Russian under `/ru`. The URL
 * wins over the saved choice, so a shared `/ru/...` link stays Russian.
 * During the build-time prerender there is no `window`, so the prerender
 * script sets `__PRERENDER_LANG__` before rendering each language.
 */
export type Lang = "de" | "ru";

const STORAGE_KEY = "familienstory.lang";

declare global {
  // eslint-disable-next-line no-var
  var __PRERENDER_LANG__: Lang | undefined;
}

/** The language implied by a path prefix, or null for German. */
export function langFromPath(pathname: string): Lang | null {
  return /^\/ru(?:\/|$)/.test(pathname) ? "ru" : null;
}

export function detectLang(): Lang {
  if (typeof window === "undefined") {
    return globalThis.__PRERENDER_LANG__ ?? "de";
  }
  const fromPath = langFromPath(window.location.pathname);
  if (fromPath) return fromPath;
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "de" || saved === "ru") return saved;
  return window.navigator.language?.toLowerCase().startsWith("ru") ? "ru" : "de";
}

export function setLang(lang: Lang): void {
  window.localStorage.setItem(STORAGE_KEY, lang);
}

/** Maps a German path to the same page in the given language. */
export function langPath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const withoutRu = clean.replace(/^\/ru(?=\/|$)/, "") || "/";
  if (lang === "de") return withoutRu;
  return withoutRu === "/" ? "/ru" : `/ru${withoutRu}`;
}
