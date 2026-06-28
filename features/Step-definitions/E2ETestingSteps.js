
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');
const { POManager } = require('../../PageObject/POManager');
const { TIMEOUT } = require('node:dns');
const { Given, When, Then } = require('@cucumber/cucumber');

Given('The user logged in with valid creds as {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    const loginPage = this.poManager.goToLogin();
    await loginPage.goToURL();
    await loginPage.validLogin(username, password);
});

When('The user puts {string} product into the cart', { timeout: 100 * 1000 }, async function (productName) {
    const dashBoardPage = this.poManager.goToDashboard();
    await dashBoardPage.searchProductAddCart(productName);
    await dashBoardPage.navigateToCart();
});

Then('Verify that same product is present into the cart', { timeout: 100 * 1000 }, async function () {
    this.checkoutAndPlaceOrderPage = this.poManager.goToCheckoutAndPlaceOrder();
    await this.checkoutAndPlaceOrderPage.Checkout(expect);
});

When('The user place the order {string}, {string}, {string}, {string}, {string}, {string} and {string}', { timeout: 100 * 1000 }, async function (dropdownOption, countryKeyword, cvvCode, cardName, coupon, email, couponText) {
    await this.checkoutAndPlaceOrderPage.selectCountry(dropdownOption, countryKeyword)
    await this.checkoutAndPlaceOrderPage.placingOrder(cvvCode, cardName, coupon, email, couponText, expect);

});

Then('Verify that the placed order is present into the order history page', { timeout: 100 * 1000 }, async function () {
    const orderDetailsPage = this.poManager.goToOrderDetails();
    const orderID = await orderDetailsPage.orderDetails(expect);

    const orderPresenceAndSummary = this.poManager.goToOrderPresenceAndSummary();
    await orderPresenceAndSummary.verifyOrderPresence(orderID);
    await orderPresenceAndSummary.verifyOrderSummary(orderID, expect);

});

Given('The user logged in with the creds as {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    this.cucumberLoginValidations = this.poManager.goToCucumberLoginValidations();
    await this.cucumberLoginValidations.loginWithIncorrectCreds(username, password);
});

When('Verify the error message displayed', async function () {
    await this.cucumberLoginValidations.verifytheErrorText(expect);
});