import LocalizedStrings from "react-localization";
import { ArrowUpRight, Mail } from "lucide-react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { WhatsAppIcon } from "./Icons";
import { detectLang } from "./lang";
import { EMAIL_ADDRESS, getWhatsAppUrl } from "./config";

const strings = new LocalizedStrings({
  de: {
    heading: "Eure Geschichte",
    headingLine: "beginnt mit",
    headingAccent: "einem Hallo.",
    intro:
      "Erzählt mir, was ihr festhalten möchtet. Ganz in Ruhe finden wir heraus, was zu euch und eurer Geschichte passt.",
    whatsapp: "Fotoshooting besprechen",
    email: "Oder per E-Mail schreiben",
  },
  ru: {
    heading: "Ваша история",
    headingLine: "начинается с",
    headingAccent: "приветствия.",
    intro:
      "Расскажите, что вам хотелось бы сохранить. Мы спокойно обсудим, что подойдёт именно вам.",
    whatsapp: "Обсудить съёмку",
    email: "Или написать по почте",
  },
});
strings.setLanguage(detectLang());

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="portfolio-contact"
    >
      <div className="portfolio-contact-inner">
        <div>
          <BlurFade className="contact-reveal">
            <h2 id="contact-heading">
              {strings.heading}{" "}
              <br />
              {strings.headingLine} <em>{strings.headingAccent}</em>
            </h2>
            <p className="portfolio-contact-copy">
              {strings.intro}
            </p>
          </BlurFade>

          <BlurFade className="contact-reveal" delay={0.1}>
            <div className="portfolio-contact-actions">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-contact-button"
              >
                <span className="inline-flex items-center gap-3">
                  <WhatsAppIcon className="size-4" />
                  {strings.whatsapp}
                </span>
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="portfolio-contact-email"
              >
                <Mail className="size-4" />
                {strings.email}
              </a>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
