const {test, expect} = require ('@playwright/test');

test ('Browser Context Playwright Test ',async({browser})=>{

    const context = await browser.newContext(); //fresh browser instance
    const page = await context.newPage(); // new page on the instance to automate the application

    await page.goto("https://rahulshettyacademy.com/");

    const pageTitle = await page.title();
    await console.log(pageTitle);
    await expect(page).toHaveTitle('Rahul Shetty Academy | QA Automation, Playwright, AI Testing & Online Training')
});

test('Page Playwright Test',async({page})=>{
    
    await page.goto("https://www.google.com/"); // this do the work of above two lines when instance is without plugin(s)/cookie(s) required

    const pageTitle= await page.title();
    console.log(pageTitle);
    await expect(page).toHaveTitle('Google');
});

