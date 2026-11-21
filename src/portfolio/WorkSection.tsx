import { useMemo } from "react";
import LocalizedStrings from "react-localization";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { detectLang } from "./lang";
import { createLightroomWorks } from "./works";
import type { LightroomPortfolioImage } from "./lightroom";
import { Gallery } from "./Gallery";

/**
 * Localized work-section strings, defined right where they are used.
 * German is the first language, so any key missing from Russian falls back
 * to it automatically.
 */
const strings = new LocalizedStrings({
  de: {
    heading: "Echte Momente.",
    headingAccent: "Für immer.",
    intro:
      "Leise Geschichten vom Werden, Ankommen und Wachsen. Echt, ungestellt und voller Nähe — bewahrt in Bildern, die sich nach Zuhause anfühlen.",
    loading: "Lade Geschichten aus Lightroom …",
    lightroomError: "Die Fotos konnten nicht aus Lightroom geladen werden.",
  },
  ru: {
    heading: "Настоящие моменты.",
    headingAccent: "Навсегда.",
    intro:
      "Тихие истории о зарождении, встрече и взрослении. Искренние, живые, близкие — в фотографиях, которые ощущаются как дом.",
    loading: "Загрузка историй из Lightroom …",
    lightroomError: "Не удалось загрузить фотографии из Lightroom.",
  },
});
strings.setLanguage(detectLang());

/**
 * The curated work: an editorial introduction and the shared bento gallery.
 * The grid shows every photo of the Lightroom share (or the bundled fallback
 * photos when the share is not configured).
 */
export function WorkSection({
  lightroomImages,
  lightroomError = false,
}: {
  lightroomImages: LightroomPortfolioImage[] | null;
  lightroomError?: boolean;
}) {
  const works = useMemo(
    () => (lightroomImages ? createLightroomWorks(lightroomImages) : []),
    [lightroomImages],
  );

  return (
    <section
      id="portfolio"
      aria-labelledby="work-heading"
      className="portfolio-work"
    >
      <div className="portfolio-section-inner">
        <BlurFade className="portfolio-section-intro">
          <div>
            <h2 id="work-heading">
              {strings.heading} <br />
              <em>{strings.headingAccent}</em>
            </h2>
          </div>
          <p className="portfolio-intro-copy">{strings.intro}</p>
        </BlurFade>

        {lightroomError ? (
          <p role="alert" className="portfolio-lightroom-error">
            {strings.lightroomError}
          </p>
        ) : null}

        {!lightroomError && works.length === 0 ? (
          <p className="portfolio-lightroom-loading" aria-live="polite">
            {strings.loading}
          </p>
        ) : null}

        {works.length > 0 ? <Gallery works={works} /> : null}
      </div>
    </section>
  );
}
