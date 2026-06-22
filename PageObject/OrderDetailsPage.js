export class OrderDetailsPage {

    constructor(page) {
        this.orderMsg = page.locator(".hero-primary");
        this.orderID = page.locator(".em-spacer-1 label");
    }

    async orderDetails(expect) {
        await expect(this.orderMsg).toHaveText(" Thankyou for the order. ")
        const orderID = await this.orderID.last().textContent();
        const exactOrderID = await orderID.split(" ")[2];
        console.log(exactOrderID);
        return exactOrderID;
    }
}
