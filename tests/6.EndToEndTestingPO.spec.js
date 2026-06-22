import { test, expect } from '@playwright/test';
import { POManager } from '../PageObject/POManager';
const dataset = require('../Utils/EndToEndTestData6.json');
const {customTest} = require('../Utils/FixtureExtentionData6');

//Page Object //Parameterization
// Login-add product to cart-check product in cart-checkout-fill details-take order ID and verify msg
for (const data of dataset){
test(`End To End for '${data.productName}'`, async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const poManager = new POManager(page);

    const loginPage = poManager.goToLogin();
    await loginPage.goToURL();
    await loginPage.validLogin(data.email, data.pass);

    const dashBoardPage = poManager.goToDashboard();
    await dashBoardPage.searchProductAddCart(data.productName);
    await dashBoardPage.navigateToCart();

    const checkoutAndPlaceOrderPage = poManager.goToCheckoutAndPlaceOrder();
    await checkoutAndPlaceOrderPage.Checkout(expect);
    await checkoutAndPlaceOrderPage.selectCountry(data.dropdownOption, data.countryKeywords)
    await checkoutAndPlaceOrderPage.placingOrder(data.cvvCode, data.cardName, data.coupon, data.email, data.couponText, expect);

    const orderDetailsPage = poManager.goToOrderDetails();
    const orderID = await orderDetailsPage.orderDetails(expect);

    const orderPresenceAndSummary = poManager.goToOrderPresenceAndSummary();
    await orderPresenceAndSummary.verifyOrderPresence(orderID);
    await orderPresenceAndSummary.verifyOrderSummary(orderID,expect);
});
}

// Data from fixture extention
customTest('Data from fixture extention', async ({ browser, newFixture }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    const poManager = new POManager(page);

    const loginPage = poManager.goToLogin();
    await loginPage.goToURL();
    await loginPage.validLogin(newFixture.email, newFixture.pass);

    const dashBoardPage = poManager.goToDashboard();
    await dashBoardPage.searchProductAddCart(newFixture.productName);
    await dashBoardPage.navigateToCart();

    const checkoutAndPlaceOrderPage = poManager.goToCheckoutAndPlaceOrder();
    await checkoutAndPlaceOrderPage.Checkout(expect);
    await checkoutAndPlaceOrderPage.selectCountry(newFixture.dropdownOption, newFixture.countryKeywords)
    await checkoutAndPlaceOrderPage.placingOrder(newFixture.cvvCode, newFixture.cardName, newFixture.coupon, newFixture.email, newFixture.couponText, expect);

    const orderDetailsPage = poManager.goToOrderDetails();
    const orderID = await orderDetailsPage.orderDetails(expect);

    const orderPresenceAndSummary = poManager.goToOrderPresenceAndSummary();
    await orderPresenceAndSummary.verifyOrderPresence(orderID);
    await orderPresenceAndSummary.verifyOrderSummary(orderID,expect);
});