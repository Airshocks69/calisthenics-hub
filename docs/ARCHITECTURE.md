# Architecture Overview

## System Design

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser / Client                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTPS/WebSocket
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Frontend (Next.js/React)                        │
│  ┌────────┬──────────┬──────────┬────────────┐              │
│  │ Pages  │Components│Services  │   Store    │              │
│  │        │(Reusable)│ (API)    │ (Zustand)  │              │
│  └────────┴──────────┴──────────┴────────────┘              │
│                    Port 3000                                │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ REST/GraphQL API
                       │
┌──────────────────────▼──────────────────────────────────────┐
│             Backend (Node.js/Express)                       │
│  ┌──────────┬─────────────┬─────────┬──────────┐            │
│  │Routes   │Controllers  │Services │Middleware│            │
│  │& Models │(Business L.)│(Logic)  │(Auth,...)│            │
│  └──────────┴─────────────┴─────────┴──────────┘            │
│            Port 5000                                        │
│                                                              │
│  ┌──────────────────────────────────────────────┐           │
│  │     Swagger/OpenAPI Docs at /api/docs       │           │
│  └──────────────────────────────────────────────┘           │
└──────────────────────┬──────────────────────────────────────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
       ▼               ▼               ▼
   PostgreSQL      Redis         External APIs
     (Data)      (Cache)      (Payment, Email)
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Testing**: Jest + React Testing Library
- **SEO**: next-seo

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Sequelize
- **Database**: PostgreSQL 14+
- **Authentication**: JWT
- **Validation**: Joi / Express Validator
- **API Docs**: Swagger/OpenAPI
- **Logging**: Winston
- **Caching**: Redis
- **Testing**: Jest + Supertest

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Version Control**: Git
- **Environment**: .env configuration

## Directory Structure

```
calisthenics-hub/
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Next.js pages & routes
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service layer
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Helper functions
│   │   └── styles/          # Global styles
│   ├── tests/               # Test files
│   ├── Dockerfile
│   ├── next.config.js
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── routes/          # Express routes
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # Sequelize models
│   │   ├── services/        # Service layer
│   │   ├── middleware/      # Express middleware
│   │   ├── utils/           # Helper functions
│   │   ├── config/          # Configuration
│   │   └── swagger/         # OpenAPI specs
│   ├── migrations/          # DB migrations
│   ├── seeders/             # DB seeders
│   ├── tests/               # Test files
│   ├── Dockerfile
│   └── tsconfig.json
│
├── docs/
│   ├── API.md               # API documentation
│   ├── SETUP.md             # Setup guide
│   └── ARCHITECTURE.md      # This file
│
├── docker-compose.yml
├── .env.example
├── .github/
│   └── workflows/           # CI/CD pipelines
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

## Data Models

### Users
```
id (UUID)
email (string, unique)
password (hashed)
firstName (string)
lastName (string)
role (member | admin)
createdAt (timestamp)
updatedAt (timestamp)
```

### Exercises
```
id (UUID)
name (string)
description (text)
category (strength | flexibility | endurance | skill)
difficulty (beginner | intermediate | advanced)
instructions (text)
imageUrl (string)
videoUrl (string)
createdAt (timestamp)
```

### TrainingReports
```
id (UUID)
userId (UUID) -> Users
date (date)
exercises (JSON) -> array of exercises with sets/reps
duration (minutes)
notes (text)
progress (percentage)
createdAt (timestamp)
```

### Products
```
id (UUID)
name (string)
description (text)
price (decimal)
category (string)
imageUrl (string)
stock (integer)
createdAt (timestamp)
updatedAt (timestamp)
```

### Orders
```
id (UUID)
userId (UUID) -> Users
items (JSON) -> array of product items
totalPrice (decimal)
status (pending | completed | cancelled)
createdAt (timestamp)
updatedAt (timestamp)
```

## API Architecture

### Request Flow

1. **Client Request** → Browser sends HTTP/HTTPS request
2. **Frontend Handler** → Next.js page/API route processes request
3. **API Service** → Axios client makes call to backend
4. **Express Route** → Backend routes to appropriate endpoint
5. **Middleware Stack** → Auth, validation, logging processed
6. **Controller** → Business logic execution
7. **Service Layer** → Database/external service calls
8. **Database** → Sequelize ORM queries PostgreSQL
9. **Response** → JSON response back through stack
10. **Frontend** → Response handled, UI updated

### Authentication Flow

```
1. User Login (email/password)
   ↓
2. Backend validates credentials
   ↓
3. Generate JWT Token + Refresh Token
   ↓
4. Return tokens to frontend
   ↓
5. Frontend stores JWT in secure cookie/localStorage
   ↓
6. All subsequent requests include JWT in Authorization header
   ↓
7. Backend middleware verifies JWT signature
   ↓
8. Request proceeds or rejects based on token validity
```

## Security

- **JWT Authentication**: Stateless, secure token-based auth
- **Password Hashing**: bcryptjs for secure password storage
- **CORS**: Configured to allow frontend origin only
- **Helmet**: HTTP security headers
- **Input Validation**: Joi/Express Validator on all inputs
- **SQL Injection Protection**: ORM prevents SQL injection
- **Rate Limiting**: Implemented on API routes
- **HTTPS**: Enforced in production
- **Environment Variables**: Sensitive data in .env files

## Scalability

### Horizontal Scaling
- Stateless architecture allows multiple backend instances
- Load balancer distribution across instances
- Redis for distributed caching/sessions

### Caching Strategy
- Frontend: React Query cache for API responses
- Backend: Redis for frequent queries
- Database: Query optimization, indexing

### Database Optimization
- Connection pooling
- Query optimization with Sequelize
- Proper indexing on frequently queried columns
- Read replicas for high traffic scenarios

## Deployment

### Development
- Docker Compose for local multi-service setup
- Hot reload for fast development cycle

### Production
- Docker images pushed to registry
- Kubernetes/Docker Swarm for orchestration
- RDS for managed PostgreSQL
- Elastic Beanstalk or similar for app hosting
- CloudFront/CDN for static assets

## Monitoring & Logging

- **Winston**: Structured logging
- **Health Checks**: `/health` endpoint
- **Error Tracking**: Integration with Sentry (optional)
- **Performance Monitoring**: New Relic/DataDog (optional)
- **Database Monitoring**: Query logs, slow query logs

## Testing Strategy

### Frontend
- Unit tests for components
- Integration tests for pages
- E2E tests with Playwright/Cypress

### Backend
- Unit tests for services
- Integration tests with test database
- API endpoint tests with Supertest

## CI/CD Pipeline

GitHub Actions workflows:
1. **Lint & Format Check**: ESLint, Prettier
2. **Type Check**: TypeScript compilation
3. **Unit Tests**: Jest tests with coverage
4. **Integration Tests**: Full stack tests
5. **Build**: Docker image building
6. **Push**: Registry push (optional)
7. **Deploy**: Automated deployment (optional)
