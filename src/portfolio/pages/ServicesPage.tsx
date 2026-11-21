import LocalizedStrings from "react-localization";
import { StoryCallToAction, StoryShell } from "./StoryShell";
import { StoryGallery, type StoryKey } from "../StoryGallery";
import { detectLang } from "../lang";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../config";

const strings = new LocalizedStrings({
  de: {
    eyebrow: "Leistungen · Chemnitz",
    title: "Deine Story.",
    subtitle: "Fünf Wege, sie festzuhalten.",
    lead: "Familien-, Babybauch-, Geburts- und Paarfotografie in Chemnitz: Jede Geschichte ist anders, deshalb gibt es bei mir nicht das eine Shooting. Wir schauen im Gespräch, welche Story zu euch passt — und wie viel Zeit sie braucht.",
    storiesLabel: "Die Stories",
    factsLabels: {
      forWhom: "Für wen",
      duration: "Dauer",
      where: "Wo",
      result: "Ergebnis",
    },
    stories: [
      {
        name: "FamilyStory",
        key: "familystory",
        tagline: "Familienreportage",
        text: "Für Familien mit Kindern, die keine gestellten Fotos wollen. Ich begleite euch beim Toben, Kuscheln und Quatschmachen — draußen in Chemnitz oder bei euch zu Hause. Auch als Homestory: der ganz normale Morgen, das Bad, das Einschlafen. Familienshooting in Chemnitz, so wie euer Alltag wirklich ist.",
        forWhom: "Familien mit Kindern jeden Alters",
        duration: "etwa 60–90 Minuten",
        where: "draußen in Chemnitz oder bei euch zu Hause",
        result: "Online-Galerie nach 1–2 Wochen",
      },
      {
        name: "PregnancyStory",
        key: "pregnancystory",
        tagline: "Babybauch",
        text: "Der Bauch ist rund und du fühlst dich wohl: Zwischen der 28. und 34. Schwangerschaftswoche ist der ideale Zeitpunkt für dein Babybauchshooting in Chemnitz. Wir fotografieren im Studio, draußen oder bei dir zu Hause — mit Partner, allein oder beides.",
        forWhom: "Schwangere ab der 28. Woche, mit oder ohne Partner",
        duration: "etwa 60 Minuten",
        where: "Studio, draußen oder bei dir zu Hause",
        result: "Outfit-Beratung vorher, Online-Galerie nach 1–2 Wochen",
      },
      {
        name: "BirthStory",
        key: "birthstory",
        tagline: "Geburtsfotografie",
        text: "Die intensivsten Stunden eures Lebens, diskret festgehalten. Geburtsfotografie in Chemnitz beginnt bei mir mit einem Kennenlernen ab der 20. Schwangerschaftswoche. Ab der 37. Woche bin ich in Rufbereitschaft, komme in die Klinik, ins Geburtshaus oder zu euch nach Hause und bleibe 2–3 Stunden nach der Geburt. Niemand muss für die Kamera etwas tun.",
        forWhom: "Eltern, die die Geburt dokumentiert haben möchten",
        duration: "Buchung ab der 20. SSW, Rufbereitschaft ab der 37. SSW",
        where: "Klinik, Geburtshaus oder Hausgeburt in Chemnitz und Umgebung",
        result: "Online-Galerie nach 2–3 Wochen",
      },
      {
        name: "LoveStory",
        key: "lovestory",
        tagline: "Paare",
        text: "Für zwei, die sich haben. Kein steifes Ineinanderstehen, sondern das, was zwischen euch passiert. Ein Paarshooting in Chemnitz, drinnen oder draußen, an eurem Lieblingsort oder dort, wo eure Geschichte angefangen hat.",
        forWhom: "Paare, Verliebte, Verlobte und frisch Verheiratete",
        duration: "etwa 45–60 Minuten",
        where: "an eurem Wunschort in Chemnitz",
        result: "Online-Galerie nach 1–2 Wochen",
      },
      {
        name: "YourStory",
        key: "yourstory",
        tagline: "Individuelle Fotografie",
        text: "Alles, was sonst nirgends hineinpasst: Portrait, Selbstliebe, Freundschaften, Business oder ein besonderer Anlass. Du erzählst mir, was du festhalten willst — ich baue die Story darum. Individuelle Fotografie in Chemnitz, ganz nach deinem Tempo.",
        forWhom: "Menschen mit einer eigenen Idee",
        duration: "nach Absprache",
        where: "Studio, draußen oder bei dir",
        result: "Online-Galerie nach 1–2 Wochen",
      },
    ],
    processTitle: "So läuft es ab",
    process: [
      {
        title: "Wir lernen uns kennen",
        text: "Kurze Nachricht, kurzes Gespräch — wir spüren, ob es passt. Ganz ohne Druck.",
      },
      {
        title: "Wir planen deine Story",
        text: "Ort, Zeit, Kleidung, Ablauf. Du musst nichts vorbereiten, außer da zu sein.",
      },
      {
        title: "Wir fotografieren",
        text: "Ich begleite, du lebst. Kein Posieren, kein Zeitdruck.",
      },
      {
        title: "Deine Galerie",
        text: "Nach 1–2 Wochen bekommst du deine Bilder in voller Auflösung als Online-Galerie.",
      },
    ],
    goodToKnowTitle: "Gut zu wissen",
    goodToKnow: [
      "Die professionelle Bearbeitung ist bei jeder Story inklusive.",
      "Deine Bilder bekommst du als Online-Galerie in voller Auflösung.",
      "Anfahrt in Chemnitz und Umgebung bis etwa 30 km.",
      "Outfit-Beratung vor dem Shooting, wenn du möchtest.",
    ],
    ctaHeading: "Preise? Jede Story ist anders.",
    ctaText:
      "Deshalb gibt es keine Liste. Schreib mir auf WhatsApp, erzähl kurz, was du vorhast — du bekommst ein passendes Angebot.",
    ctaWhatsapp: "Story besprechen",
  },
  ru: {
    eyebrow: "Услуги · Хемниц",
    title: "Твоя история.",
    subtitle: "Пять способов её сохранить.",
    lead: "Семейная, беременная, родовая и парная фотография в Хемнице: каждая история особенная, поэтому у меня нет одной универсальной съёмки. Мы обсудим, какая история подойдёт именно вам — и сколько времени ей нужно.",
    storiesLabel: "Истории",
    factsLabels: {
      forWhom: "Для кого",
      duration: "Длительность",
      where: "Где",
      result: "Результат",
    },
    stories: [
      {
        name: "FamilyStory",
        key: "familystory",
        tagline: "Семейная история",
        text: "Для семей с детьми, которым не нужны постановочные фото. Я иду рядом, пока вы бегаете, обнимаетесь и дурачитесь — на улице в Хемнице или у вас дома. В том числе как домашняя история: самое обычное утро, ванна, засыпание. Семейная съёмка в Хемнице — такая, какая есть ваша жизнь.",
        forWhom: "Семьи с детьми любого возраста",
        duration: "около 60–90 минут",
        where: "на улице в Хемнице или у вас дома",
        result: "онлайн-галерея через 1–2 недели",
      },
      {
        name: "PregnancyStory",
        key: "pregnancystory",
        tagline: "Беременность",
        text: "Живот уже округлился, и вы чувствуете себя хорошо: лучшее время для съёмки беременности в Хемнице — между 28-й и 34-й неделей. Снимаем в студии, на улице или у вас дома — с партнёром, одна или оба варианта.",
        forWhom: "Беременные с 28-й недели, с партнёром или без",
        duration: "около 60 минут",
        where: "студия, улица или ваш дом",
        result: "консультация по одежде заранее, галерея через 1–2 недели",
      },
      {
        name: "BirthStory",
        key: "birthstory",
        tagline: "Съёмка родов",
        text: "Самые интенсивные часы вашей жизни, бережно сохранённые. Съёмка родов в Хемнице начинается со знакомства с 20-й недели беременности. С 37-й недели я на связи, приезжаю в клинику, роддом или к вам домой и остаюсь на 2–3 часа после рождения. Никому не нужно ничего делать для камеры.",
        forWhom: "Родители, которые хотят сохранить роды",
        duration: "запись с 20-й недели, готовность с 37-й недели",
        where: "клиника, роддом или домашние роды в Хемнице и окрестностях",
        result: "онлайн-галерея через 2–3 недели",
      },
      {
        name: "LoveStory",
        key: "lovestory",
        tagline: "Пары",
        text: "Для двоих, у которых есть друг друг. Не застывшие позы, а то, что происходит между вами. Съёмка пары в Хемнице — в помещении или на улице, в вашем любимом месте или там, где началась ваша история.",
        forWhom: "Пары, влюблённые, помолвленные и молодожёны",
        duration: "около 45–60 минут",
        where: "в выбранном вами месте в Хемнице",
        result: "онлайн-галерея через 1–2 недели",
      },
      {
        name: "YourStory",
        key: "yourstory",
        tagline: "Индивидуальная фотография",
        text: "Всё, что не помещается в другие истории: портрет, любовь к себе, дружба, бизнес или особый повод. Вы рассказываете, что хотите сохранить, — я строю историю вокруг этого. Индивидуальная фотография в Хемнице, в вашем темпе.",
        forWhom: "Люди со своей идеей",
        duration: "по договорённости",
        where: "студия, улица или у вас",
        result: "онлайн-галерея через 1–2 недели",
      },
    ],
    processTitle: "Как всё проходит",
    process: [
      {
        title: "Мы знакомимся",
        text: "Короткое сообщение, короткий разговор — понимаем, подходим ли друг другу. Без давления.",
      },
      {
        title: "Планируем вашу историю",
        text: "Место, время, одежда, ход съёмки. Вам не нужно ничего готовить, кроме себя.",
      },
      {
        title: "Снимаем",
        text: "Я иду рядом, вы живёте. Никаких поз и спешки.",
      },
      {
        title: "Ваша галерея",
        text: "Через 1–2 недели вы получаете фото в полном разрешении в онлайн-галерее.",
      },
    ],
    goodToKnowTitle: "Полезно знать",
    goodToKnow: [
      "Профессиональная обработка входит в каждую историю.",
      "Фото вы получаете в онлайн-галерее в полном разрешении.",
      "Выезд по Хемницу и окрестностям до 30 км.",
      "Консультация по одежде перед съёмкой, если хотите.",
    ],
    ctaHeading: "Цены? Каждая история особенная.",
    ctaText:
      "Поэтому списка цен нет. Напишите в WhatsApp, коротко расскажите, что задумали, — получите подходящее предложение.",
    ctaWhatsapp: "Обсудить историю",
  },
});

