# Deployment Guide — Cloudflare Workers

## Voraussetzungen

- Node.js 24+ und Yarn installiert
- Cloudflare-Account mit Zugriff auf das `familien-story`-Projekt
- Wrangler CLI (`npx wrangler login` einmalig ausführen)

## Secrets einrichten (Production)

Sensible Daten **niemals** in `.env` oder `wrangler.jsonc` committen. Stattdessen über Wrangler Secrets setzen:

```bash
# Lightroom Share URL (wird vom Worker gelesen)
npx wrangler secret put PORTFOLIO_LIGHTROOM_SHARE_URL
# → Wert einfügen: https://lightroom.adobe.com/shares/1aa3c3ab75344ca7bc90826dc7043435

# Optional: Admin-Credentials (für zukünftiges /kalvasinskyi-Panel)
npx wrangler secret put ADMIN_NAME
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put SESSION_SECRET
npx wrangler secret put GALLERY_PAYLOAD_KEY
npx wrangler secret put GOOGLE_DRIVE_API_KEY
```

## Build-Variablen (öffentlich, im Bundle)

Die folgenden Werte sind **öffentlich** (Impressum, Kontakt) und werden zur Build-Zeit injiziert. Lokal in `.env` setzen, im CI als GitHub Actions Secrets (`VITE_*`):

```bash
# .env (lokal, git-ignored)
VITE_PHOTOGRAPHER_NAME="Kateryna Hohol"
VITE_PHOTOGRAPHER_BRAND="FAMILIENSTORY"
VITE_PHOTOGRAPHER_STREET="Rosenhof 7"
VITE_PHOTOGRAPHER_PLZ="09111"
VITE_PHOTOGRAPHER_ORT="Chemnitz"
VITE_PHOTOGRAPHER_EMAIL="hoholkateryna@gmail.com"
VITE_PHOTOGRAPHER_WHATSAPP="+49 176 64094869"
VITE_PHOTOGRAPHER_INSTAGRAM="@kateryna.familienstory"
VITE_PHOTOGRAPHER_INSTAGRAM_URL="https://instagram.com/kateryna.familienstory"
VITE_WHATSAPP_MESSAGE="Hallo Kateryna, ich interessiere mich für ein Fotoshooting und würde gern mehr erfahren."
```

## Deploy mit Custom Domain

```bash
# Build + Deploy mit Domain-Zuweisung
npx wrangler deploy --domain=familien-story.de
```

Der Befehl:
1. Baut das Frontend (`yarn build` → `dist/`)
2. Deployt den Worker (`src/worker.ts`) mit den Assets aus `dist/`
3. Bindet die Domain `familien-story.de` an den Worker

---

## Schritt-für-Schritt: Apex-Domain einrichten

### 1. Worker deployen mit Custom Domain

```bash
npx wrangler deploy --domain=familien-story.de
```

### 2. DNS A-Record im Cloudflare Dashboard setzen

