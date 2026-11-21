/**
 * Content-Sektion für SEO-optimierte Blog-Artikel
 * 
 * Diese Sektion zeigt SEO-optimierte Inhalte für:
 * - Lokale Keywords (Chemnitz, Sachsen)
 * - Service-Keywords (Familienfotografie, Geburtsfotografie)
 * - FAQ-Content für Featured Snippets
 */

import LocalizedStrings from "react-localization";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { detectLang } from "./lang";

const strings = new LocalizedStrings({
  de: {
    heading: "Ratgeber & Tipps",
    subtitle: "Alles was du über Familienfotografie wissen musst",
    
    // Blog-Artikel für lokale SEO
    articles: [
      {
        title: "Familienfotografie in Chemnitz — Der komplette Guide 2026",
        excerpt: "Die besten Locations für Familienfotos in Chemnitz: Von der Küchwaldsee-Promenade über den Schlossteich bis zu gemütlichen Indoor-Studios. Plus: Tipps für das perfekte Shooting mit Kindern.",
        category: "Location Guide",
        readTime: "5 Min.",
        content: `
## Die besten Locations für Familienfotos in Chemnitz

Chemnitz bietet wunderschöne Kulissen für Familienfotos. Hier sind meine Top-Empfehlungen:

### 1. Küchwaldsee-Promenade
- **Besonderheit:** Wasserlandschaft mit Brücke
- **Beste Zeit:** Goldene Stunde (1-2 Stunden vor Sonnenuntergang)
- **Geeignet für:** Alle Jahreszeiten

### 2. Schlossteich Chemnitz
- **Besonderheit:** Romantische Parklandschaft
- **Beste Zeit:** Frühling (Kirschblüte) und Herbst (Laubfärbung)
- **Geeignet für:** Paare, Familien mit kleinen Kindern

### 3. Botanischer Garten Chemnitz
- **Besonderheit:** Exotische Pflanzen, Gewächshäuser
- **Beste Zeit:** Ganzjährig (auch bei Regen)
- **Geeignet für:** Familien, die Natur lieben

### 4. Industrie-Kultur (Sächsches Industriemuseum)
- **Besonderheit:** Urbane, industrielle Kulisse
- **Beste Zeit:** Bei bewölktem Himmel
- **Geeignet für:** Teenager, moderne Portraits

## Tipps für das perfekte Familien-Shooting

1. **Kleidung:** Koordinierte Farben, aber nicht zu matchy-matchy
2. **Timing:** Plane nach dem Mittagsschlaf der Kinder
3. **Snacks:** Hab immer Lieblingssnacks dabei
4. **Geduld:** Nimm dir Zeit, kein Stress

## Kosten für Familienfotografie in Chemnitz

Die Preise variieren je nach Fotograf und Leistungspaket:
- **Mini-Session (30 Min.):** ab 150€
- **Standard-Session (60 Min.):** ab 250€
- **Premium-Session (90 Min. + Online-Galerie):** ab 350€

Bei Familien Story sind alle digitalen Bilder in hoher Auflösung enthalten.
        `,
      },
      {
        title: "Geburtsfotografie in Chemnitz — Dein Birth Story Guide",
        excerpt: "Alles über Geburtsfotografie: Was kostet es? Wann sollte ich buchen? Was passiert während der Geburt? Plus: Erfahrungsberichte von Chemnitzer Familien.",
        category: "Geburtsfotografie",
        readTime: "7 Min.",
        content: `
## Was ist Geburtsfotografie?

Geburtsfotografie dokumentiert die intensivsten Stunden deines Lebens: die Geburt deines Kindes. Von den ersten Wehen bis zum ersten Schrei — ich halte jeden Moment diskret und einfühlsam fest.

## Warum Birth Story Fotografie?

Die Geburt ist ein einmaliges Ereignis. Dein Partner kann nicht alles sehen, die Hebamme ist beschäftigt. Ich bin da, um die Momente festzuhalten, die ihr nie vergessen werdet:

- Der erste Blick auf euer Baby
- Die ersten Berührungen
- Die Erleichterung und das Glück nach der Geburt
- Die ersten Stillversuche

## Wann sollte ich buchen?

**Empfehlung:** Ab der 20. SSW (Schwangerschaftswoche)

Warum so früh? Ich nehme nur begrenzte Geburten pro Monat an, um immer verfügbar zu sein. Ein persönliches Kennenlernen ist wichtig für das Vertrauen.

## Was kostet Geburtsfotografie in Chemnitz?

- **Basis-Paket (Geburt + 20 bearbeitete Bilder):** 450€
- **Standard-Paket (Geburt + 50 bearbeitete Bilder + Online-Galerie):** 650€
- **Premium-Paket (Geburt + alle Bilder + Fotobuch):** 850€

## Ablauf einer Geburtsfotografie

### 1. Kennenlernen (ab 20. SSW)
Wir treffen uns in meinem Studio in Chemnitz oder bei euch zu Hause. Ihr erzählt mir von euren Wünschen, ich zeige euch meine Arbeit.

### 2. Bereitschaftsphase (ab 37. SSW)
Ab der 37. Woche bin ich in ständiger Bereitschaft. Mein Handy ist 24/7 eingeschaltet.

### 3. Die Geburt
Sobald die Wehen regelmäßig sind (alle 5-7 Minuten), ruft ihr mich. Ich komme ins Geburtshaus/Klinik oder zu euch nach Hause (bei Hausgeburt).

### 4. Die ersten Stunden
Ich bleibe 2-3 Stunden nach der Geburt, um die ersten Momente als Familie festzuhalten: das erste Stillen, das erste Bad, die ersten Besuche der Geschwister.

### 5. Bildauswahl (nach 1-2 Wochen)
Ihr erhaltet eine Online-Galerie mit allen Bildern. Ihr wählt eure Favoriten aus, ich bearbeite sie in hoher Qualität.

## Erfahrungsberichte

*"Die besten 650€, die wir ausgegeben haben. Die Bilder sind unbezahlbar."* — Sarah & Tom, Chemnitz

*"Anfangs waren wir skeptisch, aber Kateryna war so diskret, dass wir sie kaum wahrgenommen haben."* — Lisa & Michael, Freiberg
        `,
      },
      {
        title: "Babybauch-Shooting in Chemnitz — Tipps & Inspiration",
        excerpt: "Wann ist der beste Zeitpunkt? Was soll ich anziehen? Indoor oder Outdoor? Alle Tipps für dein perfektes Schwangerschaftsshooting in Chemnitz.",
        category: "Schwangerschaft",
        readTime: "4 Min.",
        content: `
## Der beste Zeitpunkt für dein Babybauch-Shooting

**Ideale Zeit:** 28.-34. Schwangerschaftswoche

Warum? Dein Bauch ist schon schön rund, aber du bist noch nicht zu schwerfällig. Nach der 34. Woche können Füße schon dick sein und du bist schneller müde.

## Was soll ich anziehen?

### Option 1: Fließende Kleider
- Betont die Silhouette
- Wirkt elegant und weiblich
- Geeignet für Outdoor und Studio

### Option 2: Jeans + weißes Top
- Lässig und natürlich
- Der Fokus liegt auf dem Bauch
- Perfekt für urbane Locations

### Option 3: Nackt-Studie (nur Studio)
- Sehr intim und persönlich
- Nur mit Partner oder allein
- Diskret mit Tüchern drapiert

## Indoor vs. Outdoor

### Outdoor-Shooting in Chemnitz
**Vorteile:**
- Natürliche Lichtverhältnisse
- Vielfältige Kulissen
- Mehr Bewegungsfreiheit

**Locations:**
- Küchwaldsee
- Schlossteich-Park
- Stadthalle Chemnitz (Architektur)

### Studio-Shooting
**Vorteile:**
- Wetterunabhängig
- Privatsphäre
- Kontrollierte Lichtverhältnisse

**Inklusive:**
- Garderobe zur Auswahl
- Professionelles Licht
- Warme Atmosphäre

## Preise für Babybauch-Shootings

- **Mini-Session (30 Min., 10 Bilder):** 150€
- **Standard (60 Min., 30 Bilder + Online-Galerie):** 250€
- **Premium (90 Min., alle Bilder + Fotobuch):** 350€

## Mit oder ohne Partner?

Beides ist wunderschön! Mit Partner:
- Zeigt die Verbindung
- Gemeinsame Erinnerung
- Er kann den Bauch halten, streicheln

Allein:
- Fokus auf dich und dein Baby
- Intime Selbstliebe
- Auch sehr kraftvoll

Tipp: Buche beides! Erst ein paar Bilder allein, dann kommt der Partner dazu.
        `,
      },
    ],
    
    // FAQ für Featured Snippets
    faq: [
      {
        question: "Was kostet ein Fotoshooting in Chemnitz?",
        answer: "Ein Familien-Shooting in Chemnitz kostet zwischen 150€ (Mini-Session, 30 Min.) und 350€ (Premium-Session, 90 Min. mit allen Bildern). Geburtsfotografie startet bei 450€, Babybauch-Shootings bei 150€. Alle Preise inkludieren die professionelle Bearbeitung und eine Online-Galerie."
      },
      {
        question: "Wie lange im Voraus muss ich buchen?",
        answer: "Für Familien- und Babybauch-Shootings empfehle ich 2-4 Wochen im Voraus. Für Geburtsfotografie solltest du dich ab der 20. Schwangerschaftswoche melden, da ich nur begrenzte Geburten pro Monat begleite."
      },
      {
        question: "Was passiert bei schlechtem Wetter?",
        answer: "Bei Regen weichen wir auf Indoor-Locations aus (mein Studio in Chemnitz oder bei euch zu Hause). Alternativ verschieben wir den Termin. Flexibilität ist wichtig, besonders bei Shootings mit Kindern."
      },
      {
        question: "Kann ich meine Haustiere mitbringen?",
        answer: "Ja, sehr gerne! Haustiere sind Teil der Familie. Bitte sag mir vorher Bescheid, damit ich die Location entsprechend wählen kann (hundefreundlich, ausreichend Platz)."
      },
      {
        question: "Wie lange dauert es bis ich meine Bilder bekomme?",
        answer: "Du erhältst deine fertig bearbeiteten Bilder in 1-2 Wochen als Online-Galerie in voller Auflösung. Bei Geburtsfotografie kann es aufgrund der intensiven Bearbeitung 2-3 Wochen dauern."
      },
      {
        question: "Bietest du auch Hausbesuche an?",
        answer: "Ja, ich komme gerne zu dir nach Hause oder an einen Wunschort in Chemnitz und Umgebung (bis 30 km kostenlos, danach 0,50€/km). Besonders für Newborn-Shootings ist Zuhause oft die entspannteste Option."
      },
    ],
  },
  ru: {
    heading: "Советы и руководства",
    subtitle: "Всё, что нужно знать о семейной фотографии",
    
    articles: [
      {
        title: "Семейная фотография в Кемнице — полный гид 2026",
        excerpt: "Лучшие локации для семейных фото в Кемнице: от набережной Küchwaldsee до парка Шлосстайх. Плюс: советы для идеальной съёмки с детьми.",
        category: "Гид по локациям",
        readTime: "5 мин.",
        content: `
## Лучшие локации для семейных фото в Кемнице

Кемница предлагает прекрасные декорации для семейных фото. Мои топ-рекомендации:

### 1. Набережная Küchwaldsee
- **Особенность:** Водный пейзаж с мостиком
- **Лучшее время:** Золотой час (за 1-2 часа до заката)
- **Подходит для:** Все времена года

### 2. Парк Шлосстайх
- **Особенность:** Романтичный парковый пейзаж
- **Лучшее время:** Весна (цветение вишни) и осень (окрашенные листья)
- **Подходит для:** Пары, семьи с маленькими детьми

### 3. Ботанический сад Кемницы
- **Особенность:** Экзотические растения, оранжереи
- **Лучшее время:** Круглый год (даже под дождём)
- **Подходит для:** Семей, которые любят природу

### 4. Индустриальная культура (Саксонский музей индустрии)
- **Особенность:** Городская, индустриальная декорация
- **Лучшее время:** В пасмурный день
- **Подходит для:** Подростков, современных портретов

## Советы для идеальной семейной съёмки

1. **Одежда:** Координированные цвета, но не слишком одинаковые
2. **Время:** Планируйте после дневного сна детей
3. **Перекусы:** Всегда берите любимые перекусы
4. **Терпение:** Не торопитесь, без стресса

## Цены на семейную фотографию в Кемнице

Цены варьируются в зависимости от фотографа и пакета услуг:
- **Мини-сессия (30 мин.):** от 150€
- **Стандарт (60 мин.):** от 250€
- **Премиум (90 мин. + онлайн-галерея):** от 350€

В Familien Story все цифровые фотографии в высоком разрешении включены.
        `,
      },
      {
        title: "Фотосъёмка родов в Кемнице — ваш гид Birth Story",
        excerpt: "Всё о фотосъёмке родов: Сколько это стоит? Когда записаться? Что происходит во время родов? Плюс: отзывы кемницких семей.",
        category: "Родовая фотография",
        readTime: "7 мин.",
        content: `
## Что такое фотосъёмка родов?

Фотосъёмка родов документирует самые интенсивные часы вашей жизни: рождение вашего ребёнка. От первых схваток до первого крика — я запечатлеваю каждый момент деликатно и чутко.

## Почему Birth Story фотография?

Рождение — это уникальное событие. Ваш партнёр не может видеть всё, акушерка занята. Я здесь, чтобы запечатлеть моменты, которые вы никогда не забудете:

- Первый взгляд на вашего малыша
- Первые прикосновения
- Облегчение и счастье после рождения
- Первые попытки кормления

## Когда записаться?

**Рекомендация:** С 20-й недели беременности

Почему так рано? Я принимаю ограниченное количество родов в месяц, чтобы всегда быть доступной. Личное знакомство важно для доверия.

## Сколько стоит фотосъёмка родов в Кемнице?

- **Базовый пакет (роды + 20 обработанных фото):** 450€
- **Стандартный пакет (роды + 50 обработанных фото + онлайн-галерея):** 650€
- **Премиум пакет (роды + все фото + фотокнига):** 850€

## Ход фотосъёмки родов

### 1. Знакомство (с 20-й недели)
Мы встречаемся в моей студии в Кемнице или у вас дома. Вы рассказываете о своих желаниях, я показываю свою работу.

### 2. Фаза готовности (с 37-й недели)
С 37-й недели я в постоянной готовности. Мой телефон включён 24/7.

### 3. Роды
Как только схватки регулярные (каждые 5-7 минут), вы звоните мне. Я приезжаю в роддом/дом или к вам домой (при домашних родах).

### 4. Первые часы
Я остаюсь на 2-3 часа после рождения, чтобы запечатлеть первые моменты как семья: первое кормление, первое купание, первые визиты братьев и сестёр.

### 5. Выбор фото (через 1-2 недели)
Вы получаете онлайн-галерею со всеми фото. Вы выбираете любимые, я обрабатываю их в высоком качестве.

## Отзывы

*"Лучшие 650€, которые мы потратили. Фото бесценны."* — Сара и Том, Кемница

*"Сначала мы сомневались, но Катерина была так деликатна, что мы почти её не замечали."* — Лиза и Михаэль, Фрайберг
        `,
      },
      {
        title: "Фотосъёмка беременных в Кемнице — советы и вдохновение",
        excerpt: "Когда лучший момент? Что надеть? В помещении или на улице? Все советы для вашей идеальной фотосъёмки беременных в Кемнице.",
        category: "Беременность",
        readTime: "4 мин.",
        content: `
## Лучший момент для фотосъёмки беременных

**Идеальное время:** 28.-34. неделя беременности

Почему? Ваш живот уже красиво округлён, но вы ещё не слишком тяжёлая. После 34-й недели ноги могут быть уже отёчными, и вы быстрее устаёте.

## Что мне надеть?

### Вариант 1: Струящиеся платья
- Подчёркивает силуэт
- Выглядит элегантно и женственно
- Подходит для улицы и студии

### Вариант 2: Джинсы + белый топ
- Непринуждённо и естественно
- Фокус на животе
- Идеально для городских локаций

### Вариант 3: Обнажённая студия (только студия)
- Очень интимно и лично
- Только с партнёром или одной
- Дискретно с draped тканями

## В помещении или на улице

### Фотосъёмка на улице в Кемнице
**Преимущества:**
- Естественное освещение
- Разнообразные декорации
- Больше свободы движений

**Локации:**
- Küchwaldsee
- Парк Шлосстайх
- Ратуша Кемница (архитектура)

### Студийная съёмка
**Преимущества:**
- Независимо от погоды
- Приватность
- Контролируемое освещение

**Включено:**
- Гардероб на выбор
- Профессиональный свет
- Тёплая атмосфера

## Цены на фотосъёмку беременных

- **Мини-сессия (30 мин., 10 фото):** 150€
- **Стандарт (60 мин., 30 фото + онлайн-галерея):** 250€
- **Премиум (90 мин., все фото + фотокнига):** 350€

## С партнёром или без?

Оба варианта прекрасны! С партнёром:
- Показывает связь
- Общая память
- Он может держать живот, гладить

Одна:
- Фокус на вас и вашем малыше
- Интимная любовь к себе
- Также очень сильно

Совет: Закажите оба варианта! Сначала несколько фото в одиночку, потом присоединяется партнёр.
        `,
      },
    ],
    
    // FAQ для Featured Snippets
    faq: [
      {
        question: "Сколько стоит фотосессия в Кемнице?",
        answer: "Семейная фотосессия в Кемнице стоит от 150€ (мини-сессия, 30 мин.) до 350€ (премиум-сессия, 90 мин. со всеми фото). Родовая фотография от 450€, фотосъёмка беременных от 150€. Все цены включают профессиональную обработку и онлайн-галерею."
      },
      {
        question: "За сколько времени нужно записаться?",
        answer: "Для семейных и беременных фотосессий рекомендую за 2-4 недели. Для родовой фотографии записывайтесь с 20-й недели беременности, так как я принимаю ограниченное количество родов в месяц."
      },
      {
        question: "Что делать при плохой погоде?",
        answer: "В дождь мы переходим в помещение (моя студия в Кемнице или к вам домой). Или переносим съёмку. Гибкость важна, особенно при съёмках с детьми."
      },
      {
        question: "Можно ли привести домашнее животное?",
        answer: "Да, конечно! Домашние животные — часть семьи. Пожалуйста, скажите мне заранее, чтобы я выбрала подходящую локацию (дружелюбную к собакам, достаточно места)."
      },
      {
        question: "Сколько ждать готовые фото?",
        answer: "Вы получите готовые обработанные фото через 1-2 недели в виде онлайн-галереи в полном разрешении. Для родовой фотографии из-за интенсивной обработки может потребоваться 2-3 недели."
      },
      {
        question: "Вы делаете выезд на дом?",
        answer: "Да, я с удовольствием приеду к вам домой или в любое место в Кемнице и окрестностях (до 30 км бесплатно, далее 0,50€/км). Особенно для newborn-фотосъёмок дом — самый расслабленный вариант."
      },
    ],
  },
});

