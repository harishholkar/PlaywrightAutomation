const { test, expect } = require('@playwright/test');

test('Abort Calls', async ({ page }) => {

    await page.route('**/*.css', route => route.abort()); //abort .css calls
    await page.route('**/*.{jpg,jpeg,png}',route=>route.abort()); // abort all images calls
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));
    await page.pause();
})