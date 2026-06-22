class CheckoutPO {

    constructor(page) {
        this.page = page;
        this.cartText = page.locator("//h3[text()='iphone 13 pro']");  //xpath
        this.cartTextCSS = page.locator("h3:has-text('iphone 13 pro')"); //CSS
        this.checkoutBt = page.locator("//button[text()='Checkout' ]");
        this.waiting = page.locator(".cartSection h3");
    }

    async checkoutPage(expect) {
        console.log(await this.cartText.textContent());
        await this.waiting.last().waitFor();
        await expect(this.cartTextCSS.isVisible()).toBeTruthy();
        await this.checkoutBt.click();
    }
}
 module.exports ={CheckoutPO};