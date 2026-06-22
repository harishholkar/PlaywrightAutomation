    import {LoginPage} from './LoginPage';
    import {DashBoardPage} from './DashBoardPage';
    import {CheckoutAndPlaceOrderPage} from './CheckoutAndPlaceOrderPage';
    import {OrderDetailsPage} from './OrderDetailsPage';
    import {OrderPresenceAndSummary} from './OrderPresenceAndSummary';


export class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page);
        this.checkoutAndPlaceOrderPage = new CheckoutAndPlaceOrderPage(this.page);
        this.orderDetailsPage = new OrderDetailsPage(this.page);
        this.orderPresenceAndSummary = new OrderPresenceAndSummary(this.page);
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

}