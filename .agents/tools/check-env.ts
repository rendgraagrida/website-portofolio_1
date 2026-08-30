const REQUIRED_ENVS = ['TURSO_DATABASE_URL', 'TURSO_AUTH_TOKEN'];
let allGood = true;

for (const env of REQUIRED_ENVS) {
  if (!Bun.env[env]) {
    console.error(`❌ Error: Environment variable ${env} is not set.`);
    allGood = false;
  } else {
    console.log(`✅ ${env} is set.`);
  }
}

if (!allGood) {
  process.exit(1);
}
console.log('Semua environment variables tersedia.');
