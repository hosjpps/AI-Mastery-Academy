// Script to apply SQL migration to Supabase
// Run with: node scripts/apply-migration.js

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ksaakkaoczfdwgsrbgvg.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function applyMigration() {
  if (!SERVICE_ROLE_KEY) {
    console.error('❌ SUPABASE_SERVICE_ROLE_KEY not set');
    console.log('Run: export SUPABASE_SERVICE_ROLE_KEY="your-key-here"');
    process.exit(1);
  }

  const migrationPath = path.join(__dirname, '../supabase/migrations/001_initial_schema.sql');
  const sql = fs.readFileSync(migrationPath, 'utf8');

  console.log('📦 Applying migration to Supabase...');
  console.log(`   URL: ${SUPABASE_URL}`);

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ sql_query: sql }),
    });

    if (!response.ok) {
      // Try alternative method - direct SQL via pg endpoint
      console.log('⚠️  RPC method not available, trying direct approach...');

      // Split SQL into statements and execute via REST
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      console.log(`   Found ${statements.length} SQL statements`);
      console.log('');
      console.log('❌ Direct SQL execution requires Supabase Dashboard or CLI');
      console.log('');
      console.log('Please run this SQL in Supabase Dashboard:');
      console.log('1. Go to: https://supabase.com/dashboard/project/ksaakkaoczfdwgsrbgvg/sql');
      console.log('2. Paste the migration SQL');
      console.log('3. Click "Run"');
      console.log('');
      console.log(`Migration file: ${migrationPath}`);
      return;
    }

    const result = await response.json();
    console.log('✅ Migration applied successfully!');
    console.log(result);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('');
    console.log('Please apply migration manually in Supabase Dashboard:');
    console.log('https://supabase.com/dashboard/project/ksaakkaoczfdwgsrbgvg/sql');
  }
}

applyMigration();
