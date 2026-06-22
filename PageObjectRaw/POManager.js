const {LoginPO} = require('../PageObjectRaw/LoginPO');
const {DashboardPO} = require('../PageObjectRaw/DashboardPO');
const {CheckoutPO} = require('../PageObjectRaw/CheckoutPO');
const {PlaceOrderPO} = require('../PageObjectRaw/PlaceOrderPO');
const {OrderDetailsPO} = require('../PageObjectRaw/OrderDetailsPO');
const {OrderPresenceandSummary} = require('../PageObjectRaw/OrderPresenceandSummary');

class POManager {

    constructor(page, productName) {
        this.loginPo = new LoginPO(page);
        this.dashboardPO = new DashboardPO(page);
        this.checkoutPO = new CheckoutPO(page, productName);
        this.placeOrderPO = new PlaceOrderPO(page)
        this.orderDetailsPO = new OrderDetailsPO(page);
        this.orderPresenceandSummary = new OrderPresenceandSummary(page);
    }

    goLogin() {
        return this.loginPo;

    }

    goDashboard() {
       return this.dashboardPO;

    }

    goCheckout() {
        return this.checkoutPO;

    }

    goPlaceorder() {
        return this.placeOrderPO;

    }

    goOrderDetails() {
        return this.orderDetailsPO;

    }

    goOrderSummary() {
        return this.orderPresenceandSummary;
    }

}
module.exports = { POManager }