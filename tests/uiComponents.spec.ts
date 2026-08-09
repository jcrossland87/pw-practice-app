import {test, expect} from '@playwright/test'

test.describe.configure({mode: 'parallel'}) // run tests in parallel mode for this describe block

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        // Use pressSequentially with a delay to simulate slow key presses on input
        // await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay: 500})
        // Cancelled delay to speed up test execution and avoid timeout error when running tests in parallel on CI/CD pipeline
        await usingTheGridEmailInput.pressSequentially('test2@test.com')

        //generic assertion of input fields
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    test('radio buttons', async({page}) => {
        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
        //using force: true with check to check the checkbox selected below
        await usingTheGridForm.getByLabel('Option 1').check({force: true})
        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        //validation assertions
        expect(radioStatus).toBeTruthy()
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

        //test to check Option 1 radio button is no longer selected with tobeFalsy()
        await usingTheGridForm.getByLabel('Option 2').check({force: true})
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()

    })
})

test('checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force: true})
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true})

    //select or unselect all checkboxes on the page
    const allBoxes = page.getByRole('checkbox')
    //add a JS loop to loop through all checkboxes remembering to use await to not timeout and expect toBeTruthy to validate assertion all boxes checked
    for(const box of await allBoxes.all()){
        await box.check({force: true})
        expect(await box.isChecked()).toBeTruthy()
    }

})

//Lists and dropdowns - note the text for the lists may be separate to the control for the lists when inspect elements

test('lists and dropdowns', async({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') //when the list has a UL tag
    page.getByRole('listitem') //when the list has an LI tag

    //const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option') //does same as const optionList = page.getByRole('list').locator('nb-option')
    //passing assertion below
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]) // array of optionList list available of the selection in UI
    //failing assertion below
    //await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate2"]) // array of optionList list available of the selection in UI

    await optionList.filter({hasText: "Cosmic"}).click()
    //validate cosmic background color by checking RGB value in CSS
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    //now validate each selection from list and color change for each selection from list
    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }
 
    //loop through list with for loop for each color
    await dropDownMenu.click()
    for (const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color != "Corporate")
            await dropDownMenu.click()
    }
})


//Tooltips - tricky to find in the DOM as a popup - need to find the element
//Inspect > Sources > Hover over Tooltip > F8 on Windows to freeze browser
//Go back to Elements and explore the selection for more details to find it 
//look for nb-tooltip tag then drill down to find the ngcontent tag for text
//then you have the text for the tooltip to make an assertion on playwright

test('tooltips', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
    await toolTipCard.getByRole('button', {name: "Top"}).hover()

    page.getByRole('tooltip') // if you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')


})


// Dialog boxes - handling dialogs that show in PW-test Tables & Data Smart Table as get a browser dialog separately to an app dialog

test('browser dialog box', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

})

//This is a basic Playwright test to open all the dialogs in the Announcer webapp to check they open as expected

test('webapp dialog box 1', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Dialog').click()
    await page.getByText('Open Dialog with Component').click()
    await page.getByText('Dismiss Dialog').click() 

})

test('webapp dialog box 2', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Dialog').click()
    await page.getByText('Open Dialog with Template').click()
    await page.getByText('Close Dialog').click() 

})


test('webapp dialog box 4', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Dialog').click()
    await page.getByText('Open Dialog without Backdrop').click()
    await page.getByText('Close Dialog').click() 

})

test('webapp dialog box 5', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Dialog').click()
    await page.getByText('Open Dialog with Esc Close').click()
    await page.getByText('Dismiss Dialog').click() 

})

test('webapp dialog box 6', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Dialog').click()
    await page.getByText('Open Dialog without Esc Close').click()
    await page.getByText('Close Dialog').click() 

})

test('webapp dialog box 7', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Dialog').click()
    await page.getByText('Open Dialog with Backdrop Click').click()
    await page.getByText('Dismiss Dialog').click() 

})

// Web Tables (Part 1 and Part 2)

test('web tables 1 and 2', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // Get the row by any test in this row
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    // 2 get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    // add an assertion with await expect and validate the filled email value entered
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')

    // Web Tables (Part 2) - how to loop through the table rows and validate the table - could be used for Test mode of Announcer to read

    // 3 test filter of the table - add a delay when Playwright runs faster than app

    const ages = ["20", "30", "40", "200"]

    for(let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        // add a delay when Playwright runs faster than app
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')

        for(let row of await ageRows.all()){
            const cellValue = await row.locator('td').last().textContent()

            // add handling for last value not to equal value expected in array

            if(age == "200"){
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(cellValue).toEqual(age)
            }
        }
    }
})

// Date Picker (Part 1)

test('datepicker 1', async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    // 14 is unique unlike 1 that has multiple entries with 1 that needs exact qualifier
    //await page.locator('[class="day-cell ng-star-inserted"]').getByText('14').click()

    // have to specify exact argument with getByText as 1 returns all containing 1 not only 1 value
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()
    await expect(calendarInputField).toHaveValue('Aug 1, 2026')

})

// Date Picker (Part 2)

test('datepicker 2', async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    // look up js date in browser search
    // developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
    // Date() without arguments returns the current date
    // setDate allows you to set a date forward from the current date

    let date = new Date()
    date.setDate(date.getDate() + 14)
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear()
    // must use {} not () with JS interpolation to embed variables inside string 
    // result of using () not {} was loop condition didn't match calendar header
    // so script kept clicking the next-month arrow continuously until timed out 
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    // added code below that allows setting the date into the next month
    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
    //! NOT operator - so while not calendarMonthAndYear includes expectedMonthAndYear
    while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }
        
    // 14 is unique unlike 1 that has multiple entries with 1 that needs exact qualifier
    //await page.locator('[class="day-cell ng-star-inserted"]').getByText('14').click()

    // have to specify exact argument with getByText as 1 returns all containing 1 not only 1 value
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
    await expect(calendarInputField).toHaveValue(dateToAssert)

})

// Sliders - first example moves slider change values without mouse/trackpad/cursor movement

test('sliders', async({page}) => {
    //Update attribute
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGauge.evaluate( node => {
       node.setAttribute('cx', '232.630')
       node.setAttribute('cx', '232.630')
    })
    await tempGauge.click()

    // Sliders - second example moves slider by mouse/trackpad/cursor movement - what a user does with a slider
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    // this is an important keyword for Announcer 1.0 await tempBox.scrollIntoViewIfNeeded() needed for scrolling
    await tempBox.scrollIntoViewIfNeeded()

    await tempBox.boundingBox()

    // create coordinates in the centre of bounding box for slider control
    const box = await tempBox.boundingBox()
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2

    // move mouse from the centre of the bounding box
    await page.mouse.move(x, y)
    // mouse.down simulates left mouse button to drag
    await page.mouse.down()
    // move mouse horiztonally
    await page.mouse.move(x+100, y)
    // move mouse vertically
    await page.mouse.move(x+100, y+100)
    // mouse.up simulates left mouse button to drop
    await page.mouse.up()
    await expect(tempBox).toContainText('30')
})


