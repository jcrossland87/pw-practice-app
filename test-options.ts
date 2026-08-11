// Added for 67. Environment Variables - useful for CI for Dev and Test and Staging Variables
import {test as base} from '@playwright/test'
import {PageManager} from '../pw-practice-app/page-objects/pageManager'

export type TestOptions = {
    globalsQaURL: string
    // 69. Fixtures added /tests/testWithFixtures.spec.ts and updated test-options.ts
    formLayoutsPage: string
    pageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalsQaURL: ['', {option: true}],

    formLayoutsPage: [async({page}, use) => {
        await page.goto('/')
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        await use('')
        console.log('Tear Down')
    // auto: true option to automatically initialise     
    }, {auto: true}],

    pageManager: async({page, formLayoutsPage}, use) => {
        const pm = new PageManager(page)
        await use(pm)
    }

})