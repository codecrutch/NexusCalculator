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