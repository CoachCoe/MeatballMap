const fs = require('fs');
const path = require('path');

const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

try {
  const envPath = path.join(process.cwd(), '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = envContent.split('\n').reduce((acc, line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      acc[key.trim()] = value.trim();
    }
    return acc;
  }, {});

  // Check if we're in development mode
  if (envVars['NEXT_PUBLIC_DEV_MODE'] === 'true') {
    console.log('\x1b[33m%s\x1b[0m', '⚠ Development mode: Skipping Firebase config validation');
    process.exit(0);
  }

  const missingVars = requiredEnvVars.filter(varName => !envVars[varName]);

  if (missingVars.length > 0) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: Missing required environment variables:');
    missingVars.forEach(varName => {
      console.error('\x1b[31m%s\x1b[0m', `- ${varName}`);
    });
    process.exit(1);
  }

  console.log('\x1b[32m%s\x1b[0m', '✓ All required environment variables are set');
  process.exit(0);
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', 'Error reading .env.local file:', error.message);
  process.exit(1);
} 