//Test - 1
const { test, events, request, expect } = require('@playwright/test');

const loginPayload = { email: "harishholkar.99@gmail.com", password: "Udemy@5657" };

const SIX_EVENTS_RESPONSE = {
    data: [
        { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
        { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
        { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
        { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
        { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
        { id: 6, title: 'AI & ML Expo', category: 'Conference', eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
    ],
    pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};
let token;
const eventCards = 6;
test.beforeAll(async () => {

    const apicontext = await request.newContext();
    const loginResponse = await apicontext.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login',
        {
            data: loginPayload
        }
    )
    const loginResponseJson = await loginResponse.json();
    token = loginResponseJson.token;
    console.log(token);

});

test('Assignment Banner Visible', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('eventhub_token', value)  // eventhub_token instaed of token since as per localstorage 'Key' name
    }, token)

    await page.goto('https://eventhub.rahulshettyacademy.com');

    // Set up the API mock
    await page.route('https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12',
        async route => {
            const response = await page.request.fetch(route.request());
            const body = JSON.stringify(SIX_EVENTS_RESPONSE);
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
    expect(await page.locator('#event-card').count()).toBe(eventCards);

    //Verify banner is visible
    await expect(page.locator('.border-amber-200')).toBeVisible();
    expect(await page.locator('.border-amber-200 span strong').first().textContent()).toBe('9 bookings');

});