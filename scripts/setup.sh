#!/bin/bash

# Calisthenics Hub Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up Calisthenics Hub Development Environment..."

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "⚠️  Node.js is not installed. This is optional for Docker setup."
    echo "   For local development, visit: https://nodejs.org/"
else
    NODE_VERSION=$(node -v)
    echo "✅ Node.js $NODE_VERSION found"
fi

echo "✅ Prerequisites check passed"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please update .env with your configuration"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p logs
mkdir -p backend/migrations
mkdir -p backend/seeders

# Docker setup
echo "🐳 Setting up Docker..."
docker-compose build --no-cache

# Database setup
echo "🗄️  Initializing database..."
docker-compose up -d postgres
sleep 5

# Run migrations
echo "📚 Running database migrations..."
docker-compose run --rm backend npm run db:migrate

# Seed database
echo "🌱 Seeding database..."
docker-compose run --rm backend npm run db:seed

# Start all services
echo "🚀 Starting all services..."
docker-compose up -d

echo ""
echo "✨ Setup complete!"
echo ""
echo "📱 Frontend:   http://localhost:3000"
echo "🔌 Backend:    http://localhost:5000"
echo "📚 API Docs:   http://localhost:5000/api/docs"
echo "🗄️  Database:   localhost:5432"
echo ""
echo "View logs with: docker-compose logs -f"
echo "Stop services: docker-compose down"
echo ""
echo "Happy coding! 💪"
