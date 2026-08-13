// 77. GitHub Actions and Argos CI - updated playwright.config.ts timeout settings to run slower on GitHub Actions
// timeout: 240000,
// globalTimeout: 240000,
// Made timeout 4 times longer from 60000 (60000ms or 60s so now up to 240s)
// Also updated playwright.yml timeout-minutes to 120 from 60

// 76. Playwright with Docker Container
// install Docker Container and WSL first
// Enable Hypervisor for Docker Container
// PowerShell Administrator command:
// Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
// Enable WSL2 and install default Ubuntu distro for Linux distro in WSL2
// wsl --install
// Install Docker Desktop for Windows from the Microsoft Store
// https://apps.microsoft.com/home - search for Docker Desktop and Ubuntu
// See Playwright Docker documentation: https://playwright.dev/docs/docker
// Check and match the Playwright version used in the Docker Playwright image
// https://playwright.dev/docs/docker mcr.microsoft.com/playwright:v1.59.1-noble
// Check Playwright version in the terminal with: npx playwright --version
// Check Playwright version in package.json: "@playwright/test": "^1.59.1",
// See Dockerfile for the setup of Docker image and see the terminal commands:
// docker build -t pw-pageobject-test . 
// docker images
// These commands create then view the docker image file: pw-pageobject-test
// Deleted /playwright-report/ folder contents and /test-results/ folder contents
// Expecting new report from Docker image test run 
// Then run the Docker image and run the tests in it
// docker run -it pw-pageobject-test
// /app# npm run pageObjects-chrome
// Then after the tests have run in the Docker container create a Docker Dash to put the results in
// Create a Docker Dash named docker-compose.yaml in VS Code Explorer that copies the test results
// Run the Docker Dash with this command in the terminal: docker-compose up --build

// 74. Reporter - playwright.config.ts can change reporter: 'html' to reporter: 'list' or reporter: 'json'
// to get different test report outputs as needed with the test report output displayed in the terminal
// see the Playwright documentation on Reporters at https://playwright.dev/docs/test-reporters
// see https://www.npmjs.com/package/allure-playwright and https://www.npmjs.com/package/allure for Allure
// install allure on the VS Code terminal with: npm i allure
// install allure-playwright on the VS Code terminal with: npm i allure-playwright
// Allure produces summary test reports that look like Azure Test Plans reports/TestRail Test Run reports
// Allure may be moot for Azure if can use Azure Test Plans for Playwright tests run in Azure for reports
// Allure would be useful for someone to setup using say GitHub Actions for CI instead of Azure DevOps CI


// 73. Mobile Device Emulator
// testMobile.spec.ts added and added await page.locator('.sidebar-toggle').click()
// with mobile configured in playwright.config.ts for an Apple iPhone 13 Pro screen
// Inspect Element in browser to find the mobile screen locator to script its access
// Conditional run with mobile selected for .sidebar-toggle only needed in mobile
// if(testInfo.project.name == 'mobile'){
//     await page.locator('.sidebar-toggle').click()
// }
// Turn on mobile and it runs in mobile view. Turn on chromium and it runs normally. 

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
  timeout: 240000,
  globalTimeout: 240000,

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
  // 74. Reporter - playwright.config.ts can change reporter: 'html' to reporter: 'list' or reporter: 'json'
  // to get different test report outputs as needed with the test report output displayed in the terminal
  // See https://www.npmjs.com/package/allure-playwright and https://www.npmjs.com/package/allure for Allure
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  // reporter: [['json', {outputFile: 'test-results/jsonReport.json'}]],
  // reporter: 'list',
  // reporter: [
  //   ['json', {outputFile: 'test-results/jsonReport.json'}],
  //   ['junit', {outputFile: 'test-results/junitReport.xml'}],
  //   ['allure-playwright']
  // ],
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
     {
       name: 'pageObjectFullScreen',
       testMatch: 'usePageObjects.spec.ts',
       use: {
         viewport: {width:1920, height: 1080}
       }
     },

// 73. Mobile Device Emulator
// testMobile.spec.ts added and added await page.locator('.sidebar-toggle').click()
// with mobile configured in playwright.config.ts for an Apple iPhone 13 Pro screen
// Inspect Element in browser to find the mobile screen locator to script its access
// Conditional run with mobile selected for .sidebar-toggle only needed in mobile
// if(testInfo.project.name == 'mobile'){
//     await page.locator('.sidebar-toggle').click()
// }
// Turn on mobile and it runs in mobile view. Turn on chromium and it runs normally. 

     {
       name: 'mobile',
       testMatch: 'testMobile.spec.ts',
       use: {
         ...devices['iPhone 13 Pro']
       }
     }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

  // 76. Playwright with Docker Container
  // install Docker Container and WSL first
  // Enable Hypervisor for Docker Container
  // PowerShell Administrator command:
  // Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
  // Enable WSL2 and install default Ubuntu distro for Linux distro in WSL2
  // wsl --install
  // Install Docker Desktop for Windows from the Microsoft Store
  // https://apps.microsoft.com/home - search for Docker Desktop and Ubuntu
  // See Playwright Docker documentation: https://playwright.dev/docs/docker

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/'
  }


  

});
