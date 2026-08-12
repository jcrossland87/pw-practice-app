# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: usePageObjects.spec.ts >> navigate to form page @smoke @regression
- Location: tests\usePageObjects.spec.ts:22:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('nb-menu ul.menu-items').getByRole('link', { name: 'Datepicker' })
    - locator resolved to <a title="Datepicker" href="/pages/forms/datepicker" class="ng-tns-c143-4 ng-star-inserted" ng-reflect-router-link="/pages/forms/datepicker">…</a>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action
    - <a href="#" aria-expanded="false" title="Modal & Overlays" class="ng-tns-c143-5 ng-star-inserted">…</a> from <li nbmenuitem="" _ngcontent-ttv-c144="" ng-reflect-menu-item="[object Object]" class="menu-item ng-tns-c143-5 ng-star-inserted">…</li> subtree intercepts pointer events
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <a href="#" title="Forms" aria-expanded="false" class="ng-tns-c143-2 ng-star-inserted active">…</a> intercepts pointer events
  - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <li nbmenuitem="" _ngcontent-ttv-c144="" ng-reflect-menu-item="[object Object]" class="menu-item ng-tns-c143-2 ng-star-inserted">…</li> intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <a href="#" aria-expanded="false" title="Modal & Overlays" class="ng-tns-c143-5 ng-star-inserted">…</a> from <li nbmenuitem="" _ngcontent-ttv-c144="" ng-reflect-menu-item="[object Object]" class="menu-item ng-tns-c143-5 ng-star-inserted">…</li> subtree intercepts pointer events
  19 × retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <a href="#" title="Forms" aria-expanded="false" class="ng-tns-c143-2 ng-star-inserted active">…</a> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <li nbmenuitem="" _ngcontent-ttv-c144="" ng-reflect-menu-item="[object Object]" class="menu-item ng-tns-c143-2 ng-star-inserted">…</li> intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <a href="#" aria-expanded="false" title="Modal & Overlays" class="ng-tns-c143-5 ng-star-inserted">…</a> from <li nbmenuitem="" _ngcontent-ttv-c144="" ng-reflect-menu-item="[object Object]" class="menu-item ng-tns-c143-5 ng-star-inserted">…</li> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <a href="#" aria-expanded="false" title="Modal & Overlays" class="ng-tns-c143-5 ng-star-inserted">…</a> from <li nbmenuitem="" _ngcontent-ttv-c144="" ng-reflect-menu-item="[object Object]" class="menu-item ng-tns-c143-5 ng-star-inserted">…</li> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e7]:
  - navigation [ref=e9]:
    - generic [ref=e10]:
      - generic [ref=e11]:
        - generic [ref=e12]:
          - link [ref=e13] [cursor=pointer]:
            - /url: "#"
            - img [ref=e15]
          - link "PW-test" [ref=e23] [cursor=pointer]:
            - /url: "#"
        - button "Light" [ref=e25] [cursor=pointer]:
          - generic [ref=e26]: Light
          - img [ref=e28]
      - generic [ref=e34]:
        - button [ref=e37] [cursor=pointer]:
          - img [ref=e39]
        - link [ref=e45] [cursor=pointer]:
          - /url: "#"
          - img [ref=e47]
        - link [ref=e53] [cursor=pointer]:
          - /url: "#"
          - img [ref=e55]
        - generic [ref=e65] [cursor=pointer]: Nick Jones
  - generic [ref=e66]:
    - list [ref=e71]:
      - listitem [ref=e72]:
        - link "IoT Dashboard" [ref=e73] [cursor=pointer]:
          - /url: /pages/iot-dashboard
          - img [ref=e75]
          - generic: IoT Dashboard
      - listitem [ref=e80]:
        - generic [ref=e81]: FEATURES
      - listitem [ref=e82]:
        - link "Forms" [active] [ref=e83] [cursor=pointer]:
          - /url: "#"
          - img [ref=e85]
          - generic: Forms
          - img [ref=e92]
        - list:
          - listitem [ref=e97]:
            - link "Form Layouts" [ref=e98] [cursor=pointer]:
              - /url: /pages/forms/layouts
              - generic: Form Layouts
          - listitem [ref=e99]:
            - link "Datepicker" [ref=e100] [cursor=pointer]:
              - /url: /pages/forms/datepicker
              - generic: Datepicker
      - listitem [ref=e101]:
        - link "Modal & Overlays" [ref=e102] [cursor=pointer]:
          - /url: "#"
          - img [ref=e104]
          - generic: Modal & Overlays
          - img [ref=e112]
        - list:
          - listitem [ref=e117]:
            - link "Dialog" [ref=e118] [cursor=pointer]:
              - /url: /pages/modal-overlays/dialog
              - generic: Dialog
          - listitem [ref=e119]:
            - link "Window" [ref=e120] [cursor=pointer]:
              - /url: /pages/modal-overlays/window
              - generic: Window
          - listitem [ref=e121]:
            - link "Popover" [ref=e122] [cursor=pointer]:
              - /url: /pages/modal-overlays/popover
              - generic: Popover
          - listitem [ref=e123]:
            - link "Toastr" [ref=e124] [cursor=pointer]:
              - /url: /pages/modal-overlays/toastr
              - generic: Toastr
          - listitem [ref=e125]:
            - link "Tooltip" [ref=e126] [cursor=pointer]:
              - /url: /pages/modal-overlays/tooltip
              - generic: Tooltip
      - listitem [ref=e127]:
        - link "Extra Components" [ref=e128] [cursor=pointer]:
          - /url: "#"
          - img [ref=e130]
          - generic: Extra Components
          - img [ref=e139]
        - list:
          - listitem [ref=e144]:
            - link "Calendar" [ref=e145] [cursor=pointer]:
              - /url: /pages/extra-components/calendar
              - generic: Calendar
      - listitem [ref=e146]:
        - link "Charts" [ref=e147] [cursor=pointer]:
          - /url: "#"
          - img [ref=e149]
          - generic: Charts
          - img [ref=e156]
        - list:
          - listitem [ref=e161]:
            - link "Echarts" [ref=e162] [cursor=pointer]:
              - /url: /pages/charts/echarts
              - generic: Echarts
      - listitem [ref=e163]:
        - link "Tables & Data" [ref=e164] [cursor=pointer]:
          - /url: "#"
          - img [ref=e166]
          - generic: Tables & Data
          - img [ref=e175]
        - list:
          - listitem [ref=e180]:
            - link "Smart Table" [ref=e181] [cursor=pointer]:
              - /url: /pages/tables/smart-table
              - generic: Smart Table
          - listitem [ref=e182]:
            - link "Tree Grid" [ref=e183] [cursor=pointer]:
              - /url: /pages/tables/tree-grid
              - generic: Tree Grid
      - listitem [ref=e184]:
        - link "Auth" [ref=e185] [cursor=pointer]:
          - /url: "#"
          - img [ref=e187]
          - generic: Auth
          - img [ref=e194]
        - list:
          - listitem [ref=e199]:
            - link "Login" [ref=e200] [cursor=pointer]:
              - /url: /auth/login
              - generic: Login
          - listitem [ref=e201]:
            - link "Register" [ref=e202] [cursor=pointer]:
              - /url: /auth/register
              - generic: Register
          - listitem [ref=e203]:
            - link "Request Password" [ref=e204] [cursor=pointer]:
              - /url: /auth/request-password
              - generic: Request Password
          - listitem [ref=e205]:
            - link "Reset Password" [ref=e206] [cursor=pointer]:
              - /url: /auth/reset-password
              - generic: Reset Password
    - generic [ref=e207]:
      - generic [ref=e211]:
        - generic [ref=e214]:
          - generic [ref=e215]: Inline form
          - generic [ref=e217]:
            - textbox "Jane Doe" [ref=e218]
            - textbox "Email" [ref=e219]
            - generic [ref=e221]:
              - checkbox "Remember me" [ref=e222]
              - generic [ref=e224]: Remember me
            - button "Submit" [ref=e225] [cursor=pointer]
        - generic [ref=e226]:
          - generic [ref=e227]:
            - generic [ref=e228]:
              - generic [ref=e229]: Using the Grid
              - generic [ref=e231]:
                - generic [ref=e232]:
                  - generic [ref=e233]: Email
                  - textbox "Email" [ref=e235]
                - generic [ref=e236]:
                  - generic [ref=e237]: Password
                  - textbox "Password" [ref=e239]
                - generic [ref=e240]:
                  - generic [ref=e241]: Radios
                  - generic [ref=e243]:
                    - generic [ref=e245]:
                      - radio "Option 1" [ref=e246]
                      - generic [ref=e249]: Option 1
                    - generic [ref=e251]:
                      - radio "Option 2" [ref=e252]
                      - generic [ref=e255]: Option 2
                    - generic [ref=e257]:
                      - radio "Disabled Option" [checked] [disabled] [ref=e258]
                      - generic [ref=e261]: Disabled Option
                - button "Sign in" [ref=e264] [cursor=pointer]
            - generic [ref=e265]:
              - generic [ref=e266]: Form without labels
              - generic [ref=e268]:
                - textbox "Recipients" [ref=e270]
                - textbox "Subject" [ref=e272]
                - textbox "Message" [ref=e274]
                - button "Send" [ref=e275] [cursor=pointer]
          - generic [ref=e276]:
            - generic [ref=e277]:
              - generic [ref=e278]: Basic form
              - generic [ref=e280]:
                - generic [ref=e281]:
                  - generic [ref=e282]: Email address
                  - textbox "Email address" [ref=e283]:
                    - /placeholder: Email
                - generic [ref=e284]:
                  - generic [ref=e285]: Password
                  - textbox "Password" [ref=e286]
                - generic [ref=e289]:
                  - checkbox "Check me out" [ref=e290]
                  - generic [ref=e292]: Check me out
                - button "Submit" [ref=e293] [cursor=pointer]
            - generic [ref=e294]:
              - generic [ref=e295]: Block form
              - generic [ref=e296]:
                - generic [ref=e297]:
                  - generic [ref=e299]:
                    - generic [ref=e300]: First Name
                    - textbox "First Name" [ref=e301]
                  - generic [ref=e303]:
                    - generic [ref=e304]: Last Name
                    - textbox "Last Name" [ref=e305]
                - generic [ref=e306]:
                  - generic [ref=e308]:
                    - generic [ref=e309]: Email
                    - textbox "Email" [ref=e310]
                  - generic [ref=e312]:
                    - generic [ref=e313]: Website
                    - textbox "Website" [ref=e314]
                - button "Submit" [ref=e315] [cursor=pointer]
        - generic [ref=e318]:
          - generic [ref=e319]: Horizontal form
          - generic [ref=e321]:
            - generic [ref=e322]:
              - generic [ref=e323]: Email
              - textbox "Email" [ref=e325]
            - generic [ref=e326]:
              - generic [ref=e327]: Password
              - textbox "Password" [ref=e329]
            - generic [ref=e334]:
              - checkbox "Remember me" [ref=e335]
              - generic [ref=e337]: Remember me
            - button "Sign in" [ref=e340] [cursor=pointer]
      - navigation [ref=e342]:
        - generic [ref=e343]:
          - generic [ref=e344]:
            - text: Created with ♥ by
            - link "Akveo" [ref=e346] [cursor=pointer]:
              - /url: https://akveo.page.link/8V2f
            - text: "2019"
          - generic [ref=e347]:
            - link "" [ref=e348] [cursor=pointer]:
              - /url: "#"
            - link "" [ref=e349] [cursor=pointer]:
              - /url: "#"
            - link "" [ref=e350] [cursor=pointer]:
              - /url: "#"
            - link "" [ref=e351] [cursor=pointer]:
              - /url: "#"
