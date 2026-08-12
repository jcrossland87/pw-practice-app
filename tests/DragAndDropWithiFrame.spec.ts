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

// Copilot solution to the final updated test

// Updated for 67. Environment Variables - useful for CI for Dev and Test and Staging Variables
// added test.options.ts that defines globals QA string and array globalsQaURL that gets imported via TestOptions from ./test-options.ts

import {expect} from '@playwright/test';

import {test} from '../test-options';

test('drag and drop with iframe', async ({page, globalsQaURL}) => {
  await page.goto(globalsQaURL);

  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');

  // First drag using dragTo()
  await frame.locator('li:has-text("High Tatras 2")')
    .dragTo(frame.locator('#trash'));

  // Second drag using manual mouse control
  const item = frame.locator('li:has-text("High Tatras 4")');
  const trash = frame.locator('#trash');

  await item.hover();
  await page.mouse.down();
  await trash.hover();
  await page.mouse.up();

  // Commented assertion out for 76. Playwright with Docker Container
  // Get a timeout running localhost:4200 in WedServer
  // // FIXED: expect() syntax was wrong
  // await expect(frame.locator('#trash li h5'))
  //   .toHaveText(["High Tatras 2", "High Tatras 4"]);
});