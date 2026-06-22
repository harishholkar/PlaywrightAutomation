// Clicking on the blink link a new tab will get open, shift playwright focus on the 2nd page and grab the text on it
// After grabbing the text, pick username from it and enter it into the username input box on 1st page
const {test, expect} = require ('@playwright/test');

test('Child window',async({browser})=>{

  const context = await browser.newContext();
  const page = await context.newPage();

  const blinkLink = page.locator("[href*='documents-request']");
  const username = page.locator("#username");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  // const [newPage, newPage2, newPage3....] = ....
  const [newPage] = await Promise.all([           // only one promise since only one page is opening. If two pages are opening [newpage, newPage2,.....]
  context.waitForEvent('page'), // listen for any new page pending,rejected,fulfilled
  blinkLink.click()
  ]);

  const text = await newPage.locator(".red").textContent(); // If two pages are opening and you want to work on second page then newPage.locator(" ")....
  console.log(text);

  const emailText = await text.split(" ")[4];
  const email = await emailText.split("@")[1];
  console.log(email);

  await username.fill(email);
  console.log(await username.inputValue());
  
  expect(await username.inputValue()).toBe(email);

});
