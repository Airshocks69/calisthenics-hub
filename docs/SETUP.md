# Setup & Installation Guide

## Prerequisites

- **Node.js**: 18.x oder höher
- **Docker & Docker Compose**: Latest version
- **PostgreSQL**: 14+ (wird via Docker bereitgestellt)
- **Git**: For version control

## Option 1: Docker Setup (Empfohlen)

### Quick Start

```bash
# 1. Repository klonen
git clone https://github.com/YOUR_USERNAME/calisthenics-hub.git
cd calisthenics-hub

# 2. Environment-Variablen konfigurieren
cp .env.example .env

# 3. Docker Services starten
docker-compose up -d

# 4. Datenbank initialisieren
docker-compose exec backend npm run db:migrate
docker-compose exec backend npm run db:seed

# 5. Services überprüfen
docker-compose ps
```

### Verify Installation

```bash
# Frontend Health Check
curl http://localhost:3000

# Backend Health Check
curl http://localhost:5000/health

# API Docs
open http://localhost:5000/api/docs
```

### Logs anschauen

```bash
# Alle Logs
docker-compose logs -f

# Nur Backend
docker-compose logs -f backend

# Nur Frontend
docker-compose logs -f frontend
```

### Services stoppen

```bash
docker-compose down

# Mit Volume-Cleanup
docker-compose down -v
```

## Option 2: Lokale Entwicklung

### Frontend Setup

```bash
cd frontend

# Dependencies installieren
npm install

# Environment konfigurieren
cp .env.example .env.local

# Development Server starten
npm run dev
```

Die Frontend ist dann unter http://localhost:3000 verfügbar.

### Backend Setup

```bash
cd backend

# Dependencies installieren
npm install

# Environment konfigurieren
cp .env.example .env

# PostgreSQL starten (falls nicht lokal vorhanden)
# Oder Docker Container für DB:
docker run -d \
  --name calisthenics-postgres \
  -e POSTGRES_USER=calisthenics \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=calisthenics_db \
  -p 5432:5432 \
  postgres:16-alpine

# Datenbank initialisieren
npm run db:setup

# Development Server starten
npm run dev
```

Die API ist dann unter http://localhost:5000 verfügbar.

### Testing

```bash
# Frontend Tests
cd frontend && npm run test

# Backend Tests
cd backend && npm run test

# Mit Coverage Report
npm run test:coverage
```

## Environment Variables

Wichtige Variablen (siehe `.env.example` für komplette Liste):

### Datenbank
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=calisthenics
DB_PASSWORD=your_secure_password
DB_NAME=calisthenics_db
```

### JWT Authentication
```
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRE=7d
REFRESH_TOKEN_EXPIRE=30d
```

### Frontend
```
NEXT_PUBLIC_API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

### Email (für Notifications)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=app-password
```

## Troubleshooting

### Port bereits in Verwendung

```bash
# Port 3000 freigeben
lsof -ti:3000 | xargs kill -9

# Port 5000 freigeben
lsof -ti:5000 | xargs kill -9

# Port 5432 freigeben
lsof -ti:5432 | xargs kill -9
```

### Docker Container starten nicht

```bash
# Logs anschauen
docker-compose logs

# Container neu bauen
docker-compose down
docker-compose up --build

# Volumes löschen und neustarten
docker-compose down -v
docker-compose up -d
```

### Datenbank-Fehler

```bash
# Datenbank zurücksetzen
docker-compose exec postgres psql -U calisthenics -d calisthenics_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# Migrations erneut ausführen
docker-compose exec backend npm run db:migrate
```

### Node Dependencies-Fehler

```bash
# Cache löschen
npm cache clean --force

# Dependencies erneut installieren
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

### Environment Variablen setzen

```bash
# Sichere Werte in .env.production verwenden
NODE_ENV=production
JWT_SECRET=very-secure-random-string
DB_PASSWORD=very-secure-db-password
```

### Build Images

```bash
docker build -f frontend/Dockerfile -t calisthenics-hub:frontend-1.0.0 ./frontend
docker build -f backend/Dockerfile -t calisthenics-hub:backend-1.0.0 ./backend
```

### Push zu Registry (z.B. Docker Hub)

```bash
# Login
docker login

# Tag & Push
docker tag calisthenics-hub:frontend-1.0.0 username/calisthenics-hub:frontend-1.0.0
docker push username/calisthenics-hub:frontend-1.0.0

docker tag calisthenics-hub:backend-1.0.0 username/calisthenics-hub:backend-1.0.0
docker push username/calisthenics-hub:backend-1.0.0
```

### Docker Compose für Production

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - db_data:/var/lib/postgresql/data
    restart: always

  backend:
    image: username/calisthenics-hub:backend-1.0.0
    environment:
      NODE_ENV: production
      DB_HOST: postgres
    restart: always
    depends_on:
      - postgres

  frontend:
    image: username/calisthenics-hub:frontend-1.0.0
    restart: always

volumes:
  db_data:
```

## Weitere Ressourcen

- [API Documentation](./API.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Contributing Guidelines](../CONTRIBUTING.md)
- [Backend README](../backend/README.md)
- [Frontend README](../frontend/README.md)
