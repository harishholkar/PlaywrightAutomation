const {test,expect} = require('@playwright/test');
const { log, count } = require('node:console');
// Login-add product to cart-check product in cart-checkout-fill details-take order ID and verify msg
test('Dynamic Product',async({browser})=>{

const context = await browser.newContext();
const page = await context.newPage();

const productName = 'iphone 13 pro';
const dropdownOption = ' India';
const email = page.locator("#userEmail");
const pass = page.locator("#userPassword");
const loginBt = page.locator("#login");
const cart = page.locator("[routerlink='/dashboard/cart']");
const cartText = page.locator("//h3[text()='iphone 13 pro']");  //xpath
const cartTextCSS = page.locator("h3:has-text('iphone 13 pro')"); //CSS
const checkoutBt = page.locator("//button[text()='Checkout' ]");
const dropdown = page.locator("[placeholder*='Country']");
const DDOptions = page.locator("section.ta-results button");
const cardDetails = page.locator("[type='text']");
const couponText = page.locator("text=* Coupon Applied");
const orderMsg = page.locator(".hero-primary");
const orderID = page.locator(".em-spacer-1 label");
const emailValidation = page.locator(".user__name label");

await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

await email.fill("harishholkar.99@gmail.com");
await pass.fill("Udemy@5657");
await loginBt.click();

// Approch 1: Goto desired product capture the name and click Add To Cart button
//    const products = page.locator(".card-body b");
//    const addToCart = page.locator(".w-10");

//    await page.waitForSelector(".card-body b");
//    const allProducts = await products.allTextContents();

//    for(let i=0; i<=allProducts.length; i++){

//     if(allProducts[i] == productName ){
//      await addToCart.nth(i).click();
//      break;    
//         }
//     }

// Approch 2: Goto desired product capture the name and click Add To Cart button

    const productArea = page.locator(".card-body");

    await page.waitForSelector(".card-body b");  //to ensure few products are loaded
    const productCount = await productArea.count();
    console.log('Product Count=',+productCount);


    for (let i=0; i<productCount; ++i){

        if(await productArea.nth(i).locator('b').textContent() === productName){  //chain locatoe
         
        await productArea.nth(i).locator("text= Add To Cart").click();       //chain locator
        break;
        }
    }

 
await cart.click();
console.log(await cartText.textContent());
//Approch 1 xpath
    // await expect(cartText).toContainText("iphone 13 pro");
    // await checkoutBt.click();

//Approch 2 CSS
    await page.locator(".cartSection h3").last().waitFor();
    await expect(cartTextCSS.isVisible()).toBeTruthy();
    await checkoutBt.click();

await dropdown.pressSequentially('ind');
await page.waitForSelector("section.ta-results button");
const optionCount = await DDOptions.count();
for (let i=0; i<optionCount; i++){

    if(await DDOptions.nth(i).textContent() == dropdownOption){
     
        await DDOptions.nth(i).click();
        break;
    }

}

//CVV code
await cardDetails.nth(1).fill('054');
//Name on card
await cardDetails.nth(2).fill('Body Time');
//Apply coupon
await cardDetails.nth(3).fill("rahulshettyacademy");
await page.locator("button:has-text('Apply Coupon')").click();
//await couponText.waitFor();     no need since in the next line playwright is waiting for text
console.log(await couponText.textContent());
await expect(couponText).toContainText('Applied');
await expect(emailValidation).toHaveText("harishholkar.99@gmail.com");
await page.locator("text=Place Order ").click();

console.log(await orderMsg.textContent());
await expect(orderMsg).toHaveText(" Thankyou for the order. ")
console.log(await orderID.last().textContent());

await page.pause();
});