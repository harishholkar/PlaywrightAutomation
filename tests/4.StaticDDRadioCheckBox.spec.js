const {test,expect} = require ('@playwright/test');

//Static DD, radio button and check box also blinking link validation
//test.describe.configure({mode:"parallel"}); -->extention to test
test('Static Drop Down', async({page})=>{
   
    //Static DD and radio button 
    const dropdown = page.locator("select.form-control");
    const radioButton = page.locator("span.checkmark");
    const staticPopUp = page.locator("#okayBtn");
    const checkBox = page.locator("[type='checkbox']");
    const blinkLink = page.locator("[target='_blank']");
    const blinkLink1 = page.locator("[href*='documents-request']");
    const blinkLink2 = page.locator("[href*='techsmarthire']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await dropdown.selectOption("consult");
    expect(await dropdown.locator('option:checked')).toHaveText('Consultant');
    //expect(await page.locator('select.form-control option:checked').textContent()).toBe('Consultant');
    //expect(await page.locator('select.form-control option:checked')).toHaveText('Consultant');

    await radioButton.last().click();
    await staticPopUp.click();
    console.log(await radioButton.last().isChecked());
    await expect(radioButton.last()).toBeChecked();
    expect(await radioButton.first().isChecked()).toBeFalsy();

    //CheckBox

    await checkBox.check();
    console.log(await checkBox.isChecked());
    await expect(checkBox).toBeChecked();

    await checkBox.uncheck();
    console.log(await checkBox.isChecked());
    expect(await checkBox.isChecked()).toBeFalsy();

    //blinking link validation

    //  await expect(blinkLink.first()).toHaveAttribute("class","blinkingText");
    //  await expect(blinkLink.last()).toHaveAttribute("class","blinkingText");

    await expect(blinkLink1).toHaveAttribute("class","blinkingText");
    await expect(blinkLink2).toHaveAttribute("class","blinkingText");

});




