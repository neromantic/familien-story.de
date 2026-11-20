// Minimal typing of the Workers Cache API. workerd exposes a `default` cache
// on `caches`, which the DOM lib used for typechecking does not know about.
declare const caches: {
  default: {
    match(request: Request): Promise<Response | undefined>;
    put(request: Request, response: Response): Promise<void>;
  };
};

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  PORTFOLIO_LIGHTROOM_SHARE_URL?: string;
}

interface LightroomImage {
  thumbnailUrl: string;
  fullUrl: string;
  name: string;
  albumName: string;
  width: number | null;
  height: number | null;
}

const LR_API_BASE = "https://photos.adobe.io/v2";
const LR_API_KEY = "LightroomMobileWeb1";

/**
 * Cache TTLs (seconds).
 *
 * The album listing is a live view of the Lightroom share: it changes when
 * the photographer adds photos, so it is cached briefly (5 min) — that TTL
 * is the invalidation window for new photos. Image renditions are
 * content-addressed (…/assets/<id>/revisions/<rev>/renditions/<id>), i.e.
 * immutable, so they are cached for 30 days and never need purging.
 */
const LIST_TTL_SECONDS = 300;
const IMAGE_TTL_SECONDS = 60 * 60 * 24 * 30;
const IMAGE_CACHE_CONTROL = `public, max-age=${IMAGE_TTL_SECONDS}, immutable`;
const LIST_CACHE_CONTROL = `public, max-age=${LIST_TTL_SECONDS}`;

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { "cache-control": "no-store" },
  });

function spaceIdFromUrl(value: string): string | null {
  return value.match(/lightroom\.adobe\.com\/shares\/([a-f0-9]{32,})/i)?.[1] ?? null;
}

async function resolveSpaceId(shareUrl: string): Promise<string> {
  const direct = spaceIdFromUrl(shareUrl);
  if (direct) return direct;

  const url = new URL(shareUrl);
  if (url.hostname !== "adobe.ly" && url.hostname !== "www.adobe.ly") {
    throw new Error("PORTFOLIO_LIGHTROOM_SHARE_URL must be a Lightroom share URL.");
  }
  const response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(10_000) });
  const resolved = spaceIdFromUrl(response.url);
  if (!response.ok || !resolved) throw new Error("The Lightroom share URL could not be resolved.");
  return resolved;
}

function objectLiteralToJson(source: string): string {
  const output: string[] = [];
  let inString = false;
  let escaped = false;
  for (let index = 0; index < source.length;) {
    const character = source[index];
    if (inString) {
      output.push(character);
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
      index++;
    } else if (character === '"') {
      inString = true;
      output.push(character);
      index++;
    } else if (/[A-Za-z_$]/.test(character)) {
      let end = index + 1;
      while (end < source.length && /[A-Za-z0-9_$]/.test(source[end])) end++;
      const token = source.slice(index, end);
      output.push(
        ["undefined", "NaN", "Infinity"].includes(token)
          ? "null"
          : ["true", "false", "null"].includes(token)
            ? token
            : JSON.stringify(token),
      );
      index = end;
    } else {
      output.push(character);
      index++;
    }
  }
  return output.join("");
}

function embeddedSharesConfig(html: string): unknown {
  const marker = html.indexOf("window.SharesConfig");
  const start = html.indexOf("{", marker);
  if (marker < 0 || start < 0) throw new Error("The Lightroom share has no album listing.");

  let depth = 0;
  let inString = false;
  let escaped = false;
  let end = -1;
  for (let index = start; index < html.length; index++) {
    const character = html[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === '"') inString = false;
    } else if (character === '"') {
      inString = true;
    } else if (character === "{") {
      depth++;
    } else if (character === "}" && --depth === 0) {
      end = index + 1;
      break;
    }
  }
  if (end < 0) throw new Error("The Lightroom share listing is malformed.");
  const literal = html.slice(start, end);
  try {
    return JSON.parse(literal);
  } catch {
    return JSON.parse(objectLiteralToJson(literal));
  }
}

async function fetchPortfolioImages(spaceId: string): Promise<LightroomImage[]> {
  const shareResponse = await fetch(`https://lightroom.adobe.com/shares/${spaceId}`, {
    signal: AbortSignal.timeout(15_000),
  });
  if (!shareResponse.ok) throw new Error("The Lightroom share is not accessible.");

  const config = embeddedSharesConfig(await shareResponse.text());
  const space = (config as { spaceAttributes?: { resources?: unknown[] } }).spaceAttributes;
  const albums = space?.resources?.filter(
    (resource): resource is { id: string; payload?: { name?: string } } =>
      typeof resource === "object" &&
      resource !== null &&
      (resource as { type?: unknown }).type === "album" &&
      typeof (resource as { id?: unknown }).id === "string",
  );
  if (!albums?.length) throw new Error("The Lightroom share contains no albums.");

  const images: LightroomImage[] = [];
  for (const album of albums) {
    const response = await fetch(
      `${LR_API_BASE}/spaces/${spaceId}/albums/${album.id}/assets?embed=asset&subtype=image`,
      { signal: AbortSignal.timeout(20_000) },
    );
    if (!response.ok) throw new Error("The Lightroom album could not be loaded.");
    const text = await response.text();
    const payload = JSON.parse(text.startsWith("while (1)") ? text.slice(text.indexOf("\n") + 1) : text) as {
      resources?: unknown[];
    };

    for (const resource of payload.resources ?? []) {
      if (typeof resource !== "object" || resource === null) continue;
      const asset = (resource as { asset?: Record<string, unknown> }).asset;
      if (!asset || asset.subtype !== "image") continue;
      const links = (asset.links ?? {}) as Record<string, { href?: unknown }>;
      const thumbnailPath =
        links["/rels/rendition_type/640"]?.href ??
        links["/rels/rendition_type/thumbnail2x"]?.href;
      const fullPath =
        links["/rels/rendition_type/2048"]?.href ??
        links["/rels/rendition_type/1280"]?.href ??
        thumbnailPath;
      if (typeof fullPath !== "string") continue;

      const importSource = (asset.payload as { importSource?: Record<string, unknown> } | undefined)
        ?.importSource;
      const name =
        typeof importSource?.fileName === "string" ? importSource.fileName : "Lightroom photo";
      const width =
        typeof importSource?.originalWidth === "number" ? importSource.originalWidth : null;
      const height =
        typeof importSource?.originalHeight === "number" ? importSource.originalHeight : null;
      const proxyUrl = (path: string) =>
        `/api/img/${spaceId}?${new URLSearchParams({ path }).toString()}`;
      images.push({
        thumbnailUrl: proxyUrl(typeof thumbnailPath === "string" ? thumbnailPath : fullPath),
        fullUrl: proxyUrl(fullPath),
        name,
        albumName: album.payload?.name ?? "",
        width,
        height,
      });
    }
  }

  if (!images.length) throw new Error("The Lightroom share contains no photos.");
  return images;
}

