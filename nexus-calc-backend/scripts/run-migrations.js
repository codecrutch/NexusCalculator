const { execSync } = require('child_process');
const path = require('path');

async function runMigrations() {
  try {
    console.log('Running TypeORM migrations...');
    
    // Run the migration command
    const result = execSync('npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts', {
      encoding: 'utf8',
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..')
    });
    
    console.log('✅ Migrations completed successfully');
  } catch (error) {
    console.error('❌ Error running migrations:', error.message);
    process.exit(1);
  }
}

runMigrations(); 