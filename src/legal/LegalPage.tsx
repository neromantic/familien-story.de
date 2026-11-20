import type { ReactNode } from "react";
import { useEffect } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import LocalizedStrings from "react-localization";
import { detectLang } from "@/portfolio/lang";

/** Brand facts shared by the legal pages (proper nouns, not localized). */
const BRAND = {
  name: "FAMILIENSTORY",
  location: "Chemnitz",
} as const;

/** Localized strings for the legal page layout */
const layoutStrings = new LocalizedStrings({
  de: {
    backToHome: "Zurück zur Website",
    copyright: (year: number) => `© ${year} ${BRAND.name}`,
  },
  ru: {
    backToHome: "Вернуться на сайт",
    copyright: (year: number) => `© ${year} ${BRAND.name}`,
  },
});

interface LegalPageProps {
  /** Page title (rendered as the h1). */
  title: string;
  /** Short intro line under the title. */
  intro?: string;
  children: ReactNode;
}

/**
 * A standalone legal page (Impressum / Datenschutzerklärung) in the portfolio
 * design. Legal pages must be on their own, permanently reachable pages
 * (separate from the main content), so each lives at its own route.
 * 
 * Matches the portfolio style with:
 * - Company wordmark/logo in header using Aboreto font
 * - Cream background with consistent typography
 * - Dark footer matching the portfolio footer
 */
export function LegalPage({ title, intro, children }: LegalPageProps) {
  layoutStrings.setLanguage(detectLang());

  useEffect(() => {
    document.title = `${title} — ${BRAND.name}`;
    return () => {
      document.title = "Familien Story — Baby, Geburt & Familie";
    };
  }, [title]);

  return (
    <main className="min-h-screen bg-cream font-sans text-ink">
      <header className="border-b border-linen">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-3 px-5 py-4 sm:px-8">
          <a href="/" className="flex items-center gap-3">
            <span className="font-signature text-xl tracking-tight">{BRAND.name}</span>
          </a>
          <a
            href="/"
            className="inline-flex min-h-11 items-center gap-1.5 text-[12px] tracking-[0.1em] text-fawn uppercase transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            {layoutStrings.backToHome} <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <h1 className="break-words font-serif text-4xl leading-tight tracking-tight hyphens-auto sm:text-5xl">
          {title}
        </h1>
        {intro ? <p className="mt-4 text-sm leading-relaxed text-ink/60">{intro}</p> : null}
        <div className="mt-10 space-y-8">{children}</div>
      </div>

      <footer className="bg-cocoa-deep text-cream">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-lg font-light tracking-[0.22em]">{BRAND.name}</p>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-cream/60 md:justify-start">
              <MapPin className="size-3.5" /> {BRAND.location}
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-cream/70 md:justify-end">
            <a href="/datenschutz" className="transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream">
              {detectLang() === "ru" ? "Конфиденциальность" : "Datenschutz"}
            </a>
            <a href="/impressum" className="transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream">
              {detectLang() === "ru" ? "Реквизиты" : "Impressum"}
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}

/** A numbered/heading block within a legal page. */
export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="break-words font-serif text-2xl leading-tight tracking-tight hyphens-auto">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/70">{children}</div>
    </section>
  );
}
