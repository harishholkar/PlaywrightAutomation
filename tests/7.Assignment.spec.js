const{test, expect} = require('@playwright/test');
// Goto the orders page, get the OrderId, click the View button and verify the deatils on order summary page(assertions)  
test('Assignment 1', async({page})=>{

    const orderId='6a0aef13965c23b43b239209';

    const email = 'harishholkar.99@gmail.com';
    const pass = 'Udemy@5657';
    const emailLoc = page.locator("#userEmail");
    const passLoc = page.locator("#userPassword");
    const loginBtLoc = page.locator("[type='submit']");
    const Odrers = page.locator("[routerlink='/dashboard/myorders']");
    const ordersLine = page.locator("tr.ng-star-inserted th");
    const viewButton = page.locator("button.btn-primary");
    const orderSumOrId = page.locator("div.col-text");
    const OrderSummary = page.locator("div.email-title");
    
    //for github actions

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await emailLoc.fill(email);
    await passLoc.fill(pass);
    await loginBtLoc.click();
    await Odrers.click();

    await ordersLine.first().waitFor();

    const OrdersLineCount = await ordersLine.count();

    for(let i=0; i<OrdersLineCount;i++){

        if (await ordersLine.nth(i).textContent() == orderId){
          await viewButton.nth(i).click();
          break;
        }
    }

    await expect(OrderSummary).toHaveText(" order summary ");
    await expect(orderSumOrId).toHaveText(orderId);

})