import { defineConfig } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

// Reuse an installed Chromium when Playwright's own download isn't there (CHROME_PATH overrides).
const localChromium = path.join(process.env.LOCALAPPDATA ?? '', 'ms-playwright/chromium-1234/chrome-win64/chrome.exe');
const executablePath = process.env.CHROME_PATH ?? (fs.existsSync(localChromium) ? localChromium : undefined);

/**
 * `site` tests run against the production build served with vercel.json's headers (CSP included): run `npm run build`
 * first. `api` tests run against the dev server, which serves /api/contact.
 */
export default defineConfig({
  testDir: 'tests',
  timeout: 45_000,
  retries: 0,
  reporter: [['list']],
  use: { launchOptions: executablePath ? { executablePath } : {} },
  projects: [
    { name: 'site', testMatch: /site\.spec\.ts/, use: { baseURL: 'http://localhost:4322' } },
    { name: 'api', testMatch: /api\.spec\.ts/, use: { baseURL: 'http://localhost:4323' } },
  ],
  webServer: [
    { command: 'node scripts/serve-static.mjs 4322', url: 'http://localhost:4322', reuseExistingServer: true },
    { command: 'npx astro dev --port 4323', url: 'http://localhost:4323', reuseExistingServer: true, timeout: 120_000 },
  ],
});
