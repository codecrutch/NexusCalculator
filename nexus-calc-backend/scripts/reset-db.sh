#!/bin/bash

# NexusCalculator Database Reset Script
# This script resets the database by removing and recreating the PostgreSQL container

set -e

echo "🔄 Resetting NexusCalculator database..."

# Check if PostgreSQL container exists
if docker ps -a --format "table {{.Names}}" | grep -q "nexus-postgres"; then
    echo "📦 Removing existing PostgreSQL container..."
    
    # Stop the container if it's running
    if docker ps --format "table {{.Names}}" | grep -q "nexus-postgres"; then
        echo "🛑 Stopping PostgreSQL container..."
        docker stop nexus-postgres
    fi
    
    # Remove the container
    docker rm nexus-postgres
    echo "✅ PostgreSQL container removed"
else
    echo "✅ No existing PostgreSQL container found"
fi

# Run the setup script to recreate the database
echo "🔄 Recreating database..."
./scripts/setup-db.sh

echo ""
echo "🎉 Database reset complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start the development server: npm run start:dev"
echo "2. Seed the database: ./scripts/seed-db.sh"
echo "3. Test the API endpoints" 