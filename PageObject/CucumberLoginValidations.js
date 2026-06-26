class CucumberLoginValidations {


    constructor(page) {
        this.page = page;
        this.userName = page.locator('#username');
        this.password = page.locator('#password');
        this.checkBox = page.locator("[type='checkbox']");
        this.signIn = page.locator("[name='signin']");
        this.errorText = page.locator("[style*='block']");
    }

    async loginWithIncorrectCreds(username, password) {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.checkBox.check();
        await this.signIn.click();
    }

    async verifytheErrorText(expect) {
        await expect(this.errorText).toContainText("Incorrect");
    }
}

module.exports={CucumberLoginValidations}