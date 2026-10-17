// Keep legacy Webpack compatibility local to this build subprocess.
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const options = [process.env.NODE_OPTIONS || '', '--openssl-legacy-provider'].join(' ').trim();
const result = spawnSync(process.execPath, [
  path.join(__dirname, '../node_modules/@vue/cli-service/bin/vue-cli-service.js'),
  'build', '--mode', 'workflow', '--dest', '.checks-dist',
], {
  cwd: path.join(__dirname, '..'),
  env: { ...process.env, NODE_ENV: 'production', NODE_OPTIONS: options },
  stdio: 'inherit',
});
if (result.error) console.error(result.error.message);
process.exit(result.status === null ? 1 : result.status);
