//POST Login API-https://rahulshettyacademy.com/api/ecom/auth/login

const {test, expect, request} = require('@playwright/test');

// Skiping the order creation flow

const loginPayload = {userEmail:"harishholkar.99@gmail.com",userPassword:"Udemy@5657"};
const orderCreationPayload = {orders:[{country:"India",productOrderedId:"6960eae1c941646b7a8b3ed3"}]};
let responseToken; 
let orderID;
test.beforeAll(async()=>{

    //Login POST API
const apiContext = await request.newContext();

const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',

    {
      data: loginPayload
    })
    expect(await loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json(); // .body, .headers, .json, .ok, .status
    responseToken = loginResponseJson.token;
    console.log(responseToken);

    //Order creation POST API

    const orderCreationResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', 

        {
            data : orderCreationPayload,
            headers : {
                  'Authorization' : responseToken,
                  'content-type' : 'application/json'
        }
        }
    )
    expect(await orderCreationResponse.ok()).toBeTruthy();
    const orderCretionJson = await orderCreationResponse.json();
    orderID = await orderCretionJson.orders[0];
});


// Goto the orders page, get the orderID, click the View button and verify the deatils on order summary page(assertions)  
test('Assignment 1', async({page})=>{


    const ordersBt = page.locator("[routerlink='/dashboard/myorders']");
    const orderLine = page.locator(".table-bordered tbody tr");
    //const ordersLine = page.locator("tr.ng-star-inserted th");
    const viewButton = page.locator("button.btn-primary");
    const orderSumOrId = page.locator("div.col-text");
    const orderSummary = page.locator("div.email-title");

    // JS-Script to inject token into local storage (For Login)
    await page.addInitScript(value =>{

    window.localStorage.setItem("token",value); // we have to check this, where our developer has stored the token info (Barrier token, Oth2) also it may be in Session Storage or cookies, accordingly this line will be changed 

    },responseToken)

    await page.goto("https://rahulshettyacademy.com/client");
    
    await ordersBt.click();

    await orderLine.first().waitFor();

    await orderLine.filter({hasText:orderID}).locator('button').first().click();

    await expect(orderSummary).toHaveText(" order summary ");
    await expect(orderSumOrId).toHaveText(orderID);

});
