const {test, expect} = require('@playwright/test');

test('Java Dialog',async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();

    //JAVA Alert, PopUp, Dialog handeling
    // await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    // await page.pause();
    // page.on('dialog',dialog=>dialog.dismiss());  // accept() and dismiss()
    // await page.locator("#confirmbtn").click();
    // await page.locator("#alertbtn").click();
    // page.on('dialog',dialog=>dialog.accept());  //you should not write the dialog handeling two times in a single code
    
    // Mouse Hover

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    await page.pause();
    await page.locator('#mousehover').hover();
    await page.locator(".mouse-hover-content a:visible").last().click();
        
    await page.locator('#mousehover').hover();
    await page.locator(".mouse-hover-content a:visible").first().click();
    
    
});