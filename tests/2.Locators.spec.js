const {test, expect} = require ('@playwright/test');

//Practice Page Sign in 
test('Locating Elements',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(page).toHaveURL('https://rahulshettyacademy.com/loginpagePractise/');

    await page.locator("#username").fill('rahulshettyacademy');
    await page.fill('#password','Learning@830$3mK2');
    await page.click("[type='checkbox']");
    await page.locator("[name='signin']").click();

    await expect(page).toHaveTitle('ProtoCommerce');

});

//Practice Page Error Catch 
test('Practice page error catch',async({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.fill('#username','rahulshetty');
    await page.fill('#password','Learning@830$3mK2');
    await page.check("[type='checkbox']");
    await page.click("[name='signin']");

    console.log(await page.locator("[style*='block']").textContent());
    await expect (page.locator("[style*='block']")).toContainText("Incorrect");

});




