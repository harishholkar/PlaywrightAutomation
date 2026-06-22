class PlaceOrderPO {

    constructor(page) {
        this.page = page;
        this.dropdown = page.locator("[placeholder*='Country']");
        this.DDOptions = page.locator("section.ta-results button");
        this.cardDetails = page.locator("[type='text']");
        this.couponText = page.locator("text=* Coupon Applied");
        this.emailValidation = page.locator(".user__name label");
        this.applyButton = page.locator("button:has-text('Apply Coupon')")
    }

    async shippingInformation(dropdownOption, countryKeywords) {
        await this.dropdown.pressSequentially(countryKeywords);
        await this.page.waitForSelector("section.ta-results button");
        const optionCount = await this.DDOptions.count();
        for (let i = 0; i < optionCount; i++) {

            if (await this.DDOptions.nth(i).textContent() == dropdownOption) {

                await this.DDOptions.nth(i).click();
                break;
            }

        }
    }

    async personalInformation(CVV, nameOnCard, coupon, coupText, email, expect) {

        //CVV code
        await this.cardDetails.nth(1).fill(CVV);
        //Name on card
        await this.cardDetails.nth(2).fill(nameOnCard);
        //Apply coupon
        await this.cardDetails.nth(3).fill(coupon);
        await this.applyButton.click();
        //await couponText.waitFor();     no need since in the next line playwright is waiting for text
        console.log(await this.couponText.textContent());
        await expect(this.couponText).toContainText(coupText);
        await expect(this.emailValidation).toHaveText(email);
        await this.page.locator("text=Place Order ").click();
    }
}

module.exports = {PlaceOrderPO}