1. Logge dich ins [Cloudflare Dashboard](https://dash.cloudflare.com) ein
2. Wähle `familien-story.de` aus
3. Gehe zu **DNS** → **Records**
4. Klicke **Add record**
5. Wähle:
   - **Type:** `A`
   - **Name:** `@`
   - **Content:** `104.21.82.152` (oder `172.67.158.237`)
   - **Proxy status:** `Proxied` (orange Wolke 🌩️ aktivieren)
   - **TTL:** Auto
6. Klicke **Save**

### 3. Custom Domain im Worker aktivieren

1. Gehe zu **Workers & Pages** → **familien-story**
2. Tab: **Triggers** → **Custom Domains**
3. Klicke **Add Custom Domain**
4. Gib ein: `familien-story.de`
5. Klicke **Add Domain**

Cloudflare stellt automatisch das SSL-Zertifikat aus (dauert 1-5 Minuten).

---

## DNS-Propagation: Wenn die Domain lokal nicht lädt

**Problem:** Nach dem Setup siehst du im Browser `DNS_PROBE_FINISHED_NXDOMAIN` oder die Domain lädt nicht, obwohl alles korrekt konfiguriert ist.

**Ursache:** Dein lokaler DNS-Cache hat noch alte Werte. Die DNS-Records bei Cloudflare sind korrekt, aber dein Computer fragt einen veralteten DNS-Server.

### Lösung 1: DNS-Cache leeren

**Linux:**
```bash
sudo systemd-resolve --flush-caches
# oder
sudo systemctl restart systemd-resolved
```

**Windows:**
```cmd
ipconfig /flushdns
```

**macOS:**
```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

### Lösung 2: Öffentlichen DNS verwenden (funktioniert sofort)

Ändere deine DNS-Server temporär auf:
- **Primary:** `1.1.1.1` (Cloudflare)
- **Secondary:** `8.8.8.8` (Google)

**So geht's:**
1. Netzwerk-Einstellungen öffnen
2. Dein Netzwerk → Eigenschaften/Settings
3. DNS-Server → Manuell
4. Eintragen: `1.1.1.1` und `8.8.8.8`
5. Speichern
6. Browser neu starten

### Lösung 3: Testen mit explizitem DNS

```bash
# Mit Cloudflare DNS testen (umgeht lokalen DNS)
curl -I --resolve familien-story.de:443:104.21.82.152 https://familien-story.de/

# Oder mit dig prüfen
dig @1.1.1.1 +short A familien-story.de
# Sollte 104.21.82.152 und/oder 172.67.158.237 zurückgeben
```

### Lösung 4: Warten

DNS-Propagation kann **bis zu 24-48 Stunden** dauern, meist aber nur 1-2 Stunden. Da die DNS-Records bei Cloudflare korrekt sind, löst sich das Problem von selbst.

---

## Verifizierung

```bash
# DNS prüfen (sollte Cloudflare IPs zeigen)
dig +short A familien-story.de
# Erwartet: 104.21.82.152 und/oder 172.67.158.237

# HTTPS prüfen (sollte 200 zurückgeben)
curl -I https://familien-story.de
# Erwartet: HTTP/2 200

# SSL-Zertifikat prüfen
echo | openssl s_client -connect familien-story.de:443 -servername familien-story.de 2>/dev/null | openssl x509 -noout -subject -dates
```

---

**Hinweis:** Die Domains müssen bereits in deinem Cloudflare-Account verwaltet werden (DNS → Cloudflare Nameserver).

## Lokale Entwicklung

```bash
# .env anlegen (falls nicht vorhanden)
cp .env.example .env

# Developer-Server mit Hot-Reload
yarn dev:worker
# → http://127.0.0.1:8787
```

## CI/CD (GitHub Actions)

Der Workflow in `.github/workflows/ci.yml`:
1. **verify**: `yarn typecheck` + `yarn build`
2. **e2e**: Startet den Worker lokal, führt Playwright-Tests aus

Für Production-Deployments im CI:
- Secrets im Repo unter **Settings → Secrets → Actions** hinterlegen:
  - `CLOUDFLARE_API_TOKEN` (oder `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_KEY`)
  - Alle `VITE_*`-Werte (für den Build)
  - `PORTFOLIO_LIGHTROOM_SHARE_URL` (für den Worker)

## Caching & Invalidation

| Route | TTL | Grund |
|-------|-----|-------|
| `/api/portfolio/images` | 5 min | Live-View der Lightroom-Freigabe |
| `/api/img/...` (Renditions) | 30 Tage, immutable | Content-addressierte URLs ändern sich nie |

Jede Antwort trägt `x-worker-cache: HIT|MISS` für Debugging.

## Rollback & Logs

```bash
# Zur vorherigen Version zurückkehren
npx wrangler rollback

# Live-Logs streamen
npx wrangler tail
```
