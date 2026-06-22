class AssignmentUtils24 {

    constructor(apicontext, loginPayloadA, loginPayloadB, createBookingPayload) {
        this.apicontext = apicontext;
        this.createBookingPayload = createBookingPayload;
        this.loginPayloadA = loginPayloadA;
        this.loginPayloadB = loginPayloadB;

    }

    async getTokenA() {
    const loginResponse = await this.apicontext.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login',
        {
            data: this.loginPayloadA
        }
    )
    const loginResponseJson = await loginResponse.json();
    const tokenA = loginResponseJson.token;
    console.log(tokenA);
    return tokenA;
}

    async getTokenB() {
    const loginResponse = await this.apicontext.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login',
        {
            data: this.loginPayloadB
        }
    )
    const loginResponseJson = await loginResponse.json();
    const tokenB = loginResponseJson.token;
    console.log(this.tokenB);
    return tokenB;
}

    async getBookingIdA() {
    const together = {};
    together.tokenA = await this.getTokenA();
    together.tokenB = await this.getTokenB();
    const createBookingResponse = await this.apicontext.post('https://api.eventhub.rahulshettyacademy.com/api/bookings',
        {
            data: this.createBookingPayload,
            headers: {
                'Authorization': "Bearer " + together.tokenA
                //'Content-Type': 'application/json
            }
        }
    )
    const createBookingResponseJson = await createBookingResponse.json();
    const bookingIDA = createBookingResponseJson.data.id;
    together.bookingIDA = bookingIDA;
    return together;
}

}

module.exports = { AssignmentUtils24 };