// // Drag and Drop with iFrames globalsqa.com/demo-site/draganddrop/

// import {test, expect} from '@playwright/test'

// test('drag and drop with iframe', async({page}) => {
//     await page.goto('https://www.globalsqa.com/demo-site/draganddrop');

//     // have to switch into the iFrame first
//     const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');

//     await frame.locator('li', {hasText:"High Tatras 2"}).dragTo(frame.locator('#trash'));

// })

// Copilot solution to issue below - missed chaneing await.frame - still had await.page for locator as URL

// import { test, expect } from '@playwright/test';

// test('drag and drop with iframe', async ({ page }) => {
//   await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');

//   // Switch into the iframe
//   const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');

//   // Drag item inside the iframe to the trash inside the iframe
//   await frame.locator('li:has-text("High Tatras 2")')
//     .dragTo(frame.locator('#trash'));

//   // more precise control
//   await frame.locator('li:has-text("High Tatras 4")')
//     .hover();

//   await page.mouse.down()
//   await frame.locator('#trash').hover()
//   await page.mouse.up()

//   await expect(frame.locator)('#trash li h5').toHaveText(["High Tatras 2", "High Tatras 4"])

// });

// Copilot solution to the final updated test

import { test, expect } from '@playwright/test';

test('drag and drop with iframe', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/demo-site/draganddrop/');

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

  // FIXED: expect() syntax was wrong
  await expect(frame.locator('#trash li h5'))
    .toHaveText(["High Tatras 2", "High Tatras 4"]);
});