const {test, expect} = require('@playwright/test');

test('IFrames',async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const frameHandle = page.frameLocator("#courses-iframe");
    await frameHandle.locator("li a[href='lifetime-access']").first().click();
    const iframeText = await frameHandle.locator(".text h2").textContent();
    const iframeTextNo = iframeText.split(" ")[1];
    console.log(iframeTextNo);
    
    await expect(iframeTextNo).toBe('13,522');
});