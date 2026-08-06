import { Page } from "@playwright/test";

export class NavigationPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // FIX: target the correct visible Nebular sidebar menu
    private menu() {
        return this.page.locator('nb-sidebar').locator('nb-menu');
    }

    private group(groupName: string) {
        return this.menu().getByRole('link', { name: groupName });
    }

    private item(itemName: string) {
        return this.menu().getByRole('link', { name: itemName });
    }

    private async selectGroupMenuItem(groupName: string) {
        const groupMenuItem = this.group(groupName);

        const collapsedIcon = groupMenuItem.locator('nb-icon[icon="chevron-right-outline"]');

        if (await collapsedIcon.isVisible()) {
            await groupMenuItem.click();
        }
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms');
        await this.item('Form Layouts').click();
    }

    async datepickerPage() {
        await this.selectGroupMenuItem('Forms');
        await this.item('Datepicker').click();
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data');
        await this.item('Smart Table').click();
    }

    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.item('Toastr').click();
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays');
        await this.item('Tooltip').click();
    }
}
