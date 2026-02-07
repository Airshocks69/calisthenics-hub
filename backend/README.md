# Calisthenics Hub - Backend API

Enterprise-Level REST API für die Calisthenics Hub Plattform.

## Features

- ✅ JWT Authentication & Authorization
- ✅ RESTful API mit Swagger Docs
- ✅ PostgreSQL mit Sequelize ORM
- ✅ User Management (Members & Admins)
- ✅ Training Reports & Exercises
- ✅ E-Commerce Shop Integration
- ✅ Order Management
- ✅ Redis Caching
- ✅ Comprehensive Testing
- ✅ Docker Support
- ✅ CI/CD Ready

## Quick Start

### With Docker

```bash
docker-compose up backend
```

### Local Development

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Run migrations
npm run db:migrate

# Start development server
npm run dev
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build TypeScript
- `npm start` - Run production build
- `npm run lint` - ESLint check
- `npm run format` - Format with Prettier
- `npm run type-check` - TypeScript type check
- `npm test` - Run tests with coverage
- `npm run test:watch` - Watch mode tests
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with test data

## Project Structure

```
src/
├── routes/          # Express routes
├── controllers/     # Request handlers
├── models/          # Sequelize ORM models
├── services/        # Business logic
├── middleware/      # Express middleware (auth, etc.)
├── utils/          # Helper functions
├── config/         # Configuration files
├── swagger/        # OpenAPI/Swagger specs
└── index.ts        # Main application entry
```

## API Documentation

Visit `http://localhost:5000/api/docs` for full Swagger documentation.

## Environment Variables

See `.env.example` for all available variables.

### Required
- `DB_HOST` - PostgreSQL host
- `DB_PORT` - PostgreSQL port
- `DB_USER` - PostgreSQL user
- `DB_PASSWORD` - PostgreSQL password
- `DB_NAME` - PostgreSQL database name
- `JWT_SECRET` - JWT signing secret
- `API_PORT` - Server port

## Database

### Migrations

```bash
# Create new migration
npx sequelize-cli migration:generate --name migration-name

# Run migrations
npm run db:migrate

# Undo last migration
npm run db:migrate:undo
```

### Seeders

```bash
# Create new seeder
npx sequelize-cli seed:generate --name seeder-name

# Run all seeders
npm run db:seed

# Undo all seeders
npx sequelize-cli db:seed:undo:all
```

## Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- auth.test.ts

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage
```

## Authentication

API uses JWT (JSON Web Tokens) for authentication:

1. User logs in with email/password
2. Server returns JWT token + refresh token
3. Client includes JWT in Authorization header for protected routes
4. Server validates token and processes request

### Protected Routes

All routes prefixed with `/api/` require JWT authentication except:
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/exercises`
- `GET /api/products`

### Admin Routes

Some routes require `admin` role:
- User management endpoints
- Admin dashboard
- Product management
- Analytics

## Error Handling

All errors follow this format:

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE",
    "details": {}
  }
}
```

Common HTTP Status Codes:
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Performance

- Connection pooling for database
- Redis caching for frequent queries
- Request logging and monitoring
- Optimized database queries with Sequelize
- Compression enabled for responses

## Deployment

### Build Docker Image

```bash
docker build -t calisthenics-hub:backend-1.0.0 .
```

### Run Docker Container

```bash
docker run -p 5000:5000 \
  -e DB_HOST=postgres \
  -e DB_PORT=5432 \
  -e DB_USER=calisthenics \
  -e DB_PASSWORD=password \
  -e DB_NAME=calisthenics_db \
  -e JWT_SECRET=your-secret \
  calisthenics-hub:backend-1.0.0
```

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

## Support

For issues, questions, or feature requests:
- GitHub Issues: https://github.com/calisthenics-hub/issues
- Documentation: See `docs/` folder

## License

MIT License - See [LICENSE](../LICENSE)