export default function ServicesPage() {
  strings.setLanguage(detectLang());

  return (
    <StoryShell>
      <article className="story-article">
        <header className="story-intro">
          <p className="story-eyebrow">{strings.eyebrow}</p>
          <h1>
            {strings.title} <em>{strings.subtitle}</em>
          </h1>
          <p className="story-lead">{strings.lead}</p>
        </header>

        <section className="story-section" aria-label={strings.storiesLabel}>
          <div className="story-cards">
            {strings.stories.map((story) => (
              <section
                key={story.name}
                id={story.name.toLowerCase()}
                className="story-card"
              >
                <p className="story-card-tagline">{story.tagline}</p>
                <h2>{story.name}</h2>
                <p>{story.text}</p>
                <dl className="story-facts">
                  <div>
                    <dt>{strings.factsLabels.forWhom}</dt>
                    <dd>{story.forWhom}</dd>
                  </div>
                  <div>
                    <dt>{strings.factsLabels.duration}</dt>
                    <dd>{story.duration}</dd>
                  </div>
                  <div>
                    <dt>{strings.factsLabels.where}</dt>
                    <dd>{story.where}</dd>
                  </div>
                  <div>
                    <dt>{strings.factsLabels.result}</dt>
                    <dd>{story.result}</dd>
                  </div>
                </dl>
                <StoryGallery story={story.key as StoryKey} label={`${story.name} — ${story.tagline}`} />
              </section>
            ))}
          </div>
        </section>

        <section className="story-section" aria-labelledby="process-heading">
          <h2 id="process-heading">{strings.processTitle}</h2>
          <ol className="story-steps">
            {strings.process.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="story-section" aria-labelledby="good-heading">
          <h2 id="good-heading">{strings.goodToKnowTitle}</h2>
          <ul className="story-list">
            {strings.goodToKnow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
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
