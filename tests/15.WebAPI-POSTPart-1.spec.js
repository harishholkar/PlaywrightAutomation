//POST Login API-https://rahulshettyacademy.com/api/ecom/auth/login

const {test, expect, request} = require('@playwright/test');

// Skiping the regular login for every testcase

const loginPayload = {userEmail:"harishholkar.99@gmail.com",userPassword:"Udemy@5657"};
let responseToken; 
test.beforeAll(async()=>{

    //Login POST API
const apiContext = await request.newContext();

const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',

    {
      data: loginPayload
    })
    expect(await loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json(); // .body, .headers, .json, .ok, .status
    responseToken = loginResponseJson.token;
    console.log(responseToken);
});

// JS-Script to inject token into local storage (For Login)
test('Test Title',async({page})=>{

await page.addInitScript(value =>{

    window.localStorage.setItem("token",value); // we have to check this, where our developer has stored the token info (Barrier token, Oth2) also it may be in Session Storage or cookies, accordingly this line will be changed 

},responseToken)

await page.goto("https://rahulshettyacademy.com/client");
});

