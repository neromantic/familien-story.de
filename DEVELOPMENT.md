# Development mit HMR (Hot Module Replacement)

## Schnellstart

```bash
# Docker Container starten (HMR aktiviert)
docker compose up --build

# Im Browser: http://localhost:5173
# Änderungen an Code/CSS werden sofort im Browser aktualisiert
```

## Was ist anders als vorher?

- **Vite Dev Server** läuft im Container mit `server.host: '0.0.0.0'`
- **Volume Mounts** sind so konfiguriert, dass Dateiänderungen sofort erkannt werden
- **WebSocket** für HMR funktioniert durch explizite Port-Freigabe
- **Kein Neustart** nötig bei Code-Änderungen

## Commands

```bash
# Container starten (HMR)
docker compose up

# Container im Hintergrund + Logs
docker compose up -d && docker compose logs -f

# Container neu bauen (nach package.json Änderungen)
docker compose up --build

# Container stoppen
docker compose down

# In den Container shellen
docker compose exec app sh

# Tests im Container
docker compose exec app yarn test:e2e
```

## Ports

| Port | Service | Beschreibung |
|------|---------|-------------|
| 5173 | Vite Dev | Frontend mit HMR |
| 8787 | Wrangler | Local Worker (manuell starten) |

## Wrangler lokal im Container

```bash
# In den Container einloggen
docker compose exec app sh

# Wrangler mit HMR starten
yarn dev:worker

# Im Browser: http://localhost:8787
```

## Troubleshooting

### HMR verbindet nicht
```bash
# Container neu starten
docker compose restart

# Logs checken
docker compose logs -f app
```

### Änderungen werden nicht erkannt
```bash
# Volume Mounts prüfen
docker compose exec app ls -la /app/src

# File watcher resetten
docker compose restart
```

### Port bereits belegt
```bash
# Anderen Port nutzen
PORT=5174 docker compose up
```
