import { test } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutsPage } from '../page-objects/formLayoutsPage';
import { DatepickerPage } from '../page-objects/datepickerPage';

test.beforeAll(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/');
})

test('Navigate to form layouts page', async ({ page }) => {
    const navigateTo = new NavigationPage(page);
    await navigateTo.formLayoutsPage();
    await navigateTo.datepickerPage();
    await navigateTo.smartTablePage();
});

test('Parameterized page object methods', async({page}) => {
    const navigateTo = new NavigationPage(page);
    const formLayoutsPage = new FormLayoutsPage(page);
    const datepickerPage = new DatepickerPage(page);
    await navigateTo.formLayoutsPage();
    await formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('artem@test.com', 'Welcome', 'Option 2');
    await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('Artem Bordar', 'artem@test.com', false);
    await navigateTo.datepickerPage();
    await datepickerPage.selectCommonDatePickerDateFromToday(5);
    await datepickerPage.selectDatepickerWithRangeFromToday(7, 20);
})


