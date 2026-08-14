// Section 5. UI Components 44. Drag & Drop 
// Needs https://playground.bondacademy.com/pages/extra-components/drag-drop to run it so make it a separate .spec.ts file
// localhost.4200 after npm start in pw-practice-app does not have IoT Dashboard > Extra Components > Drag & Drop to select

// Section 5. UI Components 44. Drag & Drop 
// Commented out Argos and WebServer code in playwright.config.ts and uncommented reporter: html
// Updated to run drag-drop-bondar-academy.spec.ts that I missed earlier to complete the course
// Runs https://playground.bondaracademy.com/pages/extra-components/drag-drop not localhost:4200 built with npm start in pw-practice-app

import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playground.bondaracademy.com/');
})

test('Drag & Drop', async({page}) => {
    await page.getByText('Extra Components').click()
    await page.getByText('Drag & Drop').click()
    // 1. First Option - pick it from locator
    await page.getByText('Clean my room').dragTo(page.locator('#drop-list'))
    // 2. Second Option - mimic mouse movement
    await page.getByText('Get groceries').hover()
    await page.mouse.down()
    await page.locator('#drop-list').hover()
    await page.mouse.up()
})