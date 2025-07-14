#!/bin/bash

echo "Testing Password Reset Functionality"
echo "==================================="

# Test 1: Request password reset
echo "1. Requesting password reset for test@example.com..."
curl -X POST http://localhost:3000/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'

echo -e "\n\n2. Requesting password reset for Google OAuth user..."
curl -X POST http://localhost:3000/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"email": "google-user@example.com"}'

echo -e "\n\n3. Testing token validation..."
curl -X GET "http://localhost:3000/auth/validate-reset-token?token=invalid-token"

echo -e "\n\n4. Testing password reset with token..."
curl -X POST http://localhost:3000/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token": "valid-token", "newPassword": "newpassword123"}'

echo -e "\n\nPassword reset testing complete!" 