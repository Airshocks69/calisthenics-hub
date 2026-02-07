# API Documentation

## Overview

Calisthenics Hub API ist eine RESTful API mit JWT-basierter Authentication. Die vollständige Swagger-Dokumentation ist unter `/api/docs` verfügbar.

## Base URL

```
Development: http://localhost:5000
Production: https://api.calisthenics-hub.com
```

## Authentication

Alle geschützten Endpoints erfordern einen JWT Token im `Authorization` Header:

```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### POST /api/auth/login
Nutzer einloggen.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "member"
  }
}
```

#### POST /api/auth/register
Neuen Nutzer registrieren.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
Wie bei Login mit neuem Nutzer.

#### POST /api/auth/refresh
Token erneuern mit Refresh Token.

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Users

#### GET /api/users (Admin only)
Alle Nutzer abrufen.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `role`: Filter by role (member, admin)

**Response (200):**
```json
{
  "users": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

#### GET /api/users/{id}
Nutzer nach ID abrufen.

**Response (200):**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "member",
  "createdAt": "2026-02-07T20:00:00Z"
}
```

#### PUT /api/users/{id}
Nutzer aktualisieren.

**Request:**
```json
{
  "firstName": "Jane",
  "lastName": "Doe"
}
```

**Response (200):**
Aktualisierter Nutzer.

### Exercises

#### GET /api/exercises
Alle Übungen abrufen.

**Query Parameters:**
- `category`: strength, flexibility, endurance, skill
- `difficulty`: beginner, intermediate, advanced
- `page`: Page number
- `limit`: Items per page

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "Push-ups",
    "description": "Classic upper body exercise",
    "category": "strength",
    "difficulty": "beginner",
    "instructions": "...",
    "imageUrl": "https://...",
    "videoUrl": "https://..."
  }
]
```

#### GET /api/exercises/{id}
Übung nach ID abrufen.

**Response (200):**
Einzelne Übung wie oben.

### Training

#### GET /api/training/reports
Trainingsberichte des Nutzers abrufen.

**Query Parameters:**
- `from`: Start date (ISO 8601)
- `to`: End date (ISO 8601)
- `page`: Page number

**Response (200):**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "date": "2026-02-07",
    "exercises": [
      {
        "exerciseId": "uuid",
        "sets": 3,
        "reps": 10,
        "weight": 20,
        "notes": "felt strong"
      }
    ],
    "duration": 45,
    "notes": "Great workout",
    "progress": 85
  }
]
```

#### POST /api/training/reports
Neuen Trainingsbericht erstellen.

**Request:**
```json
{
  "date": "2026-02-07",
  "exercises": [
    {
      "exerciseId": "uuid",
      "sets": 3,
      "reps": 10,
      "weight": 20
    }
  ],
  "duration": 45,
  "notes": "Great workout"
}
```

**Response (201):**
Erstellter Trainingsbericht.

### Products

#### GET /api/products
Alle Produkte abrufen.

**Query Parameters:**
- `category`: Filter by category
- `search`: Search by name
- `page`: Page number
- `limit`: Items per page

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "Pull-up Bar",
    "description": "Professional grade pull-up bar",
    "price": 49.99,
    "category": "equipment",
    "imageUrl": "https://...",
    "stock": 100
  }
]
```

#### POST /api/products (Admin only)
Neues Produkt erstellen.

**Request:**
```json
{
  "name": "Pull-up Bar",
  "description": "Professional grade pull-up bar",
  "price": 49.99,
  "category": "equipment",
  "imageUrl": "https://...",
  "stock": 100
}
```

**Response (201):**
Erstelltes Produkt.

### Orders

#### GET /api/orders
Bestellungen des Nutzers abrufen.

**Response (200):**
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "items": [
      {
        "productId": "uuid",
        "quantity": 2,
        "price": 49.99
      }
    ],
    "totalPrice": 99.98,
    "status": "completed",
    "createdAt": "2026-02-07T20:00:00Z"
  }
]
```

#### POST /api/orders
Neue Bestellung erstellen.

**Request:**
```json
{
  "items": [
    {
      "productId": "uuid",
      "quantity": 2
    }
  ]
}
```

**Response (201):**
Erstellte Bestellung.

## Error Handling

Alle Fehler folgen diesem Format:

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {... optional additional info ...}
  }
}
```

### Common Error Codes

- `UNAUTHORIZED` (401): Authentication erforderlich
- `FORBIDDEN` (403): Insufficient permissions
- `NOT_FOUND` (404): Resource not found
- `VALIDATION_ERROR` (400): Invalid input
- `INTERNAL_ERROR` (500): Server error

## Rate Limiting

API rate limits: 1000 requests pro Stunde pro IP.

## Versioning

Aktuelle Version: v1 (in den URLs nicht spezifiziert)
