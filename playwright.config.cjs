const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 20000,
  retries: 0,
  reporter: [['list'], ['json', { outputFile: '.check-reports/browser.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    channel: process.env.E2E_CHANNEL || undefined,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    serviceWorkers: 'block',
  },
  webServer: { command: 'node scripts/serve-check.cjs', url: 'http://127.0.0.1:4173', reuseExistingServer: false },
});
