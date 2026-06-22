const { test, expect, request } = require('@playwright/test');

//Skip the login and Intercept the API response (fake the response)
let webContext;
const fakeResponse = { data: [], message: "No Orders" };

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('harishholkar.99@gmail.com');
    await page.locator('#userPassword').fill('Udemy@5657');
    await page.locator('#login').click();
    await page.locator('.card-body').first().waitFor();
    await context.storageState({ path: 'newState.json' });
    webContext = await browser.newContext({ storageState: 'newState.json' });

});

test('Home Page', async () => {

    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*',
        async route => {
            const response = await page.request.fetch(route.request()); //to fetch the response from route request
            const body = JSON.stringify(fakeResponse); // JS object into JSON String
            route.fulfill(  // to send the response to browser
                {
                    response,
                    body          // from response replace only the body
                }
            )
        }
    )

    await page.locator("[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    // Since wait is required to get the response of GET API
    //if not providing wait then ends with error "Request Context Disposed" (getting two fake responses creates abiguity)
    //What we want--> API Triggers--API Response--Fake Response--UI
    //if no wait for response then-->API Triggers--Fake Response--API Response--Fake Response--UI
    console.log(await page.locator('.mt-4').textContent());

})