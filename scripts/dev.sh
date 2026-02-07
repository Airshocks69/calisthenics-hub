#!/bin/bash

# Development script to start services with proper logging

set -e

echo "🚀 Starting Calisthenics Hub Development Environment..."

# Check if docker-compose.yml exists
if [ ! -f docker-compose.yml ]; then
    echo "❌ docker-compose.yml not found"
    exit 1
fi

# Check if services are already running
if docker-compose ps | grep -q "Up"; then
    echo "⚠️  Some services are already running"
    echo "Run 'docker-compose down' to stop them first"
    exit 1
fi

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env from .env.example"
fi

# Start services
echo "📦 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check health
echo ""
echo "🏥 Health checks:"

# Frontend
if curl -s http://localhost:3000 &> /dev/null; then
    echo "✅ Frontend is running: http://localhost:3000"
else
    echo "⏳ Frontend is starting..."
fi

# Backend
if curl -s http://localhost:5000/health &> /dev/null; then
    echo "✅ Backend is running: http://localhost:5000"
    echo "✅ API Docs: http://localhost:5000/api/docs"
else
    echo "⏳ Backend is starting..."
fi

# Database
if docker-compose exec -T postgres pg_isready -U calisthenics &> /dev/null; then
    echo "✅ Database is ready"
else
    echo "⏳ Database is starting..."
fi

echo ""
echo "📚 Useful commands:"
echo "  docker-compose logs -f          # View all logs"
echo "  docker-compose logs -f backend  # View backend logs"
echo "  docker-compose logs -f frontend # View frontend logs"
echo "  docker-compose down             # Stop all services"
echo ""
