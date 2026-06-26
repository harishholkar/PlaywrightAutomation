Feature: Login Validations

@Regression
Scenario: Verify the login validations
Given The user logged in with the creds as "harishholkar.999@gmail.com" and "Udemy@5657"
When Verify the error message displayed