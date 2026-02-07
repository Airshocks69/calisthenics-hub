# Calisthenics Hub

Ein Enterprise-Level Calisthenics-Trainingsplattform mit modernem Tech-Stack.

## 🎯 Features

- **Landing Page**: Informativ & SEO-optimiert
- **Member Area**: Private Trainingsberichte, Fortschriftsanalyse, Übungskatalog
- **Shop**: E-Commerce mit Produktkatalog & Bestellverwaltung
- **Admin Dashboard**: User-Management, Content-Management, Analytics
- **Mobile-Ready**: Vollständig responsive Design
- **Enterprise-Grade**: Docker, PostgreSQL, JWT Auth, Testing, CI/CD

## 🏗️ Architektur

```
calisthenics-hub/
├── frontend/              # React/Next.js + TypeScript
├── backend/               # Node.js/Express + TypeScript
├── docker/                # Docker & Compose Konfiguration
├── docs/                  # API-Dokumentation & Guides
└── scripts/               # Setup & Utility-Scripts
```

## 🚀 Quick Start

### Voraussetzungen

- Docker & Docker Compose
- Node.js 18+ (für lokale Entwicklung)
- PostgreSQL 14+ (wird via Docker bereitgestellt)

### Mit Docker Compose (empfohlen)

```bash
# Repository klonen
git clone https://github.com/YOUR_USERNAME/calisthenics-hub.git
cd calisthenics-hub

# Environment Setup
cp .env.example .env

# Starten
docker-compose up -d

# Datenbank initialisieren
docker-compose exec backend npm run db:migrate
```

Die Applikation ist dann verfügbar unter:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Dashboard**: http://localhost:3000/admin
- **API Docs**: http://localhost:5000/api/docs

### Lokale Entwicklung

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
npm run db:setup
npm run dev
```

## 📁 Projektstruktur

```
frontend/
├── public/
├── src/
│   ├── components/          # Reusable Components
│   ├── pages/               # Next.js Pages & Routes
│   ├── styles/              # Global Styles
│   ├── hooks/               # Custom React Hooks
│   ├── services/            # API Services
│   ├── utils/               # Utility Functions
│   └── types/               # TypeScript Types
├── tests/                   # Jest Tests
├── next.config.js
├── tsconfig.json
└── package.json

backend/
├── src/
│   ├── routes/              # API Routes
│   ├── controllers/         # Business Logic
│   ├── models/              # Database Models (Sequelize)
│   ├── middleware/          # Express Middleware
│   ├── services/            # Business Services
│   ├── utils/               # Utilities
│   ├── config/              # Configuration
│   └── swagger/             # Swagger/OpenAPI Specs
├── migrations/              # Database Migrations
├── seeders/                 # Database Seeders
├── tests/                   # Unit & Integration Tests
├── Dockerfile
└── package.json
```

## 🔐 Authentifizierung

- **JWT (JSON Web Tokens)** für stateless Authentication
- **Refresh Tokens** für erweiterte Sessions
- **Role-Based Access Control (RBAC)** für Permissions

## 🗄️ Datenbank

PostgreSQL mit Sequelize ORM.

**Schema:**
- Users (Member, Admins)
- Trainingsberichte
- Übungen/Trainingsplans
- Produkte
- Bestellungen
- Analytics Events

## 🧪 Testing

```bash
# Frontend Tests
cd frontend && npm run test

# Backend Tests
cd backend && npm run test

# Coverage
npm run test:coverage
```

## 🐳 Docker

```bash
# Build & Start
docker-compose up --build

# Logs
docker-compose logs -f

# Datenbank in den Container
docker-compose exec backend npx sequelize-cli db:migrate

# Stop
docker-compose down
```

## 📚 API Dokumentation

Swagger/OpenAPI Dokumentation verfügbar unter `/api/docs`

Siehe `docs/API.md` für detaillierte Endpunkte.

## 🔄 CI/CD Pipeline

GitHub Actions automatisiert:
- ✅ Linting & Code Quality Checks
- ✅ Unit & Integration Tests
- ✅ Docker Build & Push
- ✅ Deployment (optional)

Siehe `.github/workflows/` für Details.

## 📝 Umgebungsvariablen

Siehe `.env.example` für erforderliche Variablen.

## 🤝 Contributing

Siehe `CONTRIBUTING.md` für Guidelines.

## 📄 Lizenz

MIT License - siehe `LICENSE` Datei.

## 👨‍💼 Support

Für Issues & Fragen: GitHub Issues oder Dokumentation unter `docs/`.

---

**Entwickelt mit 💪 für Calisthenics-Enthusiasten**
