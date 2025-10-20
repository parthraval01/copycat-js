// scripts/build.js
// Small helper that prints guidance; primary build handled by npm scripts and rollup configs.
const { execSync } = require('child_process');

console.log('Running full build via rollup (ESM + CJS + UMD)...');
try {
    execSync('npm run build:esm', { stdio: 'inherit' });
    execSync('npm run build:cjs', { stdio: 'inherit' });
    execSync('npm run build:umd', { stdio: 'inherit' });
    console.log('Build complete. Files are in ./dist');
} catch (err) {
    console.error('Build failed:', err.message || err);
    process.exit(1);
}
