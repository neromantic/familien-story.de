import LocalizedStrings from "react-localization";
import { StoryCallToAction, StoryShell } from "./StoryShell";
import { detectLang } from "../lang";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../config";
import aboutMe from "@/assets/images/about-me.webp";

const strings = new LocalizedStrings({
  de: {
    eyebrow: "Fotografin in Chemnitz",
    title: "Über mich",
    lead: "Ich bin Kateryna — Fotografin in Chemnitz. Ich erzähle Geschichten: FamilyStory, PregnancyStory, BirthStory, LoveStory und YourStory. Vom ersten Bauchfoto über die Geburt bis zum ganz normalen Familienmorgen.",
    portraitAlt:
      "Kateryna Hohol, Familien- und Geburtsfotografin in Chemnitz, mit ihrer Kamera",
    journeyTitle: "Mein Weg",
    journey: [
      "Angefangen hat alles mit meiner Tochter. Winzige Hände, der erste Blick, dieses Gefühl, dass von jetzt auf gleich alles anders ist. Ich wollte diese Stunden nicht nur erinnern, sondern wieder sehen können.",
      "Aus dem Wunsch, den eigenen Moment festzuhalten, wurde eine Leidenschaft — und mit der Zeit mein Beruf. Heute begleite ich Familien in Chemnitz und Umgebung durch genau diese Stunden: die leisen, die lauten, die man später nicht mehr hergeben will.",
    ],
    workTitle: "Wie ich arbeite",
    work: [
      "Ich stelle nicht. Ich begleite.",
      "Niemand muss wissen, wohin mit den Händen, und niemand muss für die Kamera lächeln. Ich gehe mit, warte ab, lasse Raum. Die besten Bilder entstehen oft in den Pausen — wenn ein Kind plötzlich losrennt oder sich an deine Schulter lehnt.",
      "Bei einer BirthStory bin ich so unauffällig wie möglich. Die Geburt gehört euch, nicht der Kamera.",
    ],
    valuesTitle: "Was mir wichtig ist",
    values: [
      "Echte Nähe statt gestellter Lächeln.",
      "Natürliches Licht, wo es geht.",
      "Zeit lassen — kein Shooting im Minutenraster.",
      "Diskretion, besonders bei Geburt und Homestory.",
    ],
    placesTitle: "Wo ich fotografiere",
    places: [
      "Zu Hause in Chemnitz und in der Umgebung: im Küchwald, am Schlossteich, im Botanischen Garten, bei euch in der Wohnung oder dort, wo eure Geschichte spielt.",
      "Für eine BirthStory komme ich in die Klinik, ins Geburtshaus oder zu euch nach Hause.",
      "Anfahrt: Chemnitz und Umgebung bis etwa 30 km.",
    ],
    factsTitle: "Kurz & knapp",
    facts: [
      { label: "Name", value: "Kateryna Hohol" },
      { label: "Ort", value: "Chemnitz, Sachsen" },
      { label: "Sprachen", value: "Deutsch, Russisch" },
      {
        label: "Schwerpunkt",
        value: "FamilyStory, PregnancyStory, BirthStory, LoveStory, YourStory",
      },
      { label: "Ergebnis", value: "Online-Galerie in 1–2 Wochen" },
    ],
    ctaHeading: "Erzähl mir von deiner Story.",
    ctaText:
      "Schreib mir auf WhatsApp, ganz unverbindlich. Wir schauen gemeinsam, welche Story zu euch passt.",
    ctaWhatsapp: "Auf WhatsApp schreiben",
  },
  ru: {
    eyebrow: "Фотограф в Хемнице",
    title: "Обо мне",
    lead: "Я Катерина — фотограф в Хемнице. Я рассказываю истории: FamilyStory, PregnancyStory, BirthStory, LoveStory и YourStory. От первого фото живота через роды до самого обычного семейного утра.",
    portraitAlt:
      "Катерина Гоголь, семейный фотограф и фотограф родов в Хемнице, с камерой",
    journeyTitle: "Мой путь",
    journey: [
      "Всё началось с моей дочери. Крохотные ручки, первый взгляд, чувство, что с этой минуты всё иначе. Мне хотелось не просто помнить эти часы, а снова их видеть.",
      "Из желания сохранить собственный момент родилась страсть — а со временем и профессия. Сегодня я сопровождаю семьи в Хемнице и окрестностях через те самые часы: тихие, громкие, те, которые потом уже не отдашь.",
    ],
    workTitle: "Как я работаю",
    work: [
      "Я не ставлю кадры. Я иду рядом.",
      "Никому не нужно знать, куда деть руки, и никто не должен улыбаться в камеру. Я иду следом, жду, оставляю место. Лучшие кадры часто рождаются в паузах — когда ребёнок вдруг бежит или прижимается к плечу.",
      "На BirthStory я стараюсь быть как можно незаметнее. Роды принадлежат вам, а не камере.",
    ],
    valuesTitle: "Что для меня важно",
    values: [
      "Настоящая близость вместо поставленных улыбок.",
      "Естественный свет, где это возможно.",
      "Не спешить — никакой съёмки по минутам.",
      "Деликатность, особенно при родах и домашних историях.",
    ],
    placesTitle: "Где я снимаю",
    places: [
      "В Хемнице и окрестностях: в Кюхвальде, у Шлосстайха, в Ботаническом саду, у вас дома или там, где живёт ваша история.",
      "На BirthStory я приезжаю в клинику, роддом или к вам домой.",
      "Выезд: Хемниц и окрестности до 30 км.",
    ],
    factsTitle: "Коротко",
    facts: [
      { label: "Имя", value: "Катерина Гоголь" },
      { label: "Город", value: "Хемниц, Саксония" },
      { label: "Языки", value: "Немецкий, русский" },
      {
        label: "Специализация",
        value: "FamilyStory, PregnancyStory, BirthStory, LoveStory, YourStory",
      },
      { label: "Результат", value: "Онлайн-галерея через 1–2 недели" },
    ],
    ctaHeading: "Расскажите мне свою историю.",
    ctaText:
      "Напишите в WhatsApp, без обязательств. Вместе посмотрим, какая история подойдёт именно вам.",
    ctaWhatsapp: "Написать в WhatsApp",
  },
});

