const { expect } = require("@playwright/test");

class CategoriesPage{
    constructor(page){
        this.page = page,
        this.categoriesTable = "table.table.align-items-center.table-flush",
        this.addButton = "button.btn.btn-primary",
        this.categoryNameInput = "#input-username",
        this.acceptButton = "[type='submit']",
        this.lastPageButton = "div.card-footer nav ul li:nth-last-child(2)",
        this.lastCategoryName = "tr.ng-star-inserted:last-child td:first-child",
        this.lastFatherCategoryName = "tr.ng-star-inserted:last-child td:nth-last-child(2)",
        this.subCategoryCheckbox = "#customCheckMain",
        this.categoryDropdown = "ng-select[formcontrolname='categoryId'] input"
    }

    async isLoaded(){
        await expect(this.page.locator(this.categoriesTable)).toBeVisible();
        await expect(this.page.locator(this.addButton)).toBeVisible();
    }

    async addCategory(categoryName){
        await this.page.locator(this.addButton).click();
        await this.page.locator(this.categoryNameInput).fill(categoryName);
        await this.page.locator(this.acceptButton).click();
    }

    async validateCategoryIsCreated(categoryName){
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    
        await this.page.waitForSelector(this.lastPageButton, { state: 'visible' });
    
        const laUrlAntesDelClic = await this.page.url();
    
        await this.page.evaluate(selector => {
            document.querySelector(selector).click();
        }, this.lastPageButton);
    
        await this.page.waitForTimeout(1000);

        if (await this.page.url() === laUrlAntesDelClic) {

            await this.page.locator(this.lastPageButton).hover();
            await this.page.waitForTimeout(500);
            await this.page.locator(this.lastPageButton).click({ force: true });
        }
        await expect(this.page.locator(this.lastCategoryName)).toHaveText(categoryName)
    }

    async addSubCategory(categoryName, subCategoryName){
        await this.page.evaluate(() => {
            window.scrollTo(0, 0);
        });
        await this.page.waitForSelector(this.addButton, { state: 'visible' });
        await this.page.evaluate(selector => {
            document.querySelector(selector).click();
        }, this.addButton);
        
        await this.page.locator(this.categoryNameInput).fill(subCategoryName);

        await this.page.waitForSelector(this.subCategoryCheckbox, { state: 'visible' });
        await this.page.evaluate(selector => {
            document.querySelector(selector).click();
        }, this.subCategoryCheckbox);
    
        await this.page.locator(this.categoryDropdown).fill('');
        await this.page.locator(this.categoryDropdown).fill(categoryName);
        await this.page.locator(this.categoryDropdown).press('Enter');

        await this.page.locator(this.acceptButton).click();
    }

    async validateSubCategoryIsCreated(categoryName, subCategoryName){
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    
        await this.page.waitForSelector(this.lastPageButton, { state: 'visible' });
    
        const laUrlAntesDelClic = await this.page.url();
    
        await this.page.evaluate(selector => {
            document.querySelector(selector).click();
        }, this.lastPageButton);
    
        await this.page.waitForTimeout(1000);

        if (await this.page.url() === laUrlAntesDelClic) {

            await this.page.locator(this.lastPageButton).hover();
            await this.page.waitForTimeout(500);
            await this.page.locator(this.lastPageButton).click({ force: true });
        }
        await expect(this.page.locator(this.lastCategoryName)).toHaveText(subCategoryName);
        await expect(this.page.locator(this.lastFatherCategoryName)).toHaveText(categoryName);
    }
}
module.exports = CategoriesPage;
