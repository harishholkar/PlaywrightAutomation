export class OrderPresenceAndSummary {

    constructor(page) {
        this.Odrers = page.locator("[routerlink='/dashboard/myorders']");
        this.ordersLine = page.locator("tr.ng-star-inserted th");
        this.viewButton = page.locator("button.btn-primary");
        this.orderSumOrId = page.locator("div.col-text");
        this.OrderSummary = page.locator("div.email-title");
        this.respectiveViewButtonClick = page.locator(".table-hover tbody tr");
    }

    async verifyOrderPresence(orderID) {
        await this.Odrers.first().click();
        await this.ordersLine.first().waitFor();
        const OrdersLineCount = await this.ordersLine.count();
        await this.respectiveViewButtonClick.filter({ hasText: orderID }).locator("button").first().click();
    }

    async verifyOrderSummary(orderID,expect) {
        await expect(this.OrderSummary).toHaveText(" order summary ");
        await expect(this.orderSumOrId).toHaveText(orderID);
    }
}