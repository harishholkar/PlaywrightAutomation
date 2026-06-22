class PostAPIUtils{

    constructor(apiContext, loginPayload){
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
  
 //Login POST API
async getToken(){

    const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {
      data: this.loginPayload
    })
    const loginResponseJson = await loginResponse.json(); // .body, .headers, .json, .ok, .status
    const token = loginResponseJson.token;
    console.log(token);
    return token;
}

  //Order creation POST API
async createOrder(orderCreationPayload){

    let response = {};
    response.token = await this.getToken();
    const orderCreationResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', 
    
            {
                data : orderCreationPayload,
                headers : {
                      'Authorization' : response.token,
                      'content-type' : 'application/json'
            }
            }
        )
        const orderCreationJson = await orderCreationResponse.json();
        const orderID = orderCreationJson.orders[0];
        response.orderID = orderID;
        return response;
}

}

module.exports = {PostAPIUtils};