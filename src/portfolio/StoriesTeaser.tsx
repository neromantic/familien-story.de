import LocalizedStrings from "react-localization";
import { ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { detectLang, langPath } from "./lang";

const strings = new LocalizedStrings({
  de: {
    heading: "Deine Story.",
    subtitle: "Fünf Wege, sie festzuhalten.",
    more: "Mehr erfahren",
    stories: [
      {
        name: "FamilyStory",
        tagline: "Familienreportage",
        text: "Draußen in Chemnitz oder bei euch zu Hause. Kein Posieren — nur ihr.",
      },
      {
        name: "PregnancyStory",
        tagline: "Babybauch",
        text: "Zwischen der 28. und 34. Woche. Studio, draußen oder bei dir.",
      },
      {
        name: "BirthStory",
        tagline: "Geburtsfotografie",
        text: "Die Geburt, diskret festgehalten. Rufbereitschaft ab der 37. Woche.",
      },
      {
        name: "LoveStory",
        tagline: "Paare",
        text: "Für zwei, die sich haben — an eurem Ort in Chemnitz.",
      },
      {
        name: "YourStory",
        tagline: "Individuelle Fotografie",
        text: "Portrait, Selbstliebe, Business: deine eigene Geschichte.",
      },
    ],
  },
  ru: {
    heading: "Твоя история.",
    subtitle: "Пять способов её сохранить.",
    more: "Подробнее",
    stories: [
      {
        name: "FamilyStory",
        tagline: "Семейная история",
        text: "На улице в Хемнице или у вас дома. Без поз — только вы.",
      },
      {
        name: "PregnancyStory",
        tagline: "Беременность",
        text: "Между 28-й и 34-й неделей. Студия, улица или ваш дом.",
      },
      {
        name: "BirthStory",
        tagline: "Съёмка родов",
        text: "Роды, бережно сохранённые. Готовность с 37-й недели.",
      },
      {
        name: "LoveStory",
        tagline: "Пары",
        text: "Для двоих, у которых есть друг друг — в вашем месте в Хемнице.",
      },
      {
        name: "YourStory",
        tagline: "Индивидуальная фотография",
        text: "Портрет, любовь к себе, бизнес: ваша собственная история.",
      },
    ],
  },
});
strings.setLanguage(detectLang());

/**
 * A compact teaser of the five stories on the landing page. The full copy
 * lives on /leistungen — the teaser only links there, so the two pages do not
 * compete for the same text.
 */
export function StoriesTeaser() {
  const lang = detectLang();
  const href = langPath("/leistungen", lang);

  return (
    <section
      id="stories"
      aria-labelledby="stories-heading"
      className="portfolio-stories"
    >
      <div className="portfolio-stories-inner">
        <BlurFade>
          <h2 id="stories-heading">
            {strings.heading} <em>{strings.subtitle}</em>
          </h2>
        </BlurFade>

        <div className="portfolio-stories-grid">
          {strings.stories.map((story, index) => (
            <BlurFade key={story.name} delay={index * 0.06}>
              <a
                className="portfolio-story-card"
                href={`${href}#${story.name.toLowerCase()}`}
              >
                <span className="portfolio-story-tagline">{story.tagline}</span>
                <span className="portfolio-story-name">{story.name}</span>
                <span className="portfolio-story-text">{story.text}</span>
                <span className="portfolio-story-more">
                  {strings.more} <ArrowUpRight className="size-3.5" aria-hidden />
                </span>
              </a>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
