import LocalizedStrings from "react-localization";
import { Camera, Check, Heart } from "lucide-react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { NumberTicker } from "@/components/magic-ui/number-ticker";
import { detectLang } from "./lang";

const strings = new LocalizedStrings({
  de: {
    heading: "Echte Momente.",
    headingAccent: "Für immer.",
    intro:
      "Von der ersten Nachricht bis zu euren fertigen Bildern bin ich an eurer Seite. Persönlich, transparent und unkompliziert.",
    steps: [
      {
        title: "Wir lernen uns kennen",
        text: "Bei einem kurzen Gespräch spüren wir, ob es passt – ganz ohne Druck und Verpflichtung.",
      },
      {
        title: "Euer Tag, euer Tempo",
        text: "Kein steifes Posieren. Ich begleite euch behutsam und lasse Raum für das, was von selbst entsteht.",
      },
      {
        title: "Erinnerungen bleiben",
        text: "Nach 1–2 Wochen erhaltet ihr eure liebevoll kuratierte Online-Galerie in voller Auflösung.",
      },
    ],
  },
  ru: {
    heading: "Настоящие моменты.",
    headingAccent: "Навсегда.",
    intro:
      "От первого сообщения до готовых фотографий я рядом с вами. Лично, прозрачно и без лишних сложностей.",
    steps: [
      {
        title: "Мы знакомимся",
        text: "В коротком разговоре мы поймём, подходим ли друг другу — без давления и обязательств.",
      },
      {
        title: "Ваш день, ваш темп",
        text: "Никаких застывших поз. Я бережно сопровождаю вас и оставляю место для того, что происходит само собой.",
      },
      {
        title: "Воспоминания остаются",
        text: "Через 1–2 недели вы получите бережно собранную онлайн-галерею в полном разрешении.",
      },
    ],
  },
});
strings.setLanguage(detectLang());

const icons = [Check, Camera, Heart];

export function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="portfolio-process"
    >
      <div className="portfolio-section-inner">
        <BlurFade className="portfolio-process-heading">
          <div>
            <h2 id="process-heading">
              {strings.heading}{" "}
              <br />
              <em>{strings.headingAccent}</em>
            </h2>
          </div>
          <p>{strings.intro}</p>
        </BlurFade>

        <div className="portfolio-step-grid">
          {strings.steps.map((step, index) => {
            const Icon = icons[index] ?? Check;
            return (
              <BlurFade
                key={step.title}
                className="portfolio-step"
                delay={index * 0.08}
              >
                <span className="portfolio-step-number">
                  <NumberTicker
                    value={index + 1}
                    minimumIntegerDigits={2}
                    delay={0.15}
                  />
                </span>
                <Icon size={26} strokeWidth={1.7} aria-hidden />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
