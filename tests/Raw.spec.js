const { test, expect } = require('@playwright/test');
const { Given, When, Then } = require('@cucumber/cucumber');
const { request } = require('node:http');

test('practice', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("harishholkar@gmail.com");
    console.log(await page.locator("#userEmail").inputValue());
    await page.screenshot({path : 'trial1.png'});
    await page.locator("#userEmail").screenshot({path : 'trial2.png'});

    expect(await page.screenshot()).toMatchSnapshot('trial3.png');

})