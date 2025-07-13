const { execSync } = require('child_process');

console.log('=== Testing API Endpoints ===\n');

const endpoints = [
  { name: 'Users', url: 'http://localhost:3000/users', method: 'GET' },
  { name: 'Characters', url: 'http://localhost:3000/characters', method: 'GET' },
  { name: 'Creatures', url: 'http://localhost:3000/creatures', method: 'GET' },
  { name: 'Caves', url: 'http://localhost:3000/caves', method: 'GET' },
  { name: 'Auth Status', url: 'http://localhost:3000', method: 'GET' }
];

try {
  for (const endpoint of endpoints) {
    console.log(`Testing ${endpoint.name}...`);
    try {
      const response = execSync(`curl -s -X ${endpoint.method} ${endpoint.url}`, { encoding: 'utf8' });
      console.log(`✅ ${endpoint.name}: ${response.substring(0, 100)}${response.length > 100 ? '...' : ''}`);
    } catch (error) {
      console.log(`❌ ${endpoint.name}: Error - ${error.message}`);
    }
    console.log('');
  }

  console.log('=== API Testing Complete ===');
} catch (error) {
  console.error('Error during API testing:', error.message);
  console.log('\nMake sure the server is running on http://localhost:3000');
} 