import { useEffect, useRef, useState } from "react";
import LocalizedStrings from "react-localization";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { BentoGrid } from "@/components/magic-ui/bento-grid";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { cn } from "@/lib/utils";
import { detectLang } from "./lang";
import type { WorkImage } from "./works";

const strings = new LocalizedStrings({
  de: {
    open: "vergrößern",
    close: "Schließen",
    prev: "Vorheriges Bild",
    next: "Nächstes Bild",
  },
  ru: {
    open: "увеличить",
    close: "Закрыть",
    prev: "Предыдущее фото",
    next: "Следующее фото",
  },
});
strings.setLanguage(detectLang());

/**
 * The shared bento gallery with its keyboard-navigable lightbox. Used by the
 * landing page and by the per-story galleries, so both behave identically.
 */
export function Gallery({ works }: { works: WorkImage[] }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const isLightboxOpen = lightbox !== null;

  // Lock body scroll while the lightbox is open.
  useEffect(() => {
    if (lightbox === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [lightbox]);

  // Move focus into the dialog and restore it on close.
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

  // Keyboard navigation: ←/→ and Esc.
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
    <>
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
                onClick={() => setLightbox(index)}
                aria-label={`${item.alt} — ${strings.open}`}
                className="work-tile"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  width={Math.round(item.aspect * 1000)}
                  height={1000}
                />
                <span className="work-tile-hint">{strings.open}</span>
              </button>
            </figure>
          </BlurFade>
        ))}
      </BentoGrid>

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
            aria-label={strings.close}
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
              aria-label={strings.prev}
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
              aria-label={strings.next}
              className="absolute right-3 z-10 flex size-11 items-center justify-center text-cream/80 transition-colors hover:text-cream sm:right-6"
            >
              <ArrowRight className="size-7" />
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
