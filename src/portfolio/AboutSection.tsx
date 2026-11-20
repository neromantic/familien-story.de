import LocalizedStrings from "react-localization";
import { Heart } from "lucide-react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { detectLang } from "./lang";
import { InstagramIcon, WhatsAppIcon } from "./Icons";
import aboutMe from "@/assets/images/about-me.webp";
import { getWhatsAppUrl, INSTAGRAM_URL } from "./config";

/**
 * Localized about-section strings, defined right where they are used.
 * German is the first language, so any key missing from Russian falls back
 * to it automatically.
 */
const strings = new LocalizedStrings({
  de: {
    heading: "Hi, ich bin",
    headingAccent: "Kateryna.",
    greeting: "Schön, dass du hier bist!",
    paragraphs: [
      "Ich bin Kateryna, Fotografin mit viel Liebe für die kleinen und großen Wunder des Lebens.",
      "Meine Reise begann mit der Geburt meiner Tochter: winzige Hände, das erste Kennenlernen und eine Liebe, die mein Herz tief berührt hat. Seitdem halte ich besonders gern die Geschichten rund um Geburt, Babys und das Familienwerden fest.",
      "Mit Gottes Hilfe wurde meine Leidenschaft zum Beruf. Ich möchte Bilder schaffen, die euch auch Jahre später wieder ganz nah an diesen Augenblick bringen.",
      "Ich freue mich darauf, auch eure Geschichte festzuhalten!",
    ],
    chat: "Lass uns chatten",
    or: "oder",
    instagram: "@kateryna.familienstory",
  },
  ru: {
    heading: "Привет, я",
    headingAccent: "Катерина.",
    greeting: "Рада, что ты здесь!",
    paragraphs: [
      "Я Катерина, фотограф, с большой любовью к маленьким и большим чудесам жизни.",
      "Мой путь начался с рождения дочери: крохотные ручки, первое знакомство и любовь, которая глубоко тронула моё сердце. С тех пор я особенно люблю истории о рождении, малышах и становлении семьи.",
      "С Божьей помощью моя страсть стала профессией. Я хочу создавать фотографии, которые даже спустя годы вернут вас в тот самый момент.",
      "Мне не терпится запечатлеть и вашу историю!",
    ],
    chat: "Давай общаться",
    or: "или",
    instagram: "@kateryna.familienstory",
  },
});
strings.setLanguage(detectLang());

/**
 * The about section pairs the photographer's portrait and story with direct
 * contact options in a contrasting dark panel.
 */
export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="portfolio-about"
    >
      <div className="portfolio-about-inner">
        <div className="portfolio-about-grid">
          <BlurFade className="about-reveal portfolio-about-photo">
            <div aria-hidden className="portfolio-about-frame" />
            <img
              src={aboutMe}
              alt="Kateryna Hohol lächelt bei einem Familien-Fotoshooting"
              loading="lazy"
              width="1365"
              height="1473"
            />
            <span className="portfolio-portrait-label">Kateryna Hohol</span>
          </BlurFade>

          <div className="portfolio-about-copy">
            <BlurFade className="about-reveal">
              <h2 id="about-heading">
                {strings.heading}{" "}
                <br />
                <em>{strings.headingAccent}</em>
              </h2>
            </BlurFade>

            <BlurFade className="about-reveal" delay={0.08}>
              <p className="portfolio-about-greeting">
                {strings.greeting}
                <Heart
                  className="portfolio-greeting-heart"
                  size={18}
                  strokeWidth={1.6}
                  aria-hidden
                />
              </p>
              <div className="portfolio-about-paragraphs">
                {strings.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </BlurFade>

            <BlurFade className="about-reveal" delay={0.16}>
              <div className="portfolio-about-actions">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-about-button"
                >
                  {strings.chat} <WhatsAppIcon className="size-4" />
                </a>
                <span>{strings.or}</span>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-about-social"
                >
                  {strings.instagram} <InstagramIcon className="size-4" />
                </a>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
