// 69. Fixtures added /tests/testWithFixtures.spec.ts and updated test-options.ts
// Fixtures in Playwright are a way to manage the setup and teardown.
// Ensures each test runs in an isolated and consistent environment.
// Provides the necessary context to a test making them a reusable test.
// Define Fixtures in Playwright once to reuse them across many tests.

import {test} from '../test-options'
import {faker} from '@faker-js/faker'

test('parameterized methods', async({pageManager}) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    // await pm.navigateTo.formLayoutsPage()
    await pageManager.formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
    await pageManager.formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false)

})