const fixExtend = require('@playwright/test');

exports.customTest = fixExtend.test.extend({
 //Data is stored into fixture
 //So for multiple data create multiple fixtures and use required set of data fixture into script
 
   newFixture:{
    email : "harishholkar.99@gmail.com",    
    pass : "Udemy@5657",    
    productName : "ADIDAS ORIGINAL",    
    countryKeywords : "cub",    
    dropdownOption : " Cuba",    
    cvvCode : "054",    
    cardName : "Body Time",    
    coupon : "rahulshettyacademy",    
    couponText : "Applied"
   },

    newFixture1:{
    email : "ayushkhanna@gmail.com",    
    pass : "Ayush@5657",    
    productName : "iphone 13 pro",    
    countryKeywords : "cub",    
    dropdownOption : " Cuba",    
    cvvCode : "054",    
    cardName : "Body Time",    
    coupon : "rahulshettyacademy",    
    couponText : "Applied"
   }

})