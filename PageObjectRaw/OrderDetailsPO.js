class OrderDetailsPO {

    constructor(page) {
        this.orderMsg = page.locator(".hero-primary");
        this.orderID = page.locator(".em-spacer-1 label");
    }

    async orderDetails(expect) {
        console.log(await this.orderMsg.textContent());
        await expect(this.orderMsg).toHaveText(" Thankyou for the order. ")
        const ID = await this.orderID.last().textContent();
        const orderID = await ID.split(" ")[2];
        console.log(orderID);
        return orderID;
    }
}

module.exports={OrderDetailsPO}