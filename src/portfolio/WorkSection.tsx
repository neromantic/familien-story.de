import { useEffect, useMemo, useRef, useState } from "react";
import LocalizedStrings from "react-localization";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { BentoGrid } from "@/components/magic-ui/bento-grid";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { cn } from "@/lib/utils";
import { detectLang } from "./lang";
import {
  createLightroomWorks,
  type WorkImage,
} from "./works";
import type { LightroomPortfolioImage } from "./lightroom";

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
    lightbox: {
      open: "vergrößern",
      close: "Schließen",
      prev: "Vorheriges Bild",
      next: "Nächstes Bild",
    },
    loading: "Lade Geschichten aus Lightroom …",
    lightroomError: "Die Fotos konnten nicht aus Lightroom geladen werden.",
  },
  ru: {
    heading: "Настоящие моменты.",
    headingAccent: "Навсегда.",
    intro:
      "Тихие истории о зарождении, встрече и взрослении. Искренние, живые, близкие — в фотографиях, которые ощущаются как дом.",
    lightbox: {
      open: "увеличить",
      close: "Закрыть",
      prev: "Предыдущее фото",
      next: "Следующее фото",
    },
    loading: "Загрузка историй из Lightroom …",
    lightroomError: "Не удалось загрузить фотографии из Lightroom.",
  },
});
strings.setLanguage(detectLang());

/**
 * The curated work: an editorial introduction and the Magic UI bento grid.
 * The grid shows every photo of the Lightroom share (or the bundled fallback
 * photos when the share is not configured). Clicking an image opens a
 * lightbox with keyboard navigation.
 */
export function WorkSection({
  lightroomImages,
  lightroomError = false,
}: {
  lightroomImages: LightroomPortfolioImage[] | null;
  lightroomError?: boolean;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const isLightboxOpen = lightbox !== null;
  const works = useMemo(
    () => (lightroomImages ? createLightroomWorks(lightroomImages) : []),
    [lightroomImages],
  );

  // Lightbox: lock body scroll while open.
  useEffect(() => {
    if (lightbox === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [lightbox]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const animationFrame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
      previousFocus?.focus();
    };
  }, [isLightboxOpen]);

  // Lightbox: keyboard navigation (←/→/Esc).
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setLightbox(null);
      } else if (e.key === "ArrowLeft") {
        setLightbox((i) => (i === null ? i : (i + works.length - 1) % works.length));
      } else if (e.key === "ArrowRight") {
        setLightbox((i) => (i === null ? i : (i + 1) % works.length));
      } else if (e.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>(
          "button:not([disabled])",
        );
        const first = buttons?.[0];
        const last = buttons?.[buttons.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, works.length]);

  const active: WorkImage | null = lightbox === null ? null : works[lightbox] ?? null;

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
              {strings.heading}{" "}
              <br />
              <em>{strings.headingAccent}</em>
            </h2>
          </div>
          <p className="portfolio-intro-copy">
            {strings.intro}
          </p>
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

        <BentoGrid className="portfolio-bento">
          {works.map((item, index) => (
            <BlurFade
              key={item.src}
              delay={Math.min(index * 0.05, 0.3)}
              className={cn("portfolio-work-figure", item.wide && "is-wide")}
            >
              <figure className="portfolio-work-card">
                <button
                  type="button"
                  onClick={() => setLightbox(works.indexOf(item))}
                  aria-label={`${item.alt} — ${strings.lightbox.open}`}
                  className="work-tile"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    width={Math.round(item.aspect * 1000)}
                    height={1000}
                  />
                  <span className="work-tile-hint">{strings.lightbox.open}</span>
                </button>
              </figure>
            </BlurFade>
          ))}
        </BentoGrid>
      </div>

      {/* Lightbox */}
      {active ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label={strings.lightbox.close}
            className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center text-cream/80 transition-colors hover:text-cream"
          >
            <X className="size-6" />
          </button>

          {lightbox! > 0 ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox! + works.length - 1) % works.length);
              }}
              aria-label={strings.lightbox.prev}
              className="absolute left-3 z-10 flex size-11 items-center justify-center text-cream/80 transition-colors hover:text-cream sm:left-6"
            >
              <ArrowLeft className="size-7" />
            </button>
          ) : null}

          <img
            src={active.fullSrc ?? active.src}
            alt={active.alt}
            width={Math.round(active.aspect * 1000)}
            height={1000}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full object-contain"
          />

          {lightbox! < works.length - 1 ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((lightbox! + 1) % works.length);
              }}
              aria-label={strings.lightbox.next}
              className="absolute right-3 z-10 flex size-11 items-center justify-center text-cream/80 transition-colors hover:text-cream sm:right-6"
            >
              <ArrowRight className="size-7" />
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
