class LoginPO {

    constructor(page) {
        this.page = page;
        this.email = page.locator("#userEmail");
        this.pass = page.locator("#userPassword");
        this.loginBt = page.locator("#login");
    }

    async goToURL() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async loginCreds(email, pass) {
        await this.email.fill(email);
        await this.pass.fill(pass);
        await this.loginBt.click();
    }
}
module.exports= {LoginPO};