const { test, expect } = require('@playwright/test')
const LoginPage = require('../pages/loginPage')
const HomePage = require('../pages/homePage')
const CategoriesPage = require('../pages/categoriesPage')

test("Technical Test", async ({ page, request}) => {
    const date = new Date()
    const keyConfig = date.getHours() + date.getMinutes() + date.getSeconds();
    const USERNAME = "test.qubika." + keyConfig + "@qubika.com";
    const PASSWORD = "pass" + keyConfig;
    const CATEGORY = "Category " + date.toDateString();
    const SUBCATEGORY = "Subcategory " + date.toDateString();

    //Create a new user through API
    const newUser = await request.post('https://api.club-administration.qa.qubika.com/api/auth/register', {
        data: {
            email: USERNAME,
            password: PASSWORD,
            roles: [
                "ROLE_ADMIN"
            ]
        }
    });
    expect(newUser.ok()).toBeTruthy();

    //Navigate to QubikaClub
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    //Vallidate login page is displayed correctly
    await loginPage.isLoaded();
    //Login to QuibikaClub
    await loginPage.login(USERNAME, PASSWORD);

    //Validate the user is logged
    const homePage =  new HomePage(page);
    await homePage.userIsLogged();
    await homePage.clickCategories();

    //Go to Category page
    const categoriesPage = new CategoriesPage(page);
    await categoriesPage.isLoaded();
    //Add a new category
    await categoriesPage.addCategory(CATEGORY);
    await categoriesPage.validateCategoryIsCreated(CATEGORY);
    //Add a new subcategory
    await categoriesPage.addSubCategory(CATEGORY, SUBCATEGORY)
    await categoriesPage.validateSubCategoryIsCreated(CATEGORY,SUBCATEGORY)
})