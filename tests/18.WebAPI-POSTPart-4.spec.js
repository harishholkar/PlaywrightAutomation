const {test, expect} = require ('@playwright/test');

//Approch 2-from one browser, Stoar all the Network data and inject into the another browser
let webContext;

test.beforeAll(async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('harishholkar.99@gmail.com');
    await page.locator('#userPassword').fill('Udemy@5657');
    await page.locator('#login').click();
    //await page.waitForLoadState("networkidle");
    await page.locator('div.card-body').filter({hasText:'ADIDAS ORIGINAL'}).waitFor();
    await context.storageState({path:'state.json'}); //file creation
    webContext = await browser.newContext({storageState:'state.json'}); //injecting the json file into another browser context
});

test('@API Home Page',async()=>{
 
    const page = await webContext.newPage();

    await page.goto('https://rahulshettyacademy.com/client');

    await page.locator('div.card-body').filter({hastext:'ADIDAS ORIGINAL'}).locator('button').last().click();

});

test('practice2',async({})=>{

    const newPage = await webContext.newPage();
    await newPage.goto('https://rahulshettyacademy.com/client/#/auth/login');

})