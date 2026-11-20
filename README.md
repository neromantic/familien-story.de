# Familien Story

Warm, editorial photography portfolio for Kateryna Kalvasinskyi, with German
and Russian copy, a filterable image gallery, and direct contact links. The
website contains the landing page and legal pages:

- `/` — portfolio
- `/impressum` — legal notice
- `/datenschutz` — privacy policy

Client galleries and an admin panel are not part of the current website.
[`SPEC.md`](./SPEC.md) describes possible future functionality.

The portfolio uses bundled placeholder photos by default. To load photos from
a public Lightroom share through the Worker, set the optional
`PORTFOLIO_LIGHTROOM_SHARE_URL` Worker variable to the share URL. The Worker
then serves the album photos through its Lightroom image proxy; if the
variable is unset, the bundled photos remain in use.

## Stack

- React, TypeScript, Vite and Tailwind CSS
- GSAP for reduced-motion-aware reveals
- Cloudflare Worker for serving the built static site with SPA fallback
- Docker Compose for local development and Playwright smoke tests

## Run locally

```bash
docker compose up
```

Compose mounts the project into the Node container and installs dependencies
into a named volume on startup. Open <http://localhost:8787>. The frontend is
built when the Worker starts; restart it after changing source files with
`docker compose restart app`. Stop the containers with `docker compose down`.
Use the Compose commands below for checks as well; no local Node/Yarn setup is
needed.

## Smoke test and screenshots

```bash
docker compose run --rm smoke
```

Playwright checks the portfolio in desktop and mobile viewports, verifies the
About reveal after scrolling, and saves full-page screenshots of the portfolio
and legal pages to `artifacts/screenshots/`. The test container mounts the
project and reuses the app's dependency volume. The directory is ignored by
Git.

With the app running from `docker compose up`, run checks inside its container:

```bash
docker compose exec app yarn typecheck
docker compose exec app yarn build
```

For local Lightroom testing, configure `PORTFOLIO_LIGHTROOM_SHARE_URL` in the
Worker's local environment; in production, add it as a Worker variable in
Cloudflare.

## Deploy to Cloudflare

The site is a Cloudflare Worker (`src/worker.ts`) serving the built frontend
from `dist/` plus two API routes: `/api/portfolio/images` (the Lightroom
album listing) and `/api/img/:spaceId?path=…` (the image proxy that keeps the
public `x-api-key` server-side).

```bash
# one-time setup
npx wrangler login

# build + deploy (runs `yarn build` first)
yarn deploy
```

Configuration and secrets:

- `PORTFOLIO_LIGHTROOM_SHARE_URL` is public, so it lives in `vars` in
  [`wrangler.jsonc`](./wrangler.jsonc) and is deployed with the Worker.
- If you ever move a sensitive value there instead, keep it out of the repo:
  `wrangler secret put <NAME>` (or set it in the Cloudflare dashboard).
- The share URL also has a local fallback: `dev:worker` creates `.env` from
  the public share if the file is missing, so a fresh clone works out of the
  box.

Serving the site on a custom domain: add the domain to the Worker in the
Cloudflare dashboard (Workers → your worker → Settings → Domains & Routes),
or add a `domains`/`routes` entry to `wrangler.jsonc`. Without a custom
domain the Worker is reachable on its `*.workers.dev` subdomain.

### Caching and invalidation

The Worker caches Lightroom responses in the Workers Cache API:

| Route | TTL | Why |
| --- | --- | --- |
| `/api/portfolio/images` | 5 min (`max-age=300`) | the share is live; new photos appear within 5 minutes |
| `/api/img/…` renditions | 30 days, `immutable` | rendition URLs are content-addressed (`…/revisions/<rev>/…`), so they never change and never need purging |

Every response carries `x-worker-cache: HIT|MISS` so you can verify the cache
in the browser's network tab or with `curl -I`. To force fresh content
immediately, deploy again (a new Worker version starts with a cold cache) —
otherwise the TTLs above are the whole invalidation story; there is nothing
to purge manually.

Other operations:

- Rollback: `wrangler rollback` or Workers → your worker → Versions in the
  dashboard.
- Logs: `wrangler tail` or the dashboard's Logs view.

`docker compose run --rm smoke` can also be run on its own; Compose starts the
app service and waits until it is healthy before launching Playwright.
