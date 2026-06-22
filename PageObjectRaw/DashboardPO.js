class DashboardPO {

    constructor(page) {
        this.page = page;
        this.productArea = page.locator(".card-body");
        this.cart = page.locator("[routerlink='/dashboard/cart']");
    }

    async selectProduct(productName) {
        await this.page.waitForSelector(".card-body b");
        const productCount = await this.productArea.count();
        console.log('Product Count=', +productCount);


        for (let i = 0; i < productCount; ++i) {

            if (await this.productArea.nth(i).locator('b').textContent() === productName) {  

                await this.productArea.nth(i).locator("text= Add To Cart").click();       
                break;
            }
        }
    }

    async clickCart() {

        await this.cart.click();
    }
}

module.exports = {DashboardPO};