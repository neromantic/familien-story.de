import aboutMe from "@/assets/images/about-me.webp";
import type { LightroomPortfolioImage } from "./lightroom";

export interface WorkImage {
  src: string;
  fullSrc?: string;
  alt: string;
  /** Landscape images span two grid columns; portrait images span one. */
  wide: boolean;
  /** Natural aspect ratio (width / height) of the file. */
  aspect: number;
}

/**
 * Map the Lightroom share listing onto the bento-grid image shape. The grid
 * shows every photo of the share, in album order; there is no static
 * fallback set anymore.
 */
export function createLightroomWorks(images: LightroomPortfolioImage[]): WorkImage[] {
  return images.map((image) => {
    const aspect =
      image.width && image.height ? image.width / image.height : 2 / 3;
    return {
      src: image.thumbnailUrl,
      fullSrc: image.fullUrl,
      alt: image.name,
      wide: aspect > 1.15,
      aspect,
    };
  });
}

export { aboutMe };
