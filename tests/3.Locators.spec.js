const {test,expect} = require ('@playwright/test');
const { sign } = require('node:crypto');

//Practice Page Error Catch and then enter the valid login details and grab the 1st product name
test('Login Page',async({page})=>{

    const userName = page.locator('#username');
    const password = page.locator('#password')
    const checkBox = page.locator("[type='checkbox']");
    const signIn = page.locator("[name='signin']");
    const errorText = page.locator("[style*='block']"); 

    const multiProduct = page.locator(".card-title a"); // exact xpath --> //a[contains(text(),'iphone X')]
                   
               //Incorrect details
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await userName.fill('safsdf'); //incorrect UN
    await password.fill('Learning@830$3mK2'); //correct Pass
    await checkBox.check();
    await signIn.click();
    await expect(errorText).toContainText("Incorrect");
               
                //Correct details
    await userName.fill(""); //to erase existing input
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    await expect(page).toHaveTitle("ProtoCommerce");
    
    console.log(await multiProduct.first().textContent());
    console.log(await multiProduct.nth(1).textContent());
    console.log(await multiProduct.last().textContent());
    
    await expect(multiProduct.nth(0)).toContainText("iphone");

    //console.log(await multiProduct.allTextContents());

    const allTexts = await multiProduct.allTextContents();
    console.log(allTexts);

    });

    //Another site but same scenario, only after loading need to scroll to see products

    test('Login page scroll',async({page})=>{

        const email = page.locator("#userEmail");
        const password = page.locator("#userPassword");
        const login = page.locator("#login");
        const multiproduct = page.locator('.card-body b');

        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

        await email.fill('harishholkar.99@gmail.com');
        await password.fill('Udemy@5657');
        await login.click();
        //await page.waitForLoadState('networkidle'); // so these are three ways to make playwright forcefully wait
       // await page.waitForSelector('.card-body b'); 
        await multiproduct.first().waitFor();
        console.log(await multiproduct.allTextContents());
    })