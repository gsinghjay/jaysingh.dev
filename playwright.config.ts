import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for jaysingh.dev
 *
 * Targets: 11ty static site (migration from React SPA)
 * PRD Requirements: Lighthouse 100, WCAG 2.1 AA, clean URLs
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests/e2e',
  outputDir: './test-results',

  // Parallel execution
  fullyParallel: true,
  workers: process.env.CI ? 1 : undefined,

  // Prevent .only() in CI
  forbidOnly: !!process.env.CI,

  // Retries
  retries: process.env.CI ? 2 : 0,

  // Reporters
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['list'],
  ],

  // Timeouts
  timeout: 60_000,
  expect: { timeout: 10_000 },

  use: {
    // Base URL - 11ty dev server (port 8080)
    baseURL: process.env.BASE_URL || 'http://localhost:8080',

    // Action timeouts
    actionTimeout: 15_000,
    navigationTimeout: 30_000,

    // Artifacts on failure
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // 11ty dev server configuration
  webServer: {
    command: 'npm run dev:11ty',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },

  projects: [
    // Desktop browsers (PRD: Browser Support Matrix - latest 2 versions)
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Clipboard permissions for Story 2.4 copy tests (Chromium only)
        permissions: ['clipboard-read', 'clipboard-write'],
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Mobile browsers (PRD: Mobile Safari iOS, Chrome Mobile Android)
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        // Clipboard permissions for Story 2.4 copy tests (Chromium only)
        permissions: ['clipboard-read', 'clipboard-write'],
      },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
});
