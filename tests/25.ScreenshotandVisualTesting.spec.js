const { test, expect } = require('@playwright/test');

//Screenshot
test('Screen Shot', async ({ page }) => {

    await page.goto('https://www.google.com');
    await page.screenshot({ path: 'FullSS.png' });
    await page.locator('#hplogo').screenshot({ path: 'ElementSS.png' });

})

//Visual Testing
test('Visual Testing', async ({ page }) => {

    await page.goto('https://www.google.com');
    expect(await page.screenshot()).toMatchSnapshot('ElementSS.png');
    
})