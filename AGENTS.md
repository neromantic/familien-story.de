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
# → Wert einfügen: https://lightroom.adobe.com/shares/YOUR_SHARE_ID

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
VITE_PHOTOGRAPHER_NAME="Dein Name"
VITE_PHOTOGRAPHER_BRAND="FAMILIENSTORY"
VITE_PHOTOGRAPHER_STREET="Deine Straße"
VITE_PHOTOGRAPHER_PLZ="Deine PLZ"
VITE_PHOTOGRAPHER_ORT="Dein Ort"
VITE_PHOTOGRAPHER_EMAIL="deine@email.de"
VITE_PHOTOGRAPHER_WHATSAPP="+49 123 4567890"
VITE_PHOTOGRAPHER_INSTAGRAM="@dein_handle"
VITE_PHOTOGRAPHER_INSTAGRAM_URL="https://instagram.com/dein_handle"
VITE_WHATSAPP_MESSAGE="Hallo, ich interessiere mich für ein Fotoshooting und würde gern mehr erfahren."
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

Der Workflow in `.github/workflows/ci.yml` führt bei jedem Push auf `main` aus:

1. **verify**: `yarn typecheck` + `yarn build`
2. **e2e**: Startet den Worker lokal, führt Playwright-Tests aus
3. **deploy**: Deployt automatisch zu Cloudflare (nur auf `main`)

### Secrets einrichten (für CI-Deploy)

Gehe zu deinem GitHub-Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret Name | Wert | Woher |
|-------------|------|-------|
| `CLOUDFLARE_API_TOKEN` | Dein Cloudflare API Token | [Cloudflare Dashboard → API Tokens](https://dash.cloudflare.com/profile/api-tokens) (Create Token → "Edit Cloudflare Workers") |
| `CLOUDFLARE_ACCOUNT_ID` | Deine Account-ID | `npx wrangler whoami` oder [Cloudflare Dashboard](https://dash.cloudflare.com) (rechts unten) |
| `PORTFOLIO_LIGHTROOM_SHARE_URL` | Lightroom-URL | `https://lightroom.adobe.com/shares/YOUR_SHARE_ID` |
| `VITE_PHOTOGRAPHER_NAME` | Name | z.B. `"Kateryna Hohol"` |
| `VITE_PHOTOGRAPHER_BRAND` | Brand | z.B. `"FAMILIENSTORY"` |
| `VITE_PHOTOGRAPHER_STREET` | Straße | z.B. `"Rosenhof 7"` |
| `VITE_PHOTOGRAPHER_PLZ` | PLZ | z.B. `"09111"` |
| `VITE_PHOTOGRAPHER_ORT` | Ort | z.B. `"Chemnitz"` |
| `VITE_PHOTOGRAPHER_EMAIL` | E-Mail | z.B. `"hoholkateryna@gmail.com"` |
| `VITE_PHOTOGRAPHER_WHATSAPP` | WhatsApp | z.B. `"+49 176 64094869"` |
| `VITE_PHOTOGRAPHER_INSTAGRAM` | Instagram Handle | z.B. `"@kateryna.familienstory"` |
| `VITE_PHOTOGRAPHER_INSTAGRAM_URL` | Instagram URL | z.B. `"https://instagram.com/kateryna.familienstory"` |
| `VITE_WHATSAPP_MESSAGE` | WhatsApp Nachricht | z.B. `"Hallo, ich interessiere mich für ein Fotoshooting."` |

**Nach dem Einrichten:**
- Bei jedem Push auf `main` wird automatisch gebaut, getestet und deployed
- Das Deploy erfolgt nur, wenn alle Tests grün sind

## Caching & Invalidation

| Route | TTL | Grund |
|-------|-----|-------|
| `/api/portfolio/images` | 5 min | Live-View der Lightroom-Freigabe |
| `/api/img/...` (Renditions) | 30 Tage, immutable | Content-addressierte URLs ändern sich nie |

Jede Antwort trägt `x-worker-cache: HIT|MISS` für Debugging.

---

## SEO & AI-Discovery Optimierung

### ✅ Bereits eingerichtet:

1. **Meta-Tags**: Title, Description, Keywords, Open Graph, Twitter Cards
2. **Structured Data (Schema.org)**:
   - `PhotographyBusiness` für Local SEO
   - `Person` für die Fotografin
   - `FAQPage` für Featured Snippets in Google
3. **Sitemap**: `/sitemap.xml` mit allen öffentlichen Seiten
4. **robots.txt**: Erlaubt Google & AI-Crawler (ChatGPT, Claude), blockiert private Bereiche

### 📈 Nächste Schritte für bessere Sichtbarkeit:

#### 1. Google Search Console einrichten (5 Min)

1. Geh zu: https://search.google.com/search-console
2. Logge dich mit deinem Google-Konto ein
3. "Property hinzufügen" → `familien-story.de`
4. Verifizierungsmethode wählen (DNS oder HTML-Tag)
5. Nach Verifizierung: Sitemap einreichen unter "Sitemaps" → `sitemap.xml`

**Nach 24-48h:** Google hat die Seite indexiert.

#### 2. Google Business Profile erstellen (10 Min)

1. Geh zu: https://www.google.com/business
2. "Jetzt verwalten" → Business hinzufügen
3. Daten eingeben:
   - Name: `Familien Story`
   - Kategorie: `Fotograf`
   - Adresse: `Chemnitz, 09111` (oder Servicegebiet ohne Adresse)
   - Telefon: `+49 176 64094869`
   - Website: `https://familien-story.de`
4. Fotos hochladen (Logo, Arbeitsproben)
5. Verifizierung per Postkarte (dauert 3-5 Tage)

**Vorteil:** Erscheint in Google Maps und lokalen Suchen.

#### 3. Bing Webmaster Tools (optional, 5 Min)

1. Geh zu: https://www.bing.com/webmasters
2. Mit Microsoft-Konto anmelden
3. Website hinzufügen und verifizieren
4. Sitemap einreichen: `sitemap.xml`

#### 4. AI-Discovery optimieren (ChatGPT, Claude, Perplexity)

**Was AI-Modelle brauchen:**
- ✅ Klare, strukturierte Inhalte (haben wir)
- ✅ FAQ-Schema.org (haben wir)
- ✅ Lokale Signale: Stadt, Region, Adresse (haben wir)
- ✅ Autorität durch Backlinks

**Backlinks aufbauen:**
- Lokale Verzeichnisse (DasÖrtliche, 11880.com, GelbeSeiten)
- Hochzeitsportale (Wedding.com, Braut.de)
- Lokale Blogs in Chemnitz
- Instagram Bio-Link zur Website

#### 5. OG-Image erstellen (empfohlen)

Erstelle ein 1200x630px Bild für Social Media Shares:
- Text: "Familien Story — Familienfotografie Chemnitz"
- Logo/Branding
- Ein schönes Familienfoto als Hintergrund

Speichern als `public/og-image.jpg` und deployen.

---

## Rollback & Logs

```bash
# Zur vorherigen Version zurückkehren
npx wrangler rollback

# Live-Logs streamen
npx wrangler tail
```
