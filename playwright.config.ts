import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig, devices } from '@playwright/test';

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const VITE_PORT = process.env.VITE_PORT || 3000;
// WARNING: If running playwright as npm run start, that  means building it and that also meeds NODE_ENV=production
// which means loading redis production. You will need a bastion host to connect to it.
// OPTION: When working locally. Stop next dev server. Then run e2e playwright test as npm run dev

export default defineConfig({
  timeout: 15000,
  // 1 second isn't enough after filling input. 1.6 is ok
  // 2 seconds isn't enough with parallel tests in same file
  // 4 seconds isn't enough across whole test suite
  // 6 seconds isn't enough currently with whole test suite, when checking iframe is attached after autocomplete.click walkthrough
  // 10 seconds isn't enough currently for trailer click
  // do runinband.
  // `npx playwright test --workers=1`
  testDir: path.join(__dirname, 'e2e'),
  retries: 0,
  outputDir: 'playwright-output/',
  webServer: {
    command: 'cross-env VITE_PLAYWRIGHT_TEST=true vite',
    url: `http://localhost:${VITE_PORT}`,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe', // or 'ignore' to hide console.logs
    stderr: 'pipe', // or 'ignore' to hide
  },
  // Depends on Docker version to run, so its not in strict mode. so react helmet correctly updates title.
  // Therefore will need bastion host working
  use: {
    baseURL: `http://localhost:${VITE_PORT}`,
    launchOptions: {
      args: ['--enable-clipboard-autocopy'],
    },
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        launchOptions: {
          args: ['--enable-logging', '--v=1'],
        },
      },
    },
  ],
});
