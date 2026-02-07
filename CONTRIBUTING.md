# Contributing Guidelines

Danke, dass du zu Calisthenics Hub beitragen möchtest! 💪

## Code von Conduct

Sei respektvoll und inklusiv. Wir akzeptieren keine Discrimination oder Harassment.

## Vor dem Start

1. **Fork** das Repository
2. **Clone** dein Fork: `git clone https://github.com/YOUR_USERNAME/calisthenics-hub.git`
3. **Branch erstellen**: `git checkout -b feature/my-feature` oder `bugfix/my-bug`

## Development Setup

```bash
# Dependencies installieren
npm install

# Environment konfigurieren
cp .env.example .env

# Docker-Services starten
docker-compose up -d

# Datenbank migrieren
npm run db:migrate

# Dev-Server starten
npm run dev
```

## Code Standards

### TypeScript & Linting

```bash
# Type Check
npm run type-check

# Lint
npm run lint

# Format (Prettier)
npm run format
```

### Commits

Verwende Conventional Commits:

```
feat: Neue Feature beschreiben
fix: Bug fix beschreiben
docs: Dokumentations-Update
style: Code Style Änderungen
refactor: Code Refactoring
test: Test-Änderungen
chore: Dependencies, Build-Prozess, etc.

Beispiel:
feat: Trainingsberichte für Members hinzufügen
fix: JWT Token Refresh Bug behoben
```

### Branch Naming

- `feature/description` - Neue Features
- `bugfix/description` - Bug Fixes
- `docs/description` - Dokumentation
- `refactor/description` - Refactoring
- `chore/description` - Maintenance

## Pull Requests

1. **Tests schreiben**: Neue Features & Fixes sollten Tests haben
2. **Tests laufen lassen**:
   ```bash
   npm run test
   npm run test:coverage
   ```
3. **Linting durchführen**:
   ```bash
   npm run lint
   npm run format
   ```
4. **PR erstellen** mit beschreibendem Title & Description
5. **Review abwarten** von den Maintainern

## Testing

Alle neuen Features sollten Tests haben:

```bash
# Unit Tests
npm run test:unit

# Integration Tests
npm run test:integration

# E2E Tests (wenn verfügbar)
npm run test:e2e

# Coverage Report
npm run test:coverage
```

## Dokumentation

- Wichtige Features sollten in `docs/` dokumentiert sein
- API-Endpoints sollten Swagger-Kommentare haben
- README sollte aktualisiert werden für neue Features

## Projektstruktur

Halte dich an die bestehende Struktur:

**Frontend:**
```
src/
├── components/    # React Components
├── pages/        # Next.js Pages
├── hooks/        # Custom Hooks
├── services/     # API Calls
├── types/        # TypeScript Types
└── utils/        # Helper Functions
```

**Backend:**
```
src/
├── routes/       # Express Routes
├── controllers/  # Business Logic
├── models/       # Database Models
├── middleware/   # Middleware
├── services/     # Business Services
└── utils/        # Helpers
```

## Review Process

- Mindestens 1-2 Approvals vor Merge
- All CI/CD Checks müssen passing sein
- Keine ungelösten Conversations

## Release/Deployment

1. Increment Version in `package.json`
2. Update `CHANGELOG.md`
3. Create GitHub Release Tag
4. CI/CD Pipeline deployt automatisch

## Fragen?

- **Issues**: GitHub Issues für Bugs & Feature Requests
- **Discussions**: GitHub Discussions für Fragen & Ideen
- **Docs**: Siehe `docs/` für Dokumentation

---

Danke für deinen Beitrag! 🎉