/**
 * Look up a cached response for this exact request. Returns null when the
 * Workers cache has nothing usable (cold colo, expired TTL, non-GET request).
 */
async function cacheLookup(request: Request): Promise<Response | null> {
  if (request.method !== "GET") return null;
  try {
    return (await caches.default.match(request)) ?? null;
  } catch {
    return null;
  }
}

/** Store a response in the Workers cache; failures are logged, never fatal. */
async function cacheStore(request: Request, response: Response): Promise<void> {
  if (request.method !== "GET" || response.status !== 200) return;
  try {
    await caches.default.put(request, response.clone());
  } catch (error) {
    console.error("cache.put failed:", error);
  }
}

/** Mark where a response came from — useful for debugging and the smoke tests. */
function withCacheHeader(response: Response, hit: boolean): Response {
  const headers = new Headers(response.headers);
  headers.set("x-worker-cache", hit ? "HIT" : "MISS");
  return new Response(response.body, { status: response.status, headers, statusText: response.statusText });
}

/**
 * Serve the album listing. Cache key is the request URL; TTL is short (the
 * share is live), so new photos in Lightroom become visible within
 * LIST_TTL_SECONDS. Invalidation is TTL-based: a short listing TTL plus
 * content-addressed rendition URLs, which never need purging.
 */
async function handlePortfolioImages(request: Request, env: Env): Promise<Response> {
  if (!env.PORTFOLIO_LIGHTROOM_SHARE_URL) return json({ configured: false });

  const cached = await cacheLookup(request);
  if (cached) return withCacheHeader(cached, true);

  try {
    const spaceId = await resolveSpaceId(env.PORTFOLIO_LIGHTROOM_SHARE_URL);
    const images = await fetchPortfolioImages(spaceId);
    const response = json({ configured: true, images });
    response.headers.set("cache-control", LIST_CACHE_CONTROL);
    await cacheStore(request, response);
    return withCacheHeader(response, false);
  } catch {
    return json({ error: "Portfolio photos could not be loaded from Lightroom." }, 502);
  }
}

/**
 * Serve one image rendition. Rendition paths are content-addressed, so the
 * response is cached as immutable for 30 days; a miss fetches it from Adobe
 * with the public client key a browser cannot send.
 */
async function handleImageProxy(spaceId: string, url: URL, request: Request): Promise<Response> {
  const path = url.searchParams.get("path");
  if (!path || !/^assets\/[a-f0-9]+\/revisions\/[a-f0-9]+\/renditions\/[a-f0-9]+$/i.test(path)) {
    return json({ error: "Invalid Lightroom image path." }, 400);
  }

  const cached = await cacheLookup(request);
  if (cached) return withCacheHeader(cached, true);

  try {
    const response = await fetch(`${LR_API_BASE}/spaces/${spaceId}/${path}`, {
      headers: { "x-api-key": LR_API_KEY },
      signal: AbortSignal.timeout(30_000),
    });
    if (!response.ok) return json({ error: "Lightroom image could not be loaded." }, 502);

    // Buffer the rendition so the cached copy and the client response each
    // get their own readable body (streams cannot be shared with cache.put).
    const buffer = await response.arrayBuffer();
    const proxied = new Response(buffer, {
      headers: {
        "content-type": response.headers.get("content-type") ?? "image/jpeg",
        "content-length": String(buffer.byteLength),
        "cache-control": IMAGE_CACHE_CONTROL,
      },
    });
    await cacheStore(request, proxied);
    return withCacheHeader(proxied, false);
  } catch {
    return json({ error: "Lightroom image could not be loaded." }, 502);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/portfolio/images" && request.method === "GET") {
      return handlePortfolioImages(request, env);
    }

    const imageMatch = url.pathname.match(/^\/api\/img\/([a-f0-9]{32,})$/i);
    if (imageMatch && request.method === "GET") {
      try {
        return await handleImageProxy(imageMatch[1], url, request);
      } catch {
        return json({ error: "Lightroom image could not be loaded." }, 502);
      }
    }

    return env.ASSETS.fetch(request);
  },
};
