const {test, expect} = require('@playwright/test');

//Full Booking Flow with Event Creation

test('Event booking',async({page})=>{

    const email = 'harishholkar.99@gmail.com';
    const pass = 'Udemy@5657';
    const eventTitle = "HarishHEventBooking-"+Date.now();
    const date = "30-06-2028"; //dd-mm-yyyy
    const time = "0345a"; // HHMM a-AM, p-PM
    const baseUrl = 'https://eventhub.rahulshettyacademy.com';

    const emailLoc = page.locator("#email");
    const passLoc = page.locator("#password");
    const signIn = page.locator("#login-btn");
    const admin = page.locator(".relative button");
    const manageEvents = page.locator("[href='/admin/events']");
    const title = page.locator("#event-title-input");
    const description = page.locator("textarea.w-full");
    const category = page.locator("#category");
    const city = page.locator("#city");
    const venue = page.locator("#venue");
    const timeDate = page.locator("//input[@id='event-date-&-time']");
    const price = page.locator("//input[@id='price-($)']");
    const totalSeats = page.locator("#total-seats");
    const submit = page.locator("[type='submit']");


    await page.goto("https://eventhub.rahulshettyacademy.com");

    await emailLoc.fill(email);
    await passLoc.fill(pass);
    await signIn.click();

    await expect(page.locator(".flex-col a span")).toBeVisible();
    
    await admin.first().click();
    await manageEvents.first().click();
    await title.fill(eventTitle);
    await description.fill("This is test automation booking event by harish h")
    await category.selectOption("Workshop");
    await city.fill("Vrindavan");
    await venue.fill("Plto No: 45, Sudarshan nagar, Behind Marketyard, Vrindavan, Dist: Mathura, State:UP");
    
    await timeDate.pressSequentially(date);
    await page.keyboard.press('ArrowRight');
    await timeDate.pressSequentially(time);

    await price.fill('345');
    await totalSeats.fill('20');
    await submit.click();
    await expect(page.getByText("Event created!").isVisible).toBeTruthy();
    await page.locator("#nav-events").click();
    await page.locator("#event-card").first().waitFor();
    expect(await page.locator("#event-card").filter({hasText:eventTitle}).isVisible()).toBeTruthy();
    const seatsavailabelBefore = await page.locator("#event-card").filter({hasText:eventTitle}).locator(".items-center span").textContent();
    console.log(seatsavailabelBefore);
    const seatNoBefore=seatsavailabelBefore.split(" ")[0];
    console.log(seatNoBefore);
    await page.locator("#event-card").filter({hasText:eventTitle}).getByText("Book Now").click();
    await page.locator("#customerName").fill("Rajaram Suryavanshi");
    await page.locator("#customer-email").fill("rajaram@yahoo.com");
    await page.locator("#phone").fill("+919098675645");
    await page.getByRole("button",{name:'Confirm Booking'}).click();
    const bookingRef = await page.locator(".booking-ref").textContent();
    await page.getByRole("button",{name:"View My Bookings"}).click();
    await expect(page).toHaveURL(baseUrl+"/bookings");
    await expect(page.locator("#booking-card").first().isVisible()).toBeTruthy();
    await expect(page.locator("#booking-card").filter({hasText:bookingRef})).toBeVisible();
    await expect(page.locator("#booking-card").filter({hasText:bookingRef})).toContainText(eventTitle);
    await page.locator("#nav-events").click();
    await page.locator("#event-card").first().waitFor();
    await expect(page.locator("#event-card").filter({hasText:eventTitle}).isVisible()).toBeTruthy();

    const seatsavailabelAfter = await page.locator("#event-card").filter({hasText:eventTitle}).locator(".items-center span").textContent();
    console.log(seatsavailabelAfter);
    const seatNoAfter=seatsavailabelAfter.split(" ")[0];
    console.log(seatNoAfter);
    await expect(Number(seatNoAfter)===Number(seatNoBefore)-1).toBeTruthy();
});