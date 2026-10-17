// The OpenSSL fallback belongs to legacy Webpack, not the user's global Node environment.
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const args = process.argv.slice(2);
const env = { ...process.env };
if (['serve', 'build'].includes(args[0])) {
  env.NODE_OPTIONS = [env.NODE_OPTIONS || '', '--openssl-legacy-provider'].join(' ').trim();
}
const result = spawnSync(process.execPath,
  [path.join(__dirname, '../node_modules/@vue/cli-service/bin/vue-cli-service.js'), ...args],
  { cwd: path.join(__dirname, '..'), env, stdio: 'inherit' });
if (result.error) console.error(result.error.message);
process.exit(result.status === null ? 1 : result.status);
