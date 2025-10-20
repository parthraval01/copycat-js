// scripts/run-tests.js
// Run the test suite (Vitest). This file acts as a convenience wrapper.
const { execSync } = require('child_process');

try {
    execSync('npx vitest', { stdio: 'inherit' });
} catch (err) {
    console.error('Tests failed or Vitest not installed. Run `npm install` first.');
    process.exit(1);
}
