//login
const { test, expect, request } = require('@playwright/test');

let webContext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("harishholkar.99@gmail.com")
    await page.locator("#userPassword").fill("Udemy@5657");
    await page.locator("#login").click();
    await page.locator("img.card-img-top").first().waitFor();
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});

test('practice', async () => {

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client")

})

test('practice2', async () => {

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client")

})