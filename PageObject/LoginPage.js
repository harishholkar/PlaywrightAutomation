export class LoginPage {

    constructor(page) {
        this.page = page;
        this.email = page.locator("#userEmail");
        this.pass = page.locator("#userPassword");
        this.loginBt = page.locator("#login");
        this.waitForSelector = page.waitForSelector(".card-body b");
    }

    async goToURL() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(email, pass) {

        await this.email.fill(email);
        await this.pass.fill(pass);
        await this.loginBt.click();
        await this.waitForSelector;
    }

}
