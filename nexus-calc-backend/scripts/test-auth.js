const { execSync } = require('child_process');

console.log('=== Testing Authentication System ===\n');

try {
  // 1. Register user
  console.log('1. Registering user...');
  const registerResponse = execSync('curl -s -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d \'{"email":"test@example.com","password":"password123","name":"Test User"}\'', { encoding: 'utf8' });
  console.log('Register response:', registerResponse);

  // 2. Login
  console.log('\n2. Logging in...');
  const loginResponse = execSync('curl -s -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d \'{"email":"test@example.com","password":"password123"}\'', { encoding: 'utf8' });
  console.log('Login response:', loginResponse);

  // Extract JWT token
  const tokenMatch = loginResponse.match(/"access_token":"([^"]+)"/);
  const jwtToken = tokenMatch ? tokenMatch[1] : null;
  console.log('JWT Token:', jwtToken ? `${jwtToken.substring(0, 20)}...` : 'Not found');

  if (jwtToken) {
    // 3. Test protected profile endpoint
    console.log('\n3. Testing protected profile endpoint...');
    const profileResponse = execSync(`curl -s -X GET http://localhost:3000/users/profile -H "Authorization: Bearer ${jwtToken}"`, { encoding: 'utf8' });
    console.log('Profile response:', profileResponse);

    // 4. Test other protected endpoints
    console.log('\n4. Testing other protected endpoints...');
    const usersResponse = execSync(`curl -s -X GET http://localhost:3000/users -H "Authorization: Bearer ${jwtToken}"`, { encoding: 'utf8' });
    console.log('Users response:', usersResponse);
  }

  // 5. Test unauthorized access
  console.log('\n5. Testing unauthorized access...');
  const unauthorizedResponse = execSync('curl -s -X GET http://localhost:3000/users/profile', { encoding: 'utf8' });
  console.log('Unauthorized response:', unauthorizedResponse);

  console.log('\n=== Authentication Testing Complete ===');
} catch (error) {
  console.error('Error during testing:', error.message);
  console.log('\nMake sure the server is running on http://localhost:3000');
} 