Feature:End to end testing  //Test Suite(which contains no of test cases)

Scenario Outline: Verify the End to end testing //Test case
Given The user logged in with valid creds as "harishholkar.99@gmail.com" and "Udemy@5657"
When The user puts "iphone 13 pro" product into the cart
Then Verify that same product is present into the cart
When The user place the order "<dropdownOption>", "<countryKeyword>", "<cvvCode>", "<cardName>", "<coupon>", "<email>" and "<couponText>"
Then Verify that the placed order is present into the order history page

Examples:
|dropdownOption|countryKeyword|cvvCode|cardName|coupon|email|couponText|
|India|ind|987|Automation Time|rahulshettyacademy|harishholkar.99@gmail.com|Applied|