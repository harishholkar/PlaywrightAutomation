//Test - 2
const { test, expect, request } = require('@playwright/test');

const FOUR_EVENTS_RESPONSE = {
    data: [
        { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
        { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
        { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
        { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    ],
    pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};
let webContext;
const eventCards = '4';

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.locator("#email").fill("harishholkar.99@gmail.com");
    await page.locator("#password").fill("Udemy@5657");
    await page.locator("#login-btn").click();
    await page.locator('div.justify-center span').first().waitFor();
    await context.storageState({ path: 'newState.json' });
    webContext = await browser.newContext({ storageState: 'newState.json' });

});

test('Assignment Banner not visible', async () => {

    const page = await webContext.newPage();
    await page.goto('https://eventhub.rahulshettyacademy.com');

    // Set up the API mock
    await page.route('https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12',
        async route => {
            const response = await page.request.fetch(route.request());
            const body = JSON.stringify(FOUR_EVENTS_RESPONSE);
            route.fulfill({
                response,
                body
            })
        }
    )

    await page.locator('#nav-events').click();
    await page.waitForResponse('https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12');

    // Verify cards loaded from mock
    await page.locator('#event-card').first().waitFor();
    expect(await page.locator('#event-card').count()).toBe(Number(eventCards));

    //Verify banner is visible
    await expect(page.locator('.border-amber-200')).not.toBeVisible();

    await page.pause();
})