strings.setLanguage(detectLang());

export function ContentSection() {
  const lang = detectLang();
  
  // Russische Inhalte (vollständig übersetzt)
  if (lang === 'ru') {
    return (
      <section id="blog" className="portfolio-content">
        <div className="portfolio-section-inner">
          <BlurFade>
            <h2 id="content-heading">{strings.heading}</h2>
            <p className="portfolio-content-subtitle">{strings.subtitle}</p>
          </BlurFade>

          {/* Блог-статьи */}
          <div className="content-grid">
            {strings.articles.map((article, index) => (
              <BlurFade key={article.title} delay={index * 0.1}>
                <article className="content-card">
                  <span className="content-category">{article.category}</span>
                  <h3>{article.title}</h3>
                  <p className="content-excerpt">{article.excerpt}</p>
                  <div className="content-meta">
                    <span className="read-time">{article.readTime}</span>
                  </div>
                </article>
              </BlurFade>
            ))}
          </div>

          {/* FAQ для Featured Snippets */}
          <div className="faq-section">
            <h3>Часто задаваемые вопросы</h3>
            <div className="faq-list">
              {strings.faq.map((item, index) => (
                <BlurFade key={item.question} delay={index * 0.05}>
                  <details className="faq-item">
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="portfolio-content">
      <div className="portfolio-section-inner">
        <BlurFade>
          <h2 id="content-heading">{strings.heading}</h2>
          <p className="portfolio-content-subtitle">{strings.subtitle}</p>
        </BlurFade>

        {/* Blog-Artikel */}
        <div className="content-grid">
          {strings.articles.map((article, index) => (
            <BlurFade key={article.title} delay={index * 0.1}>
              <article className="content-card">
                <span className="content-category">{article.category}</span>
                <h3>{article.title}</h3>
                <p className="content-excerpt">{article.excerpt}</p>
                <div className="content-meta">
                  <span className="read-time">{article.readTime}</span>
                </div>
              </article>
            </BlurFade>
          ))}
        </div>

        {/* FAQ für Featured Snippets */}
        <div className="faq-section">
          <h3>Häufig gestellte Fragen</h3>
          <div className="faq-list">
            {strings.faq.map((item, index) => (
              <BlurFade key={item.question} delay={index * 0.05}>
                <details className="faq-item">
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
