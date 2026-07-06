import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('User facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    
    //can do a combination of regular locator amd user facing locaor and GPS and terminals
    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()

}) 

// Parent Elements - requires Inspect elements 
test('locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()
    
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name: "Email"}).click()
})

//Basic reuse of locators for a simple sign in test
test('Reusing the locators', async({page}) => {
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).fill('test@test.com')
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('button').click()

})

//Reuse of locators for a simple sign in test using a constant
test('Using const for locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    await basicForm.getByRole('textbox', {name: "Email"}).fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.getByRole('button').click()

})

//Reuse of locators for a simple sign in test using a constant and assertion
//updated import to add expect - import {test, expect} from '@playwright/test'
//expect is the assertion checker for Playwright like pytest assert for python
test('Using 3 x const and 1 x expect for locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    const passWord = basicForm.getByRole('textbox', {name: "Password"})
    
    await emailField.fill('test@test.com')
    await passWord.fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
    await expect(passWord).toHaveValue('Welcome123')
})

//Test to validate the button text on the basic form is SUBMIT
test('extracting values - pass expected', async({page}) => {
    //single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

})

//Test to validate the button text on the basic form is SUBMIT
test('extracting values - fail expected', async({page}) => {
    //single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit2')

})

//Test to validate the button text on the basic form is SUBMIT and check radio button text
test('extracting values - check radio button text - pass expected', async({page}) => {
    //single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

})

//Test to validate the button text on the basic form is SUBMIT and check radio button text
test('extracting values - check radio button text - fail expected', async({page}) => {
    //single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 3")

})

//Test to validate the button text on the basic form is SUBMIT and check input value
test('extracting values - check input value - pass expected', async({page}) => {
    //single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

})

//Test to validate the button text on the basic form is SUBMIT and check attribute
test('extracting values - check attribute - pass expected', async({page}) => {
    //single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')

})

//Example of general assertion logic below
test('assertions - pass - 5 = 5', async({page}) => {

    //General assertions
    const value = 5
    expect(value).toEqual(5)

})

test('assertions - fail - 5 != 6', async({page}) => {

    //General assertions
    const value = 5
    expect(value).toEqual(6)
    
})

test('assertions - button text - soft assertion passes', async({page}) => {

    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

    //Button text assertion

    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    //Locator assertion with await for a 5 secs wait
    await expect(basicFormButton).toHaveText('Submit')

    //Soft Assertion - continues test if fails to keep testing
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()

})

test('assertions - button text - soft assertion fails', async({page}) => {

    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

    //Button text assertion

    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    //Locator assertion with await for a 5 secs wait
    await expect(basicFormButton).toHaveText('Submit')

    //Soft Assertion - continues test if fails to keep testing
    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()

})