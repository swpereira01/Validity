import { expect, type Locator, type Page} from '@playwright/test';

export class Categories{
    readonly page;
    readonly categoryDropdown;
    readonly categoryDropdownArrow;
    readonly categoryDropdownSearch;
    readonly categoryDropdownSelection;
    readonly categoryDropdownConfirm; // Based on the screenshot I'm assuming one is there
    readonly spinner;
    readonly badge;
    readonly inlineText;
    readonly form; // this is where the input fields are shown and the user has to fill in the fields

    constructor(page: Page){
    this.page = page;
    this.categoryDropdown = this.page.getByRole("dropdown", {hasText: "Select..."});
    this.categoryDropdownArrow = this.categoryDropdown.locator('.class for button');
    this.categoryDropdownSearch = this.categoryDropdown.getByRole("texbox", {hasText: "Search..."})
    this.categoryDropdownSelection = (categoryName : string) => this.categoryDropdown.getByRole("checkbox", {hasText:`${categoryName}`})
    this.categoryDropdownConfirm = this.categoryDropdown.getByRole("button", {hasText: "Confirm"})
    this.spinner = this.page.locator('.spinner-class')
    this.badge = (categoryName : string) => this.page.locator('.badge-class').getByText(`${categoryName}`);
    this.inlineText = (categoryName : string) => this.page.locator('.inlineText-class').getByText(`${categoryName}`)
    this.form = this.page.locator('.form-class')
    }

    async openDropdown(){
        await this.categoryDropdownArrow.toBeVisible();
        await this.categoryDropdownArrow.click();
        await expect(this.categoryDropdownSearch).toBeVisible();
    }
    async closeDropdown(){
        await this.categoryDropdownArrow.toBeVisible();
        await this.categoryDropdownArrow.click();
        await expect(this.categoryDropdownSearch).not.toBeVisible();
    }
    async searchForCategory(categoryName){
        await this.openDropdown();
        await this.categoryDropdownSearch.toBeVisible()
        await this.categoryDropdownSearch.click();
        await this.categoryDropdownSearch.fill(categoryName);
        await expect(this.spinner).toBeVisible();
        await this.categoryDropdownSelection(categoryName).toBeVisible();
    }
    async selectCategory(categoryName){
        await this.categoryDropdownSelection(categoryName).toBeVisible();
        await this.categoryDropdownSelection(categoryName).click();
    }
    async confirmSelection(){ 
        await expect(this.categoryDropdownConfirm).toBeEnabled();
        await this.categoryDropdownConfirm.click();
        await this.categoryDropdownArrow.click();
        await this.page.waitForLoadState();
    }
    async verifyselectionBadge(categoryName){
        await expect(this.badge(categoryName)).toBeVisible();
    }
    async verifyInlineText(categoryName){
        await expect(this.inlineText(categoryName)).toBeVisible();
    }
    async verifyInputVisibility(categoryName){
        const IDInput = ['SSN'];
        const personalInfoInput = ['First Name', 'Last Name', 'Address', 'Education Level', 'Age']
        const generalInfoInput = ['First Name', 'Last Name', 'Job', 'Favorite Food', 'Favorite Book']
        const contactInfoInput = ['phone', 'email']

        if(categoryName == 'ID'){
            await expect(this.form).tohaveText(IDInput);
        }else if(categoryName == 'Personal Info'){
            await expect(this.form).tohaveText(personalInfoInput);
        }else if (categoryName == 'General Info'){
            await expect(this.form).tohaveText(generalInfoInput);
        }else if (categoryName == 'Contact Info'){
            await expect(this.form).tohaveText(contactInfoInput);
        }

    }
}