import LocalizedStrings from "react-localization";
import { ArrowUpRight, MapPin } from "lucide-react";
import { detectLang, langPath } from "./lang";
import { getWhatsAppUrl, INSTAGRAM_URL } from "./config";
import { InstagramIcon, WhatsAppIcon } from "./Icons";

/**
 * Localized footer strings, defined right where they are used. German is
 * the first language, so any key missing from Russian falls back to it.
 */
const strings = new LocalizedStrings({
  de: {
    location: "Chemnitz",
    photographer: "Fotografie von Kateryna Hohol",
    portfolio: "Portfolio",
    stories: "Stories",
    about: "Über mich",
    process: "Ablauf",
    contact: "Kontakt",
    backTop: "Zurück nach oben",
    navLabel: "Seitennavigation",
    legalNav: "Rechtliche Informationen",
    legal: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
  },
  ru: {
    location: "Хемниц",
    photographer: "Фотография Катерины Гоголь",
    portfolio: "Портфолио",
    stories: "Истории",
    about: "Обо мне",
    process: "Как всё проходит",
    contact: "Контакт",
    backTop: "Наверх",
    navLabel: "Навигация по сайту",
    legalNav: "Юридическая информация",
    legal: [
      { label: "Реквизиты", href: "/impressum" },
      { label: "Конфиденциальность", href: "/datenschutz" },
    ],
  },
});
strings.setLanguage(detectLang());

/**
 * The dark footer: the wordmark and location on the left, the legal links
 * on the right — side by side on desktop, stacked and centered on mobile,
 * as in the reference artwork.
 */
export function SiteFooter() {
  const lang = detectLang();
  const home = langPath("/", lang);

  return (
    <footer className="portfolio-footer">
      <div className="portfolio-footer-inner">
        <div className="portfolio-footer-top">
          <div>
            <p className="portfolio-footer-brand">FAMILIEN<em>STORY</em></p>
            <p className="portfolio-footer-photographer">{strings.photographer}</p>
            <p className="portfolio-footer-location">
              <MapPin className="size-3.5" /> {strings.location}
            </p>
          </div>
          <nav className="portfolio-footer-nav" aria-label={strings.navLabel}>
            <a href={`${home}#portfolio`}>{strings.portfolio}</a>
            <a href={langPath("/leistungen", lang)}>{strings.stories}</a>
            <a href={langPath("/ueber-mich", lang)}>{strings.about}</a>
            <a href={`${home}#process`}>{strings.process}</a>
            <a href={`${home}#contact`}>{strings.contact}</a>
          </nav>
          <a href={home} className="portfolio-back-top">
            {strings.backTop} <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="portfolio-footer-bottom">
          <p>© {new Date().getFullYear()} FAMILIENSTORY · {strings.location}</p>
          <div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-footer-social"
            >
              <InstagramIcon className="size-4" /> Instagram
            </a>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-footer-social"
            >
              <WhatsAppIcon className="size-4" /> WhatsApp
            </a>
            <nav aria-label={strings.legalNav} className="portfolio-footer-legal">
              {strings.legal.map((l) => (
                <a
                  key={l.label}
                  href={langPath(l.href, lang)}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
