const { test, expect, request } = require('@playwright/test');

const loginPayload = { userEmail: "harishholkar.99@gmail.com", userPassword: "Udemy@5657" };
let token;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: loginPayload
        }
    )
    const loginResponseJSon = await loginResponse.json();
    token = loginResponseJSon.token;
    console.log(token);
})

test('Logged In', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator("[routerlink='/dashboard/myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a16826417ee3e78ba9fa3d6",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a16826417ee3e78ba9fa3d9' }))
    await page.locator("button:has-text('View')").first().click();

    await expect(page.locator('.blink_me:visible')).toHaveText('You are not authorize to view this order');

})