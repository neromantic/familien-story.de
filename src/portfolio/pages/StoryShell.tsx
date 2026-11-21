import type { ReactNode } from "react";
import LocalizedStrings from "react-localization";
import { ArrowUpRight } from "lucide-react";
import { LanguageSwitch } from "../LanguageSwitch";
import { SiteFooter } from "../SiteFooter";
import { WhatsAppIcon } from "../Icons";
import { detectLang, langPath } from "../lang";
import { getWhatsAppUrl } from "../config";

const strings = new LocalizedStrings({
  de: {
    work: "Arbeiten",
    stories: "Stories",
    about: "Über mich",
    cta: "Termin anfragen",
    nav: "Hauptnavigation",
    home: "Familienstory – Startseite",
  },
  ru: {
    work: "Работы",
    stories: "Истории",
    about: "Обо мне",
    cta: "Записаться",
    nav: "Главная навигация",
    home: "Familienstory – главная",
  },
});

/** The standalone header of the content pages (About / Stories). */
export function StoryShell({ children }: { children: ReactNode }) {
  const lang = detectLang();
  strings.setLanguage(lang);
  const home = langPath("/", lang);

  return (
    <div className="portfolio-page story-page">
      <header className="story-header">
        <a href={home} className="story-brand" aria-label={strings.home}>
          <span>FAMILIEN</span>
          <em>STORY</em>
        </a>
        <nav aria-label={strings.nav} className="story-nav">
          <a href={`${home}#portfolio`}>{strings.work}</a>
          <a href={langPath("/leistungen", lang)}>{strings.stories}</a>
          <a href={langPath("/ueber-mich", lang)}>{strings.about}</a>
          <a
            className="story-nav-cta"
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >
            {strings.cta}
            <WhatsAppIcon className="size-4" />
          </a>
          <LanguageSwitch />
        </nav>
      </header>

      <main className="story-main">{children}</main>

      <SiteFooter />
    </div>
  );
}

/** A reusable closing call to action for the content pages. */
export function StoryCallToAction({
  heading,
  text,
  whatsapp,
  instagram,
  instagramUrl,
}: {
  heading: string;
  text: string;
  whatsapp: string;
  instagram: string;
  instagramUrl: string;
}) {
  return (
    <aside className="story-cta" aria-label={heading}>
      <div>
        <h2>{heading}</h2>
        <p>{text}</p>
      </div>
      <div className="story-cta-actions">
        <a
          className="story-cta-button"
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon className="size-4" />
          {whatsapp}
          <ArrowUpRight className="size-4" />
        </a>
        <a
          className="story-cta-link"
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {instagram}
        </a>
      </div>
    </aside>
  );
}
