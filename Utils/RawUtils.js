class RawUtils {

    constructor(apiContext, loginPayload, createOrderpaylaod) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
        this.createOrderpaylaod = createOrderpaylaod;

    }

    async getOrderID() {

        let details = {};
        details.token = await this.getToken();
        const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: this.createOrderpaylaod,
                headers: {
                    'Authorization': details.token,
                    'Content-type': 'application/json'
                }
            }
        )
        const createOrderResponseJson = await createOrderResponse.json();
        const orderID = createOrderResponseJson.orders[0];
        console.log(orderID);
        details.orderID = orderID;
        return details;
    }
}

module.exports = { RawUtils }