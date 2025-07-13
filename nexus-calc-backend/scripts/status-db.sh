#!/bin/bash

# NexusCalculator Database Status Script
# This script checks the status of the database and containers

echo "📊 NexusCalculator Database Status"
echo "=================================="

# Check Colima status
echo ""
echo "🔧 Colima Status:"
if colima status >/dev/null 2>&1; then
    echo "✅ Colima is running"
else
    echo "❌ Colima is not running"
fi

# Check Docker status
echo ""
echo "🐳 Docker Status:"
if docker ps >/dev/null 2>&1; then
    echo "✅ Docker is available"
else
    echo "❌ Docker is not available"
fi

# Check PostgreSQL container
echo ""
echo "📦 PostgreSQL Container:"
if docker ps -a --format "table {{.Names}}" | grep -q "nexus-postgres"; then
    if docker ps --format "table {{.Names}}" | grep -q "nexus-postgres"; then
        echo "✅ PostgreSQL container is running"
        echo "   Container ID: $(docker ps --filter name=nexus-postgres --format '{{.ID}}')"
        echo "   Port: 5432"
    else
        echo "⚠️  PostgreSQL container exists but is not running"
        echo "   Run: docker start nexus-postgres"
    fi
else
    echo "❌ PostgreSQL container does not exist"
    echo "   Run: ./scripts/setup-db.sh"
fi

# Check .env file
echo ""
echo "📝 Environment Configuration:"
if [ -f .env ]; then
    echo "✅ .env file exists"
    echo "   Database: $(grep DB_DATABASE .env | cut -d'=' -f2)"
    echo "   Host: $(grep DB_HOST .env | cut -d'=' -f2)"
    echo "   Port: $(grep DB_PORT .env | cut -d'=' -f2)"
else
    echo "❌ .env file does not exist"
    echo "   Run: ./scripts/setup-db.sh"
fi

# Check development server
echo ""
echo "🚀 Development Server:"
if curl -s http://localhost:3000/ >/dev/null 2>&1; then
    echo "✅ Development server is running on http://localhost:3000"
else
    echo "❌ Development server is not running"
    echo "   Run: npm run start:dev"
fi

echo ""
echo "📋 Quick Commands:"
echo "   Setup database: ./scripts/setup-db.sh"
echo "   Seed database: ./scripts/seed-db.sh"
echo "   Reset database: ./scripts/reset-db.sh"
echo "   Start server: npm run start:dev" 