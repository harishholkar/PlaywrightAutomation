const {test,expect} = require('@playwright/test');

test('Calender Handel',async({page})=>{

    const date = '25';
    const month = '10';
    const year = '2029'; 

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    // await page.getByText(date).click();

    await expect(page.locator(".react-date-picker__inputGroup input").nth(3)).toHaveAttribute('value',year);
    await expect(page.locator(".react-date-picker__inputGroup input").nth(2)).toHaveAttribute('value',date);
    await expect(page.locator(".react-date-picker__inputGroup input").nth(1)).toHaveAttribute('value',month);

    // await expect(page.locator("[name='month']")).toHaveAttribute('value',month);
    // await expect(page.locator("[name='day']")).toHaveAttribute('value',day);
    // await expect(page.locator("[name='year']")).toHaveAttribute('value',year);

})