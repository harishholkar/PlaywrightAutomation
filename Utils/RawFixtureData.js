const { test } = require('@playwright/test');

exports.fixtureData =test.extend({

    googleFixture: {

        email: "harishholkar.99@gmail.com",
        pass: "Udemy@5657",
        productName: "iphone 13 pro",
        dropdownOption: " India",
        CVV: "1234",
        nameOnCard: "Astor Regal",
        coupon: "rahulshettyacademy",
        coupText: "Applied"
    }
})