const { expect } = require("@playwright/test");

class HomePage{
    constructor(page){
        this.page = page,
        this.navigationBar = "#sidenav-main",
        this.goOutButton = ".ni.ni-button-power" 
        this.categoriesSection = "[href='#/category-type']"
    }

    async userIsLogged(){
        await expect(this.page.locator(this.navigationBar)).toBeVisible();
        await expect(this.page.locator(this.goOutButton)).toBeVisible();
    }

    async clickCategories(){
        await this.page.locator(this.categoriesSection).click();
    }
}
module.exports = HomePage;