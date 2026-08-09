import { test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';

test.beforeAll(async ({ page }) => {
    await page.goto('http://localhost:4200/');
})

test('Navigate to form layouts page', async ({ page }) => {
    const pom = new PageManager(page)
    await pom.navigateTo.formLayoutsPage();
    await pom.navigateTo.datepickerPage();
    await pom.navigateTo.toastrPage();
    await pom.navigateTo.smartTablePage();
});

test('Parameterized page object methods', async({page}) => {
    const pom = new PageManager(page)
    await pom.navigateTo.formLayoutsPage();
    await pom.formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('artem@test.com', 'Welcome', 'Option 2');
    await pom.formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('Artem Bordar', 'artem@test.com', false);
    await pom.navigateTo.datepickerPage();
    await pom.datepickerPage.selectCommonDatePickerDateFromToday(5);
    await pom.datepickerPage.selectDatepickerWithRangeFromToday(7, 20);
})


