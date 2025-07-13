#!/bin/bash

# NexusCalculator Database Setup Script
# This script sets up PostgreSQL in Colima for development

set -e

echo "🚀 Setting up NexusCalculator development database..."

# Check if Colima is running
if ! colima status >/dev/null 2>&1; then
    echo "❌ Colima is not running. Starting Colima..."
    colima start
    echo "✅ Colima started successfully"
else
    echo "✅ Colima is running"
fi

# Check if Docker is available
if ! docker ps >/dev/null 2>&1; then
    echo "❌ Docker is not available. Please ensure Docker is installed and accessible."
    exit 1
fi

# Check if PostgreSQL container already exists
if docker ps -a --format "table {{.Names}}" | grep -q "nexus-postgres"; then
    echo "📦 PostgreSQL container already exists"
    
    # Check if it's running
    if docker ps --format "table {{.Names}}" | grep -q "nexus-postgres"; then
        echo "✅ PostgreSQL container is already running"
    else
        echo "🔄 Starting existing PostgreSQL container..."
        docker start nexus-postgres
        echo "✅ PostgreSQL container started"
    fi
else
    echo "📦 Creating new PostgreSQL container..."
    docker run --name nexus-postgres \
        -e POSTGRES_DB=nexus_calc_dev \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=postgres \
        -p 5432:5432 \
        -d postgres:15
    
    echo "⏳ Waiting for PostgreSQL to start..."
    sleep 5
    
    # Wait for PostgreSQL to be ready
    for i in {1..30}; do
        if docker exec nexus-postgres pg_isready -U postgres >/dev/null 2>&1; then
            echo "✅ PostgreSQL is ready"
            break
        fi
        if [ $i -eq 30 ]; then
            echo "❌ PostgreSQL failed to start within 30 seconds"
            exit 1
        fi
        sleep 1
    done
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Database configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=nexus_calc_dev
EOF
    echo "✅ .env file created"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎉 Database setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start the development server: npm run start:dev"
echo "2. Seed the database: ./scripts/seed-db.sh"
echo "3. Test the API endpoints"
echo ""
echo "🔗 Database connection details:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: nexus_calc_dev"
echo "   Username: postgres"
echo "   Password: postgres" 