```

# Test source

```ts
  1  | import { Page } from "@playwright/test";
  2  | 
  3  | export class NavigationPage {
  4  | 
  5  |     readonly page: Page;
  6  | 
  7  |     constructor(page: Page) {
  8  |         this.page = page;
  9  |     }
  10 | 
  11 |     // Correct navigation menu (verified from live DOM)
  12 |     private menu() {
  13 |         return this.page.locator('nb-menu ul.menu-items');
  14 |     }
  15 | 
  16 |     private group(name: string) {
  17 |         return this.menu().getByRole('link', { name });
  18 |     }
  19 | 
  20 |     private item(name: string) {
  21 |         return this.menu().getByRole('link', { name });
  22 |     }
  23 | 
  24 |     async formLayoutsPage() {
  25 |         await this.group('Forms').click();
  26 |         await this.item('Form Layouts').click();
  27 |     }
  28 | 
  29 |     async datepickerPage() {
  30 |         await this.group('Forms').click();
> 31 |         await this.item('Datepicker').click();
     |                                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  32 |     }
  33 | 
  34 |     async toastrPage() {
  35 |         await this.group('Modal & Overlays').click();
  36 |         await this.item('Toastr').click();
  37 |     }
  38 | 
  39 |     async tooltipPage() {
  40 |         await this.group('Modal & Overlays').click();
  41 |         await this.item('Tooltip').click();
  42 |     }
  43 | 
  44 |     async smartTablePage() {
  45 |         await this.group('Tables & Data').click();
  46 |         await this.item('Smart Table').click();
  47 |     }
  48 | }
  49 | 
```