import { defineConfig, devices } from '@playwright/test';

// Updated for 66. Screenshots & Videos Udemy Playwright course lesson 66. Screenshots & Videos 
// Updated for 67. Environment Variables - useful for CI for Dev and Test and Staging Variables
// baseURL: 'http://localhost:4200/', in playwright.config.ts referenced as ('/') in tests/usePageObjects.spec.ts and uiComponents.spec.ts
// added test.options.ts that defines globals QA string and array globalsQaURL that gets imported via TestOptions from ./test-options.ts

import type { TestOptions } from './test-options';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

// Updated for 67. Environment Variables - useful for CI for Dev and Test and Staging Variables
// added test.options.ts that defines globals QA string and array globalsQaURL that gets imported via TestOptions from ./test-options.ts

export default defineConfig<TestOptions>({
  // timeout: 40000,
  // globalTimeout: 60000,

  // expect:{
  //   timeout: 20000
  // },

  testDir: './tests',
  /* Run tests in files in parallel */
  // Updated to true for 65. Parallel Execution Udemy Playwright course lesson 65. Parallel Execution
  // fullyParallel: false,
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    // Updated for 67. Environment Variables - useful for CI for Dev and Test and Staging Variables
    // added test.options.ts that defines globals QA string and array globalsQaURL that gets imported via TestOptions from ./test-options.ts
    baseURL: 'http://localhost:4200/',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // actionTimeout: 5000, // 5 seconds
    // navigationTimeout: 5000, // 5 seconds
    // Updated for 66. Screenshots & Videos Udemy Playwright course lesson 66. Screenshots & Videos 
    video: {
      mode: 'on',
      size: {width: 1200, height: 800}
    }  
  },

  /* Configure projects for major browsers */

  // Updated for 67. Environment Variables - useful for CI for Dev and Test and Staging Variables
  // playwright.config.ts use projects for Environment Variables not just using baseURL property.
  // using 'Development-Environment and 'Staging-Environment' here for Environment Variables use.
  // then call projects for the environment with the command line argument --project=Development-Environment or --project=Staging-Environment
  // npx playwright test usePageObjects.spec.ts --project=Development-Environment
  // npx playwright test usePageObjects.spec.ts --project=Staging-Environment
  // npx playwright test uiComponents.spec.ts --project=Development-Environment
  // npx playwright test uiComponents.spec.ts --project=Staging-Environment
  // npx playwright test firstTest.spec.ts --project=Development-Environment
  // npx playwright test firstTest.spec.ts --project=Staging-Environment

  projects: [
    {
      name: 'Development-Environment',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/' 
      },
    },
    {
      name: 'Staging-Environment',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/' 
      },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
     {
       name: 'Microsoft Edge',
       use: { ...devices['Desktop Edge'], channel: 'msedge' },
     },
     {
       name: 'Google Chrome',
       use: { ...devices['Desktop Chrome'], channel: 'chrome' },
     },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
