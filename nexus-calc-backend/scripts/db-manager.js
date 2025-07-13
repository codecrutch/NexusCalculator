const { execSync } = require('child_process');

const commands = {
  start: 'docker run -d --name nexus-calc-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=nexus_calc_dev -p 5432:5432 postgres:15',
  stop: 'docker stop nexus-calc-postgres && docker rm nexus-calc-postgres',
  reset: 'docker stop nexus-calc-postgres 2>/dev/null || true && docker rm nexus-calc-postgres 2>/dev/null || true && docker run -d --name nexus-calc-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=nexus_calc_dev -p 5432:5432 postgres:15',
  status: 'docker ps --filter name=nexus-calc-postgres',
  seed: 'docker exec -i nexus-calc-postgres psql -U postgres -d nexus_calc_dev < db/seed.sql'
};

const action = process.argv[2];

if (!action || !commands[action]) {
  console.log('Database Manager');
  console.log('Usage: node scripts/db-manager.js <action>');
  console.log('');
  console.log('Available actions:');
  console.log('  start   - Start PostgreSQL container');
  console.log('  stop    - Stop and remove PostgreSQL container');
  console.log('  reset   - Reset PostgreSQL container (stop, remove, start)');
  console.log('  status  - Check container status');
  console.log('  seed    - Seed database with initial data');
  process.exit(1);
}

try {
  console.log(`Executing: ${action}`);
  const result = execSync(commands[action], { encoding: 'utf8', stdio: 'inherit' });
  console.log(`✅ ${action} completed successfully`);
} catch (error) {
  console.error(`❌ Error during ${action}:`, error.message);
  process.exit(1);
} 