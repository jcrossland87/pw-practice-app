// 73. Mobile Device Emulator
// testMobile.spec.ts added and added await page.locator('.sidebar-toggle').click()
// with mobile configured in playwright.config.ts for an Apple iPhone 13 Pro screen
// Inspect Element in browser to find the mobile screen locator to script its access
// Conditional run with mobile selected for .sidebar-toggle only needed in mobile
// if(testInfo.project.name == 'mobile'){
//     await page.locator('.sidebar-toggle').click()
// }
// Turn on mobile and it runs in mobile view. Turn on chromium and it runs normally. 

import {test, expect} from '@playwright/test'

test('input fields', async({page}, testInfo) => {

    await page.goto('/')
    
    // Conditional run with mobile selected for .sidebar-toggle only needed in mobile
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click()
    }
    
    // click .sidebar-toggle to open Forms
    // await page.locator('.sidebar-toggle').click()
    
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    
    // click .sidebar-toggle again to close Forms
    // await page.locator('.sidebar-toggle').click()

    // Conditional run with mobile selected for .sidebar-toggle only needed in mobile
    if(testInfo.project.name == 'mobile'){
        await page.locator('.sidebar-toggle').click()
    }

    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
    await usingTheGridEmailInput.fill('test@test.com')
    await usingTheGridEmailInput.clear()
    // Use pressSequentially with a delay to simulate slow key presses on input
    // await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500})
    // Cancelled delay to speed up test execution and avoid timeout error when running tests in parallel on CI/CD pipeline
    await usingTheGridEmailInput.pressSequentially('test2@test.com')

})