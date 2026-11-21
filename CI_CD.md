# CI/CD ist jetzt manuell triggerbar

## Automatische Deployments (wie bisher)

- **Push auf `main`** → Build + Tests + **automatisches Deploy** auf Production

## Manuelles Deployment (neu)

### Über GitHub Actions Tab

1. Gehe zu: https://github.com/neromantic/familien-story.de/actions/workflows/ci.yml
2. Klicke auf **"Run workflow"** (rechts)
3. Wähle:
   - ✅ **Deploy to Cloudflare Workers** (Checkbox)
   - **Environment**: `production` oder `preview`
4. Klicke **"Run workflow"**

### Was passiert?

- **verify**: `yarn typecheck` + `yarn build`
- **e2e**: Playwright Tests gegen lokalen Worker
- **deploy** (nur wenn Checkbox aktiv): Deployt zu Cloudflare

### Environments

| Environment | URL | Secret Scope |
|-------------|-----|--------------|
| `production` | `https://familien-story.de` | Production Secrets |
| `preview` | `https://<branch>.familien-story.de` | Preview Secrets (optional) |

## Secrets einrichten

### GitHub Repository Secrets

Gehe zu: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Secret Name | Wert | Woher |
|-------------|------|-------|
| `CLOUDFLARE_API_TOKEN` | Dein Token | Cloudflare Dashboard → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | Account ID | `npx wrangler whoami` |
| `PORTFOLIO_LIGHTROOM_SHARE_URL` | Lightroom URL | `https://lightroom.adobe.com/shares/...` |
| `LIGHTROOM_SHARES` | JSON mit allen Stories | Siehe unten |
| `VITE_*` | Photographer Details | `.env.example` |

### LIGHTROOM_SHARES Format

```json
{
  "familystory": "https://lightroom.adobe.com/shares/ABC123",
  "pregnancystory": "https://lightroom.adobe.com/shares/DEF456",
  "birthstory": "https://lightroom.adobe.com/shares/GHI789",
  "lovestory": "https://lightroom.adobe.com/shares/JKL012",
  "yourstory": "https://lightroom.adobe.com/shares/MNO345"
}
```

**Wichtig:** Als **einzeiliger String** in GitHub Secrets speichern (ohne Zeilenumbrüche).

## Local Development mit Docker (HMR)

```bash
# .env Datei erstellen
cp .env.example .env

# Docker Compose starten (HMR aktiv)
docker compose up

# Browser: http://localhost:5173
# Änderungen werden sofort im Browser aktualisiert
```

Siehe `DEVELOPMENT.md` für Details.

## Workflow Übersicht

```
┌─────────────┐
│  Push main  │
└──────┬──────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐
│   verify    │────▶│    e2e      │
│ (build+ts)  │     │   (tests)   │
└─────────────┘     └──────┬──────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   deploy    │
                    │  (automatic)│
                    └─────────────┘

┌──────────────────┐
│ Manual Trigger   │
│ (GitHub Actions) │
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│ deploy: true?   │──No──▶ Only verify + e2e
└────────┬────────┘
        Yes
         │
         ▼
┌─────────────────┐
│ Manual Deploy   │
│ (prod/preview)  │
└─────────────────┘
```
