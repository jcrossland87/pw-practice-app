import { Locator, Page } from "@playwright/test";

export class NavigationPage {

    readonly page: Page
    readonly fromLayoutMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page) {
        this.page = page
        this.fromLayoutMenuItem = page.getByText('Form Layouts')
        this.datePickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem = page.getByText('Smart Table')
        this.toastrMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip')
    }

    async formLayoutsPage() {
        await this.page.getByText('Forms').click()
        await this.fromLayoutMenuItem.click()
    }

    async datepickerPage() {
        await this.page.getByText('Forms').click()
        await this.datePickerMenuItem.click()
    }

    async smartTablePage() {
        await this.page.getByText('Tables & Data').click()
        await this.smartTableMenuItem.click()
    }

    async toastrPage() {
        await this.page.getByText('Modal & Overlays').click()
        await this.toastrMenuItem.click()    
    }

    async tooltipPage() {
        await this.page.getByText('Modal & Overlays').click()
        await this.tooltipMenuItem.click()
    }
}