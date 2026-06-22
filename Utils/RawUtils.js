class RawUtils {

    constructor(apiContext, postReqPayload, createOrderPayload, expect) {
        this.apiContext = apiContext;
        this.postReqPayload = postReqPayload;
        this.createOrderPayload = createOrderPayload;
        this.expect = expect;
    }

    async getToken() {
        //Login  API

        const postResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            {
                data: this.postReqPayload
            }
        )
        this.expect(await postResponse.ok()).toBeTruthy();
        const jsonResponse = await postResponse.json();
        const token = jsonResponse.token;
        console.log(token);
        return token;
    }

    async getOrderID() {
        //Order Creation API
        let requiredInput = {};
        requiredInput.token = await this.getToken();
        const createOrderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: this.createOrderPayload,
                headers: {
                    'Authorization': requiredInput.token,
                    'Content-type': 'application/json'
                }
            }
        )
        this.expect(await createOrderResponse.ok()).toBeTruthy();
        const jsonCOResponse = await createOrderResponse.json();
        const orderID = jsonCOResponse.orders[0];
        console.log(orderID);

        requiredInput.orderID = orderID;
        return requiredInput;

    }

};
module.exports = {RawUtils};