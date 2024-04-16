const { expect } = require("@playwright/test");

class LoginPage{
    constructor(page)
    {
        this.page = page,
        this.emailInput = "[type='email']",
        this.passwordInput = "[type='password']",
        this.authenticateButton = "[type='submit']"
    }

    async isLoaded(){
        await expect(this.page.locator(this.emailInput)).toBeVisible();
        await expect(this.page.locator(this.passwordInput)).toBeVisible();
        await expect(this.page.locator(this.authenticateButton)).toBeVisible();
    }

    async navigateTo()
    {
        await this.page.goto("https://club-administration.qa.qubika.com/#/auth/login");
    }

    async login(email, password){
        await this.page.locator(this.emailInput).fill(email);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.authenticateButton).click();
    }
}
module.exports = LoginPage;