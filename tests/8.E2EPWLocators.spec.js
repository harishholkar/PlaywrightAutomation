const{test,expect} = require('@playwright/test')

test('PW Inbuilt Locators',async({page})=>{

    await page.goto('https://rahulshettyacademy.com/angularpractice/');

    await page.getByPlaceholder("Password").fill("12sdfsf");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Password").fill("");
    await page.getByLabel("Password").fill("Auto Pass");
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByLabel("Employed").click();
    await page.getByRole("button",{name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name:'ProtoCommerce'}).isVisible();
    await page.getByRole("link",{name:'Shop'}).click();
    
    await page.locator("app-card").filter({hasText:'Blackberry'}).getByRole("button").click();


    await page.pause();

});

//E2E testing by using Playwright locators
test('PW locators',async({page})=>{
    
    const email = 'harishholkar.99@gmail.com';
    const pass = 'Udemy@5657';
    const itemText = 'ADIDAS ORIGINAL';

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder('enter your passsword').fill(pass);
    await page.getByRole("button",{name:'Login'}).click();
    await page.locator(".card-body").first().waitFor();
    await page.locator(".card-body").filter({hasText:itemText}).getByRole("button",{name:'Add To Cart'}).click();
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
    await page.locator(".cart").first().waitFor();
    await expect(page.getByText(itemText)).toBeVisible();
    await page.getByRole("button",{name:'Checkout'}).click();
    await page.locator(".details__user").waitFor();
    await page.getByPlaceholder("Select Country").pressSequentially('ind');
    await page.getByRole("button",{name:'India'}).nth(1).click();
    await expect(page.getByText("harishholkar.99@gmail.com")).toBeVisible();
    await page.locator("[type='text']").nth(1).fill('054');
    await page.locator("[type='text']").nth(2).fill('Automation');
    await page.locator("[type='text']").nth(3).fill("rahulshettyacademy");
    await page.getByRole("button",{name:'Apply Coupon'}).click();
    await expect(page.getByText("* Coupon Applied")).toBeVisible();
    await page.getByText("Place Order ").click();
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
    console.log(await page.locator(".em-spacer-1 label").last().textContent());

    await page.getByRole("button",{name:'ORDERS'}).click();   
    await page.locator("tr.ng-star-inserted").filter({hasText:'6a0c3b5b17ee3e78ba87d86d'}).getByRole("button",{name:'View'}).click();
    await expect(page.getByText("6a0c3b5b17ee3e78ba87d86d")).toBeVisible();
    expect (await page.getByText("ADIDAS ORIGINAL").isVisible()).toBeTruthy();
    await page.pause();

});