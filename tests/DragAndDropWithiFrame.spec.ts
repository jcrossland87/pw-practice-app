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

  // FIXED: expect() syntax was wrong
  await expect(frame.locator('#trash li h5'))
    .toHaveText(["High Tatras 2", "High Tatras 4"]);
});