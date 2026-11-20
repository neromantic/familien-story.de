import { Fragment } from "react";
import LocalizedStrings from "react-localization";
import { Marquee } from "@/components/magic-ui/marquee";
import { detectLang } from "./lang";

const strings = new LocalizedStrings({
  de: {
    label: "Angebot",
    items: ["Familienreportagen", "Babybauch", "Homestorys", "Geburtsfotografie"],
  },
  ru: {
    label: "Услуги",
    items: ["Семейные истории", "Беременность", "Домашние истории", "Съёмка родов"],
  },
});
strings.setLanguage(detectLang());

/** The service strip below the hero, built with the Magic UI marquee. */
export function MarqueeStrip() {
  return (
    <div className="portfolio-marquee" role="region" aria-label={strings.label}>
      <Marquee repeat={4} pauseOnHover aria-hidden>
        {strings.items.map((item) => (
          <Fragment key={item}>
            <span>{item}</span>
            <i aria-hidden>✦</i>
          </Fragment>
        ))}
      </Marquee>
    </div>
  );
}
