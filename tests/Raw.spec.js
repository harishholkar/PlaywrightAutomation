const { test, expect } = require('@playwright/test');
const { log, count } = require('node:console');
const { POManager } = require('../PageObjectRaw/POManager');
const dataset = require('../Utils/RAWData.json');
const {fixtureData} = require('../Utils/RawFixtureData');

for (const data of dataset){
test(`Product '${data.productName}'`, async ({ browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const pOManager = new POManager(page, data.productName);

    const loginPo = pOManager.goLogin();
    await loginPo.goToURL();
    await loginPo.loginCreds(data.email, data.pass);

    const dashboardPO = pOManager.goDashboard();
    await dashboardPO.selectProduct(data.productName);
    await dashboardPO.clickCart();

    const checkoutPO = pOManager.goCheckout();
    await checkoutPO.checkoutPage(expect);

    const placeOrderPO = pOManager.goPlaceorder();
    await placeOrderPO.shippingInformation(data.dropdownOption, data.countryKeywords);
    await placeOrderPO.personalInformation(data.CVV, data.nameOnCard, data.coupon, data.coupText, data.email, expect);

    const orderDetailsPO = pOManager.goOrderDetails();
    const orderID = await orderDetailsPO.orderDetails(expect);

    const orderPresenceandSummary = pOManager.goOrderSummary();
    await orderPresenceandSummary.orderPresence(orderID);
    await orderPresenceandSummary.orderSummary(orderID, expect);

})
};