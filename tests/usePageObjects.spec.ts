import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'

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
    await pm.formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)
    // await pm.formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('John Smith', 'John@test.com', false)
    // await pm.navigateTo.datepickerPage()
    // await pm.datepickerPage.selectCommonDatePickerDateFromToday(10)
    // await pm.datepickerPage.selectDatepickerWithRangeFromToday(6, 15)
})