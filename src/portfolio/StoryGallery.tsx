import { useEffect, useMemo, useRef, useState } from "react";
import LocalizedStrings from "react-localization";
import { detectLang } from "./lang";
import { createLightroomWorks } from "./works";
import {
  isLightroomPortfolioImage,
  type LightroomPortfolioImage,
} from "./lightroom";
import { Gallery } from "./Gallery";

/** The five story keys, matching the worker's share map. */
export type StoryKey =
  | "familystory"
  | "pregnancystory"
  | "birthstory"
  | "lovestory"
  | "yourstory";

const strings = new LocalizedStrings({
  de: {
    loading: "Lade Bilder …",
    error: "Die Bilder konnten gerade nicht geladen werden.",
    empty: "Für diese Story kommen bald Bilder.",
    label: "Bilder",
  },
  ru: {
    loading: "Загружаю фото …",
    error: "Не удалось загрузить фотографии.",
    empty: "Фотографии этой истории скоро появятся.",
    label: "Фотографии",
  },
});
strings.setLanguage(detectLang());

/**
 * A small per-story gallery fed by its own Lightroom share. It only starts
 * fetching when it scrolls near the viewport, so five galleries on one page
 * do not fire five requests on load. The prerendered HTML shows the
 * placeholder — the story copy itself is always in the static HTML.
 */
export function StoryGallery({
  story,
  limit = 6,
  label,
}: {
  story: StoryKey;
  limit?: number;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<LightroomPortfolioImage[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let active = true;

    fetch(`/api/stories/${story}/images`)
      .then(async (response) => {
        if (!response.headers.get("content-type")?.includes("application/json")) return null;
        if (!response.ok) throw new Error("Story photos could not be loaded.");
        const result: unknown = await response.json();
        if (typeof result !== "object" || result === null) {
          throw new Error("The story photo response is invalid.");
        }
        const body = result as { configured?: unknown; images?: unknown };
        if (body.configured === false) return [];
        if (!Array.isArray(body.images) || !body.images.every(isLightroomPortfolioImage)) {
          throw new Error("The Lightroom photo list is invalid.");
        }
        return body.images;
      })
      .then((result) => {
        if (active && result) setImages(result);
      })
      .catch(() => {
        if (active) setError(true);
      });

    return () => {
      active = false;
    };
  }, [visible, story]);

  const works = useMemo(
    () => (images ? createLightroomWorks(images.slice(0, limit)) : []),
    [images, limit],
  );

  return (
    <div
      ref={ref}
      className="story-gallery"
      aria-label={label ?? strings.label}
      aria-busy={visible && images === null && !error}
    >
      {error ? (
        <p role="alert" className="story-gallery-note">
          {strings.error}
        </p>
      ) : null}

      {!error && images === null ? (
        <p className="story-gallery-note" aria-live="polite">
          {visible ? strings.loading : null}
        </p>
      ) : null}

      {!error && images !== null && works.length === 0 ? (
        <p className="story-gallery-note">{strings.empty}</p>
      ) : null}

      {works.length > 0 ? <Gallery works={works} /> : null}
    </div>
  );
}
