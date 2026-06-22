export class CheckoutAndPlaceOrderPage {

    constructor(page) {
        this.page = page;
        this.cartText = page.locator(".cartSection h3");
        this.checkoutBt = page.locator("//button[text()='Checkout' ]");
        this.dropdown = page.locator("[placeholder*='Country']");
        this.DDOptions = page.locator("section.ta-results button");
        this.cardDetails = page.locator("[type='text']");
        this.couponText = page.locator("text=* Coupon Applied");
        this.emailValidation = page.locator(".user__name label");
        this.dropDownOptions = page.waitForSelector("section.ta-results button");
        this.applyCoupon = page.locator("button:has-text('Apply Coupon')");
        this.placeOrder = page.locator("text=Place Order ");
    }

    async Checkout(expect) {

        await expect(this.cartText.isVisible()).toBeTruthy();
        await this.checkoutBt.click();
    }

    async selectCountry(dropdownOption,countryKeywords){
        await this.dropdown.pressSequentially(countryKeywords);
        await this.dropDownOptions;
        const optionCount = await this.DDOptions.count();
        for (let i = 0; i < optionCount; i++) {
            if (await this.DDOptions.nth(i).textContent() == dropdownOption) {
                await this.DDOptions.nth(i).click();
                break;
            }
        }
    }
    async placingOrder(cvvCode, cardName, coupon, email, couponText, expect) {

        //CVV code
        await this.cardDetails.nth(1).fill(cvvCode);
        //Name on card
        await this.cardDetails.nth(2).fill(cardName);
        //Apply coupon
        await this.cardDetails.nth(3).fill(coupon);
        await this.applyCoupon.click();
        //await couponText.waitFor();     no need since in the next line playwright is waiting for text
        console.log(await this.couponText.textContent());
        await expect(this.couponText).toContainText(couponText);
        await expect(this.emailValidation).toHaveText(email);
        await this.placeOrder.click();
    }
}
