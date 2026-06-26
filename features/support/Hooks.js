const playwright = require('@playwright/test');
const {Before, After, BeforeStep, AfterStep, Status} = require('@cucumber/cucumber');
const {POManager} = require('../../PageObject/POManager');


Before({tags: "@Regression", timeout:100*1000} , async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
})

After("@Regression",function(){

console.log("This is After Hook");

})


BeforeStep({tags:"@Regression"},function(){
console.log("Before Step");
})

AfterStep("@Regression and @Sanity",async function({result}){
if (result.status === Status.FAILED){
    await this.page.screenshot({path : "cucumberFailedStep.png"});
}
})