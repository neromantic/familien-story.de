import { useEffect, useState } from "react";
import { Hero } from "./Hero";
import { MarqueeStrip } from "./MarqueeStrip";
import { WorkSection } from "./WorkSection";
import { AboutSection } from "./AboutSection";
import { StoriesTeaser } from "./StoriesTeaser";
import { ProcessSection } from "./ProcessSection";
import { TestimonialSection } from "./TestimonialSection";
import { ContactSection } from "./ContactSection";
import { SiteFooter } from "./SiteFooter";
import {
  isLightroomPortfolioImage,
  type LightroomPortfolioImage,
} from "./lightroom";
import "@/styles/portfolio.css";

/**
 * The photographer's static portfolio at / (SPEC §15).
 *
 * The page ports the Figma Make redesign: the full-bleed hero with the
 * FAMILIENSTORY wordmark, the service marquee, the filterable bento gallery,
 * the about panel, the process steps, the testimonial, the dark contact
 * section and the footer. All copy is localized (German + Russian) via
 * react-localization, defined locally in each section.
 */
export default function PortfolioPage() {
  const [lightroomImages, setLightroomImages] = useState<LightroomPortfolioImage[] | null>(null);
  const [lightroomError, setLightroomError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/portfolio/images")
      .then(async (response) => {
        if (!response.headers.get("content-type")?.includes("application/json")) return null;
        if (!response.ok) throw new Error("Portfolio photos could not be loaded.");
        const result: unknown = await response.json();
        if (typeof result !== "object" || result === null) {
          throw new Error("The portfolio photo response is invalid.");
        }
        const body = result as { configured?: unknown; images?: unknown };
        if (body.configured === false) throw new Error("The Worker has no Lightroom share configured.");
        if (!Array.isArray(body.images) || !body.images.every(isLightroomPortfolioImage)) {
          throw new Error("The Lightroom photo list is invalid.");
        }
        return body.images;
      })
      .then((images) => {
        if (active && images) setLightroomImages(images);
      })
      .catch(() => {
        if (active) setLightroomError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="portfolio-page">
      <Hero />
      <MarqueeStrip />
      <WorkSection lightroomImages={lightroomImages} lightroomError={lightroomError} />
      <StoriesTeaser />
      <AboutSection />
      <ProcessSection />
      <TestimonialSection />
      <ContactSection />
      <SiteFooter />
    </div>
  );
}
