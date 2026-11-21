import { useEffect, useRef, useState } from "react";
import LocalizedStrings from "react-localization";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { detectLang, langPath } from "./lang";
import { LanguageSwitch } from "./LanguageSwitch";
import headerDesktop from "@/assets/images/header-desktop.png";
import headerMobile from "@/assets/images/header-mobile.png";
import { getWhatsAppUrl } from "./config";
import { WhatsAppIcon } from "./Icons";

/**
 * Localized hero strings, defined right where they are used. German is the
 * first language, so any key missing from Russian falls back to it.
 */
const strings = new LocalizedStrings({
  de: {
    title: "Familienstory",
    subtitle: "Story, die bleibt für immer.",
    eyebrow: "Familien- & Geburtsfotografie · Chemnitz",
    intro:
      "Ungestellte Familienreportagen für alle, die sich später nicht an ein Fotoshooting erinnern wollen – sondern an ihr Gefühl.",
    cta: "Geschichte festhalten",
    navCta: "Termin anfragen",
    work: "Arbeiten",
    stories: "Stories",
    discover: "Entdecken",
    about: "Über mich",
    process: "Ablauf",
    contact: "Kontakt",
    openMenu: "Navigation öffnen",
    closeMenu: "Navigation schließen",
    nav: "Hauptnavigation",
  },
  ru: {
    title: "Семейная история",
    subtitle: "История, которая останется навсегда.",
    eyebrow: "Семейная фотография и съёмка родов · Хемниц",
    intro:
      "Непостановочные семейные истории для тех, кто хочет вспоминать не фотосессию, а свои чувства.",
    cta: "Сохранить вашу историю",
    navCta: "Записаться",
    work: "Работы",
    stories: "Истории",
    discover: "Смотреть",
    about: "Обо мне",
    process: "Как всё проходит",
    contact: "Контакт",
    openMenu: "Открыть навигацию",
    closeMenu: "Закрыть навигацию",
    nav: "Главная навигация",
  },
});
strings.setLanguage(detectLang());

/**
 * The full-bleed hero with a compact navigation and a direct contact link.
 */
export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const lang = detectLang();

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header id="top" className="portfolio-hero">
      <picture className="portfolio-hero-picture">
        <source media="(max-width: 640px)" srcSet={headerMobile} />
        <img
          src={headerDesktop}
          alt="Familie in der Herbstnatur"
          aria-hidden
          fetchPriority="high"
          width="2048"
          height="1365"
          className="portfolio-hero-image"
        />
      </picture>
      <div aria-hidden className="portfolio-hero-wash" />

      <div className="portfolio-header">
        <a href="#top" className="portfolio-brand" aria-label="Familienstory – Startseite">
          <span>FAMILIEN</span><em>STORY</em>
        </a>
        <nav aria-label={strings.nav} className="portfolio-nav-desktop">
          <a href="#portfolio">{strings.work}</a>
          <a href={langPath("/leistungen", lang)}>{strings.stories}</a>
          <a href={langPath("/ueber-mich", lang)}>{strings.about}</a>
          <a href="#process">{strings.process}</a>
          <a href="#contact">{strings.contact}</a>
          <a className="portfolio-nav-cta" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
            {strings.navCta}<WhatsAppIcon className="size-4" />
          </a>
          <LanguageSwitch />
        </nav>
        <div className="portfolio-mobile-actions">
          <button
            type="button"
            ref={menuButtonRef}
            aria-label={menuOpen ? strings.closeMenu : strings.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="portfolio-menu-button"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label={strings.nav}
        aria-hidden={!menuOpen}
        className={`portfolio-nav-mobile${menuOpen ? " is-open" : ""}`}
        inert={!menuOpen}
      >
        <a href="#portfolio" onClick={() => setMenuOpen(false)}>{strings.work}</a>
        <a href={langPath("/leistungen", lang)} onClick={() => setMenuOpen(false)}>{strings.stories}</a>
        <a href={langPath("/ueber-mich", lang)} onClick={() => setMenuOpen(false)}>{strings.about}</a>
        <a href="#process" onClick={() => setMenuOpen(false)}>{strings.process}</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>{strings.contact}</a>
        <a className="portfolio-nav-cta" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
          {strings.navCta}<WhatsAppIcon className="size-4" />
        </a>
        <LanguageSwitch />
      </nav>

      <div className="portfolio-hero-content">
        <p className="portfolio-eyebrow">{strings.eyebrow}</p>
        <h1>{strings.title}</h1>
        <p className="portfolio-hero-subtitle">{strings.subtitle}</p>
        <p className="portfolio-hero-copy">{strings.intro}</p>
        <a className="portfolio-button portfolio-button-light" href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
          <span>{strings.cta}</span><i><ArrowUpRight size={16} /></i>
        </a>
      </div>
      <a className="portfolio-scroll-hint" href="#portfolio">
        <span>{strings.discover}</span><i aria-hidden />
      </a>
    </header>
  );
}
