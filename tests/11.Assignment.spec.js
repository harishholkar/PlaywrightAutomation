const{test,expect} = require('@playwright/test');

async function loginAndGoToBookingPage(page){

await page.goto("https://eventhub.rahulshettyacademy.com");
//login
    await page.locator("#email").fill("harishholkar.99@gmail.com");
    await page.locator("#password").fill("Udemy@5657");
    await page.locator("#login-btn").click();
    //Visibility of Browse Events →
    await expect(page.locator("//span[text()='Browse Events →']")).toBeVisible();
}

test('Refund Eligibility',async({page})=>{
    
    const URL = 'https://eventhub.rahulshettyacademy.com';
    await loginAndGoToBookingPage(page);

    //Test 1 — Single ticket booking is eligible for refund
    //Events
    await page.locator("#nav-events").click();
    await page.locator("#event-card").first().waitFor();
    await page.locator("#event-card").first().locator("#book-now-btn").click();
    //Bookings
    await page.locator("#customerName").fill("May Raskar");
    await page.locator("#customer-email").fill("mrskar@gmail.com");
    await page.locator("#phone").fill("+919807456789");
    await page.locator("#confirm-booking").click();
    await page.getByRole("button",{name:"View My Bookings"}).click();
    await expect(page).toHaveURL(URL+"/bookings");
    //View Details
    await page.locator("//button[text()='View Details']").first().click();
    await expect(page.getByText("Booking Information")).toBeVisible();
    const bookingRef = await page.locator(".font-mono ").first().textContent();
    const eventName = await page.locator("h1.text-2xl").textContent();
    //Booking ref and event title first char validation
    const firstCharBookRef = bookingRef.split("")[0];
    const firstNameEventName = eventName.split(" ")[0];
    const firstCharEventNameBook = firstNameEventName.split("")[0];
    await expect(firstCharBookRef).toBe(firstCharEventNameBook);
    //Refund Eligibility
    await page.getByRole("button",{name:"Check eligibility for refund?"}).click();
    await expect(page.locator("#refund-spinner")).toBeVisible();

    //Refund message
    await expect(page.locator("#refund-result")).toBeVisible();
    await expect(page.locator("#refund-result span")).toHaveText("Eligible for refund. Single-ticket bookings qualify for a full refund.");
    
});

test('No Refund Eligibility',async({page})=>{

    const URL = 'https://eventhub.rahulshettyacademy.com';
    await loginAndGoToBookingPage(page);

    //Test 2 — Group ticket booking is NOT eligible for refund
    //Events
    await page.locator("#nav-events").click();
    await page.locator("#event-card").first().waitFor();
    await page.locator("#event-card").first().locator("#book-now-btn").click();
    //Bookings
    await page.locator("[type='button']").last().click();
    await page.locator("[type='button']").last().click();
    await page.locator("#customerName").fill("May Raskar");
    await page.locator("#customer-email").fill("mrskar@gmail.com");
    await page.locator("#phone").fill("+919807456789");
    await page.locator("#confirm-booking").click();
    await page.getByRole("button",{name:"View My Bookings"}).click();
    await expect(page).toHaveURL(URL+"/bookings");
    //View Details
    await page.locator("//button[text()='View Details']").first().click();
    await expect(page.getByText("Booking Information")).toBeVisible();
    const bookingRef = await page.locator(".font-mono ").first().textContent();
    const eventName = await page.locator("h1.text-2xl").textContent();
    //Booking ref and event title first char validation
    const firstCharBookRef = bookingRef.split("")[0];
    const firstNameEventName = eventName.split(" ")[0];
    const firstCharEventNameBook = firstNameEventName.split("")[0];
    await expect(firstCharBookRef).toBe(firstCharEventNameBook);
    //Refund Eligibility
    await page.getByRole("button",{name:"Check eligibility for refund?"}).click();
    await expect(page.locator("#refund-spinner")).toBeVisible();

    //Refund message
    await expect(page.locator("#refund-result")).toBeVisible();
    await expect(page.locator("#refund-result span")).toHaveText("Not eligible for refund. Group bookings (3 tickets) are non-refundable.");
    
});