export default function AboutPage() {
  strings.setLanguage(detectLang());

  return (
    <StoryShell>
      <article className="story-article">
        <header className="story-intro">
          <p className="story-eyebrow">{strings.eyebrow}</p>
          <h1>{strings.title}</h1>
          <p className="story-lead">{strings.lead}</p>
        </header>

        <div className="story-portrait">
          <img
            src={aboutMe}
            alt={strings.portraitAlt}
            width="900"
            height="1100"
            loading="eager"
          />
        </div>

        <section className="story-section" aria-labelledby="journey-heading">
          <h2 id="journey-heading">{strings.journeyTitle}</h2>
          {strings.journey.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </section>

        <section className="story-section" aria-labelledby="work-heading">
          <h2 id="work-heading">{strings.workTitle}</h2>
          {strings.work.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </section>

        <section className="story-section" aria-labelledby="values-heading">
          <h2 id="values-heading">{strings.valuesTitle}</h2>
          <ul className="story-list">
            {strings.values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </section>

        <section className="story-section" aria-labelledby="places-heading">
          <h2 id="places-heading">{strings.placesTitle}</h2>
          {strings.places.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </section>

        <section className="story-section" aria-labelledby="facts-heading">
          <h2 id="facts-heading">{strings.factsTitle}</h2>
          <dl className="story-facts">
            {strings.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <StoryCallToAction
          heading={strings.ctaHeading}
          text={strings.ctaText}
          whatsapp={strings.ctaWhatsapp}
          instagram={INSTAGRAM_HANDLE}
          instagramUrl={INSTAGRAM_URL}
        />
      </article>
    </StoryShell>
  );
}
