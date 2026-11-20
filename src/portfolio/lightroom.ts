export interface LightroomPortfolioImage {
  thumbnailUrl: string;
  fullUrl: string;
  name: string;
  albumName: string;
  width: number | null;
  height: number | null;
}

export function isLightroomPortfolioImage(value: unknown): value is LightroomPortfolioImage {
  if (typeof value !== "object" || value === null) return false;
  const image = value as Record<string, unknown>;
  return (
    typeof image.thumbnailUrl === "string" &&
    typeof image.fullUrl === "string" &&
    typeof image.name === "string" &&
    typeof image.albumName === "string" &&
    (typeof image.width === "number" || image.width === null) &&
    (typeof image.height === "number" || image.height === null)
  );
}
