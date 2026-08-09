import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'
// Updated for 66. Screenshots & Videos Udemy Playwright course lesson 66. Screenshots & Videos 

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo.formLayoutsPage()
    await pm.navigateTo.datepickerPage()
    await pm.navigateTo.smartTablePage()
    await pm.navigateTo.toastrPage()
    await pm.navigateTo.tooltipPage()    
})

test('parameterized methods', async({page}) => {
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