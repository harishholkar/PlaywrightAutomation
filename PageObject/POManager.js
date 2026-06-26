    const {LoginPage} = require('./LoginPage');
    const {DashBoardPage} = require('./DashBoardPage');
    const {CheckoutAndPlaceOrderPage} = require('./CheckoutAndPlaceOrderPage');
    const {OrderDetailsPage} = require('./OrderDetailsPage');
    const {OrderPresenceAndSummary} = require('./OrderPresenceAndSummary');
    const {CucumberLoginValidations} = require('./CucumberLoginValidations');


class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);
        this.checkoutAndPlaceOrderPage = new CheckoutAndPlaceOrderPage(this.page);
        this.orderDetailsPage = new OrderDetailsPage(this.page);
        this.orderPresenceAndSummary = new OrderPresenceAndSummary(this.page);
        this.cucumberLoginValidations = new CucumberLoginValidations(page);
    };

    goToLogin() {
        return this.loginPage;
    }

    goToDashboard() {
        return this.dashBoardPage;
    }

    goToCheckoutAndPlaceOrder() {
        return this.checkoutAndPlaceOrderPage
    }

    goToOrderDetails() {
        return this.orderDetailsPage
    };

    goToOrderPresenceAndSummary(){
        return this.orderPresenceAndSummary;
    }

    goToCucumberLoginValidations(){
        return this.cucumberLoginValidations;
    }

}
module.exports={POManager}