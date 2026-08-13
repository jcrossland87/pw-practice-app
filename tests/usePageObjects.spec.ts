// 77. GitHub Actions and Argos CI - updated playwright.config.ts timeout settings to run slower on GitHub Actions
// timeout: 240000,
// globalTimeout: 240000,
// Made timeout 4 times longer from 60000 (60000ms or 60s so now up to 240s)
// Also updated playwright.yml timeout-minutes to 120 from 60

// 77. GitHub Actions and Argos CI - updated usePageObjects.spec.ts and added new .github/workflows/playwright.yml
// added last test for use with Argos CI https://argos-ci.com/ test.only('testing with argos ci', async({page{}) => {
// where playwright.yml references package.json to run the test npm run pageObjects-chrome for usePageObjects.spec.ts

// 72. Test Tags - added tag @smoke on test 'navigate to form page @smoke'
// Then called the tag in the terminal to run only the tagged test with:
// npx playwright test --project=chromium --grep "@smoke" - or
// npx playwright test --project=chromium --grep "@regression"
// Quote "" the @ symbol PowerShell treats @ as variable like $
// Above example shows options to run 1 test with "@regress ion"
// and 2 tests with "@smoke"
// Can also run two separate tests tagged in different files.
// npx playwright test --project=chromium --grep "@block|@smoke"
// Runs two tests in /tests/uiComponents.spec.ts and two tests in /tests/usePageObjects.spect.ts
import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'
// Updated for 66. Screenshots & Videos Udemy Playwright course lesson 66. Screenshots & Videos 
// Updated for 67. Environment Variables - useful for CI for Dev and Test and Staging Variables
// baseURL: 'http://localhost:4200/', in playwright.config.ts referenced as ('/') in tests/usePageObjects.spec.ts and uiComponents.spec.ts

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('navigate to form page @smoke @regression', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo.formLayoutsPage()
    await pm.navigateTo.datepickerPage()
    await pm.navigateTo.smartTablePage()
    await pm.navigateTo.toastrPage()
    await pm.navigateTo.tooltipPage()    
})

test('parameterized methods @smoke', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo.formLayoutsPage()
    await pm.formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
    // 66. Updated for Screenshots & Videos Udemy Playwright course lesson 66. Screenshots & Videos 
    // Whole screenshot of the page
    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})
    // Can save screenshot as a binary file and then convert it to a base64 string
    const buffer = await page.screenshot()
    console.log(buffer.toString('base64'))
    // Drops binary into the test results
    await pm.formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
    // Partial screenshot of the page
    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'})
    await pm.navigateTo.datepickerPage()
    await pm.datepickerPage.selectCommonDatePickerDateFromToday(10)
    await pm.datepickerPage.selectDatepickerWithRangeFromToday(6, 15)
})

// 77. GitHub Actions and Argos CI - updated usePageObjects.spec.ts and added new .github/workflows/playwright.yml
// added last test for use with Argos CI https://argos-ci.com/ test.only('testing with argos ci', async({page{}) => {
// where playwright.yml references package.json to run the test npm run pageObjects-chrome for usePageObjects.spec.ts

test.only('testing with argos ci', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo.formLayoutsPage()
    await pm.navigateTo.datepickerPage()

})