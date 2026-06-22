//Create a account for A and B
//Account A - Create a booking via API and get Booking ID
//Account B - Try to acces the booking of Account A

const { test, expect, request } = require('@playwright/test');
const { validateHeaderValue } = require('node:http');
const { AssignmentUtils24 } = require('../Utils/AssignmentUtils24');

const loginPayloadA = { email: "ayushkhanna@yahoo.com", password: "Ayush@5657" };
const loginPayloadB = { email: "babanraje@gmail.com", password: "Baban@5657" };
const createBookingPayload = { customerName: "Ayush Khanna", customerEmail: "ayushkhanna@yahoo.com", customerPhone: "+911234567890", quantity: 1, eventId: 3 };
let together;

test.beforeAll(async () => {

    const apicontext = await request.newContext();
    const ApiUtis = new AssignmentUtils24(apicontext, loginPayloadA, loginPayloadB, createBookingPayload);
    together = await ApiUtis.getBookingIdA();

});

test('User A', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('eventhub_token', value)
    }, together.tokenA)

    await page.goto('https://eventhub.rahulshettyacademy.com');
    await page.locator('div.justify-center span').first().waitFor();
    await page.locator('#nav-bookings').click();
    await page.waitForLoadState("networkidle");
    expect(await page.locator("[data-testid ='booking-id']").nth(0).textContent()).toBe('#' + together.bookingIDA);

});

test('User B', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('eventhub_token', value)
    }, together.tokenB)

    await page.goto('https://eventhub.rahulshettyacademy.com');
    await page.locator('div.justify-center span').first().waitFor();
    await page.locator('#nav-bookings').click();
    await page.locator("//button[text()='View Details']").first().waitFor();

    await page.route('https://api.eventhub.rahulshettyacademy.com/api/bookings/*',
        route=>route.continue({url : "https://api.eventhub.rahulshettyacademy.com/api/bookings/"+together.bookingIDA})
    )
    await page.locator("//button[text()='View Details']").first().click();

    await page.pause();
    await expect(page.locator('.max-w-4xl h3').first()).toHaveText('Access Denied');
    await expect(page.locator('.max-w-4xl p')).toHaveText("You are not authorized to view this booking.");
   
})