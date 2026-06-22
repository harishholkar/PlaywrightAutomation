export class DashBoardPage {

    constructor(page) {
        this.productArea = page.locator(".card-body");
        this.cart = page.locator("[routerlink='/dashboard/cart']");
        
    }

    async searchProductAddCart(productName) {
        
        const productCount = await this.productArea.count();
        console.log('Product Count=', +productCount);

        for (let i = 0; i < productCount; ++i) {

            if (await this.productArea.nth(i).locator('b').textContent() === productName) {  //chain locatoe

                await this.productArea.nth(i).locator("text= Add To Cart").click();       //chain locator
                break;
            }
        }

    }

    async navigateToCart() {
        await this.cart.click();
    }
}
