const { Builder, By, Key, until } = require('selenium-webdriver');
const chai = require('chai');


const expect = chai.expect;

describe('Login Form Tests', function () {
    let driver;

    before(async function () {
        // Start a new Chrome browser before the tests
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        // Close the browser after the tests
        await driver.quit();
    });

    it('should submit the login form with valid credentials', async function () {
        // Navigate to the login page
        await driver.get('http://localhost:3000/login');

        // Find elements by CSS selectors
        const usernameInput = await driver.findElement(By.css('#username'));
        const passwordInput = await driver.findElement(By.css('#password'));
        const submitButton = await driver.findElement(By.css('input[type="submit"]'));

        // Input valid credentials
        await usernameInput.sendKeys('username');
        await passwordInput.sendKeys('password');

        // Submit the form
        await submitButton.click();

    });

    it('should display "Invalid details" for invalid credentials', async function () {
        // Navigate to the login page
        await driver.get('http://localhost:3000/login');

        // Find elements by CSS selectors
        const usernameInput = await driver.findElement(By.css('#username'));
        const passwordInput = await driver.findElement(By.css('#password'));
        const submitButton = await driver.findElement(By.css('input[type="submit"]'));

        // Input invalid credentials
        await usernameInput.sendKeys('invalid-username');
        await passwordInput.sendKeys('invalid-password');

        // Submit the form
        await submitButton.click();

        // Wait for the "Invalid details" message to appear
        const invalidMessage = await driver.findElement(By.css('p'));
        await driver.wait(until.elementIsVisible(invalidMessage), 5000);

        // Assert the presence of the "Invalid details" message
        const messageText = await invalidMessage.getText();
        expect(messageText).to.equal('Invalid details');
    });
});



describe('Register Form Tests', function () {
    let driver;

    before(async function () {
        // Start a new Chrome browser before the tests
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        // Close the browser after the tests
        await driver.quit();
    });

    it('should submit the registration form with valid details', async function () {
        // Navigate to the registration page
        await driver.get('http://localhost:3000/register');

        // Find elements by CSS selectors
        const usernameInput = await driver.findElement(By.css('#username'));
        const emailInput = await driver.findElement(By.css('#email'));
        const phoneInput = await driver.findElement(By.css('#phone'));
        const passwordInput = await driver.findElement(By.css('#password'));
        const confirmPasswordInput = await driver.findElement(By.css('#conpassword'));
        const dateOfBirthInput = await driver.findElement(By.css('#dateofbirth'));
        const submitButton = await driver.findElement(By.css('input[type="submit"]'));

        // Input valid details
        await usernameInput.sendKeys('your-username');
        await emailInput.sendKeys('your-email@example.com');
        await phoneInput.sendKeys('your-phone-number');
        await passwordInput.sendKeys('your-password');
        await confirmPasswordInput.sendKeys('your-password');
        await dateOfBirthInput.sendKeys('your-date-of-birth');

        // Submit the form
        await submitButton.click();

    });


});



describe('Database and Controller Integration Tests', function () {
    let driver;

    before(async function () {
        // Start a new Chrome browser before the tests
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        // Close the browser after the tests
        await driver.quit();
    });

    it('should connect to the database and update/add balance successfully', async function () {
        // Connect to the database before running tests
        try {
            // Note: You may need to add your own logic for connecting to the database here
        } catch (error) {
            console.error('Error connecting to the database:', error.message);
            process.exit(1); // Exit the process if the connection fails
        }

        // Navigate to a page where the balance update or addition is triggered
        await driver.get('http://localhost:3000/addfunds');

        // Mock the request and response objects
        const mockUserId = 'mockUserId';
        const amount = '50';
        const currency = 'USD';

        // Mock the expected behavior of the server response
        const expectedResponse = { /* Your expected response data */ };

        // Perform actions on the page that trigger the updateoraddBalance function
        // For example, fill out a form or interact with UI elements

        // Wait for the expected server response or any relevant UI changes
        await driver.wait(async () => {
            // Add your conditions for determining that the balance update or addition is successful
            return true; // Replace with your conditions
        }, 5000, 'Timeout waiting for balance update or addition');

        // Add assertions for the expected behavior
        // For example, check if UI elements have been updated or if the expected server response is received
        const actualResponse = { /* Extract data from the page */ };
        expect(actualResponse).to.deep.equal(expectedResponse);
    });

    // Add more test cases for different scenarios
});






