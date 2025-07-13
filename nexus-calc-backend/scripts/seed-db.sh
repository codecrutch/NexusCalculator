#!/bin/bash

# NexusCalculator Database Seeding Script
# This script seeds the database with initial data for development

set -e

echo "🌱 Seeding NexusCalculator database..."

# Check if the development server is running
if ! curl -s http://localhost:3000/ >/dev/null 2>&1; then
    echo "❌ Development server is not running. Please start it with: npm run start:dev"
    exit 1
fi

echo "✅ Development server is running"

# Create sample users
echo "👤 Creating sample users..."
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@nexuscalc.com", "encrypted_password": "admin123"}' \
  -s >/dev/null

curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"email": "player@nexuscalc.com", "encrypted_password": "player123"}' \
  -s >/dev/null

echo "✅ Sample users created"

# Create sample caves
echo "🏔️ Creating sample caves..."
CAVE1=$(curl -X POST http://localhost:3000/cave \
  -H "Content-Type: application/json" \
  -d '{"cavename": "Shadowmire Cavern", "requirements": "Level 5", "coordinates": "X:150 Y:200", "boss": "Shadow Lord", "drops": "Shadow Essence, Dark Crystal"}' \
  -s | jq -r '.id')

CAVE2=$(curl -X POST http://localhost:3000/cave \
  -H "Content-Type: application/json" \
  -d '{"cavename": "Crystal Peak", "requirements": "Level 10", "coordinates": "X:300 Y:400", "boss": "Crystal Guardian", "drops": "Crystal Shards, Magic Ore"}' \
  -s | jq -r '.id')

CAVE3=$(curl -X POST http://localhost:3000/cave \
  -H "Content-Type: application/json" \
  -d '{"cavename": "Abyssal Depths", "requirements": "Level 15", "coordinates": "X:500 Y:600", "boss": "Abyssal Horror", "drops": "Abyssal Core, Void Essence"}' \
  -s | jq -r '.id')

echo "✅ Sample caves created"

# Create sample creatures
echo "🐉 Creating sample creatures..."
curl -X POST http://localhost:3000/creature \
  -H "Content-Type: application/json" \
  -d "{\"creaturename\": \"Shadow Imp\", \"vita\": 30, \"ac\": 8, \"caveId\": $CAVE1}" \
  -s >/dev/null

curl -X POST http://localhost:3000/creature \
  -H "Content-Type: application/json" \
  -d "{\"creaturename\": \"Dark Knight\", \"vita\": 80, \"ac\": 15, \"caveId\": $CAVE1}" \
  -s >/dev/null

curl -X POST http://localhost:3000/creature \
  -H "Content-Type: application/json" \
  -d "{\"creaturename\": \"Crystal Golem\", \"vita\": 120, \"ac\": 18, \"caveId\": $CAVE2}" \
  -s >/dev/null

curl -X POST http://localhost:3000/creature \
  -H "Content-Type: application/json" \
  -d "{\"creaturename\": \"Frost Wyrm\", \"vita\": 200, \"ac\": 20, \"caveId\": $CAVE2}" \
  -s >/dev/null

curl -X POST http://localhost:3000/creature \
  -H "Content-Type: application/json" \
  -d "{\"creaturename\": \"Void Walker\", \"vita\": 150, \"ac\": 16, \"caveId\": $CAVE3}" \
  -s >/dev/null

echo "✅ Sample creatures created"

# Create sample characters
echo "⚔️ Creating sample characters..."
curl -X POST http://localhost:3000/character \
  -H "Content-Type: application/json" \
  -d '{"name": "Thorin Ironfist", "path": "Warrior", "subpath": "Guardian", "vita": 120, "mana": 30, "might": 18, "will": 12, "grace": 8, "alignment": "Good", "title": "Shield Bearer", "clan": "Ironfist Clan", "clantitle": "Guardian", "userId": 1}' \
  -s >/dev/null

curl -X POST http://localhost:3000/character \
  -H "Content-Type: application/json" \
  -d '{"name": "Elara Moonwhisper", "path": "Mage", "subpath": "Elementalist", "vita": 80, "mana": 150, "might": 6, "will": 18, "grace": 12, "alignment": "Neutral", "title": "Storm Caller", "clan": "Moonwhisper Order", "clantitle": "Elementalist", "userId": 1}' \
  -s >/dev/null

curl -X POST http://localhost:3000/character \
  -H "Content-Type: application/json" \
  -d '{"name": "Raven Shadowstep", "path": "Assassin", "subpath": "Silent Blade", "vita": 90, "mana": 40, "might": 14, "will": 10, "grace": 16, "alignment": "Chaotic", "title": "Night Walker", "clan": "Shadow Brotherhood", "clantitle": "Silent Blade", "userId": 2}' \
  -s >/dev/null

echo "✅ Sample characters created"

echo ""
echo "🎉 Database seeding complete!"
echo ""
echo "📊 Seeded data:"
echo "   - 2 users (admin@nexuscalc.com, player@nexuscalc.com)"
echo "   - 3 caves (Shadowmire Cavern, Crystal Peak, Abyssal Depths)"
echo "   - 5 creatures (Shadow Imp, Dark Knight, Crystal Golem, Frost Wyrm, Void Walker)"
echo "   - 3 characters (Thorin Ironfist, Elara Moonwhisper, Raven Shadowstep)"
echo ""
echo "🔗 Test the API:"
echo "   - Get all users: curl http://localhost:3000/user"
echo "   - Get all caves: curl http://localhost:3000/cave"
echo "   - Get all characters: curl http://localhost:3000/character"
echo "   - Get all creatures: curl http://localhost:3000/creature" 