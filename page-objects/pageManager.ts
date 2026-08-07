import { Page, expect } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatepickerPage } from '../page-objects/datepickerPage'

export class PageManager{

    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly formLayouts: FormLayoutsPage;
    private readonly datepicker: DatepickerPage;   


    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.formLayouts = new FormLayoutsPage(this.page);
        this.datepicker = new DatepickerPage(this.page);
    }

    get navigateTo(){
        return this.navigationPage;
    }

    get formLayoutsPage(){
        return this.formLayouts;
    }

    get datepickerPage(){
        return this.datepicker;
    }
    
}