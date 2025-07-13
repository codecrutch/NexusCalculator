# Authentication Testing Guide

This guide shows you how to test the authentication system using curl commands.

## Prerequisites
- NestJS server running on http://localhost:3000
- PostgreSQL database running (via Colima)

## 1. Register a New User

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

Expected response:
```json
{
  "id": 1,
  "email": "test@example.com",
  "name": "Test User",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 2. Login to Get JWT Token

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Expected response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "test@example.com",
    "name": "Test User"
  }
}
```

## 3. Test Protected Endpoints

### Get User Profile (Protected)
```bash
# Replace YOUR_JWT_TOKEN with the token from login response
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Expected response:
```json
{
  "id": 1,
  "email": "test@example.com",
  "name": "Test User"
}
```

### Test Without Token (Should Fail)
```bash
curl -X GET http://localhost:3000/users/profile
```

Expected response:
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

## 4. Test Other Protected Endpoints

### Get All Users (Protected)
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get Specific User (Protected)
```bash
curl -X GET http://localhost:3000/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 5. Test Character Endpoints

### Create Character (Protected)
```bash
curl -X POST http://localhost:3000/characters \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Test Character",
    "level": 1,
    "experience": 0,
    "health": 100,
    "mana": 50,
    "strength": 10,
    "dexterity": 8,
    "intelligence": 12,
    "constitution": 14,
    "charisma": 10,
    "wisdom": 11
  }'
```

### Get All Characters (Protected)
```bash
curl -X GET http://localhost:3000/characters \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 6. Test Creature Endpoints

### Get All Creatures (Public)
```bash
curl -X GET http://localhost:3000/creatures
```

### Get Specific Creature (Public)
```bash
curl -X GET http://localhost:3000/creatures/1
```

## 7. Test Cave Endpoints

### Get All Caves (Public)
```bash
curl -X GET http://localhost:3000/caves
```

### Get Specific Cave (Public)
```bash
curl -X GET http://localhost:3000/caves/1
```

## 8. Complete Testing Script

Here's a complete script that tests the full authentication flow:

```bash
#!/bin/bash

echo "=== Testing Authentication System ==="

# 1. Register user
echo "1. Registering user..."
REGISTER_RESPONSE=$(curl -s -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }')
echo "Register response: $REGISTER_RESPONSE"

# 2. Login
echo -e "\n2. Logging in..."
LOGIN_RESPONSE=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }')
echo "Login response: $LOGIN_RESPONSE"

# Extract JWT token
JWT_TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"access_token":"[^"]*"' | cut -d'"' -f4)
echo "JWT Token: $JWT_TOKEN"

# 3. Test protected profile endpoint
echo -e "\n3. Testing protected profile endpoint..."
PROFILE_RESPONSE=$(curl -s -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer $JWT_TOKEN")
echo "Profile response: $PROFILE_RESPONSE"

# 4. Test unauthorized access
echo -e "\n4. Testing unauthorized access..."
UNAUTHORIZED_RESPONSE=$(curl -s -X GET http://localhost:3000/users/profile)
echo "Unauthorized response: $UNAUTHORIZED_RESPONSE"

echo -e "\n=== Authentication Testing Complete ==="
```

## 9. Troubleshooting

### Common Issues:

1. **Server not running**: Make sure the NestJS server is running on port 3000
2. **Database connection**: Ensure PostgreSQL is running via Colima
3. **JWT token expired**: Tokens expire after 1 hour by default
4. **Invalid credentials**: Double-check email and password

### Check Server Status:
```bash
curl http://localhost:3000
# Should return "Hello World!"
```

### Check Database Connection:
```bash
# If you have psql available
psql -h localhost -p 5432 -U postgres -d nexus_calc_dev
```

## 10. Environment Variables

Make sure these environment variables are set in your `.env` file:
```
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=nexus_calc_dev
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=1h
``` 