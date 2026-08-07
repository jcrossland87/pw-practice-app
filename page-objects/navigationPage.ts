import { Page } from "@playwright/test";

export class NavigationPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Correct navigation menu (verified from live DOM)
    private menu() {
        return this.page.locator('nb-menu ul.menu-items');
    }

    private group(name: string) {
        return this.menu().getByRole('link', { name });
    }

    private item(name: string) {
        return this.menu().getByRole('link', { name });
    }

    async formLayoutsPage() {
        await this.group('Forms').click();
        await this.item('Form Layouts').click();
    }

    async datepickerPage() {
        await this.group('Forms').click();
        await this.item('Datepicker').click();
    }

    async toastrPage() {
        await this.group('Modal & Overlays').click();
        await this.item('Toastr').click();
    }

    async tooltipPage() {
        await this.group('Modal & Overlays').click();
        await this.item('Tooltip').click();
    }

    async smartTablePage() {
        await this.group('Tables & Data').click();
        await this.item('Smart Table').click();
    }
}
