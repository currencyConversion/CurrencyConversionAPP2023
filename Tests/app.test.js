const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const puppeteer = require("puppeteer");  // Adjust the path based on your project structure

chai.use(chaiHttp);
const expect = chai.expect;

describe('View Tests', () => {
    it('should render the Currency Exchange view', (done) => {
        chai.request(app)
            .get('/')  // Assuming '/' is the route that renders the 'index' view
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.html;  // Assuming the response should be HTML

                // Add more assertions as needed
                // You might want to check specific elements or text in the rendered view


            });
    });
});



describe('Login Screen Tests', () => {
    let browser;
    let page;

    before(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    after(async () => {
        await browser.close();
    });

    it('should display an input field for username', async () => {
        await page.goto('http://localhost:3000/login');

        const usernameInput = await page.$('input[name="username"]');
        expect(usernameInput).to.exist;




    });

    it('should display an input field for password', async () => {
        await page.goto('http://localhost:3000/login');
        const passwordInput = await page.$('input[name="password"]');
        expect(passwordInput).to.exist;

    });



});

describe('Register Screen Tests', () => {
    let browser;
    let page;

    before(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    after(async () => {
        await browser.close();
    });

    it('should display an input field for username', async () => {
        await page.goto('http://localhost:3000/register');
        const usernameInput = await page.$('input[name="username"]');
        expect(usernameInput).to.exist;

    });

    it('should display an input field for password', async () => {
        await page.goto('http://localhost:3000/register');
        const passwordInput = await page.$('input[name="password"]');
        expect(passwordInput).to.exist;

    });

    it('should display an input field for phone', async () => {
        await page.goto('http://localhost:3000/register');
        const phoneInput = await page.$('input[name="phone"]');
        expect(phoneInput).to.exist;

    });

    it('should display an input field for email', async () => {
        await page.goto('http://localhost:3000/register');
        const emailInput = await page.$('input[name="email"]');
        expect(emailInput).to.exist;

    });

    it('should display an input field for date of birth', async () => {
        await page.goto('http://localhost:3000/register');
        const dobInput = await page.$('input[name="dateofbirth"]');
        expect(dobInput).to.exist;

    });

    it('should display an input field for confirm password', async () => {
        await page.goto('http://localhost:3000/register');
        const confirmInput = await page.$('input[name="conpassword"]');
        expect(confirmInput).to.exist;

    });


});

describe('Mainpage Screen Tests', () => {
    let browser;
    let page;

    before(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    after(async () => {
        await browser.close();
    });

    it('should display an input field for username', async () => {
        await page.goto('http://localhost:3000/mainpage');
        const AmountInput = await page.$('input[name="amount"]');
        expect(AmountInput).to.exist;

    });

    it('should display an input field for password', async () => {
        await page.goto('http://localhost:3000/mainpage');
        const recieveInput = await page.$('input[name="receive"]');
        expect(recieveInput).to.exist;

    });



});


const { connectDB } = require('../app_server/models/db');
const mongoose = require("mongoose");
describe('Database Connection', () => {
    before(async () => {
        // Connect to the database before running tests
        try {
            await connectDB();
        } catch (error) {
            console.error('Error connecting to the database:', error.message);
            process.exit(1); // Exit the process if the connection fails
        }
    });

    it('should connect to the database', () => {
        // No need to connect here, as it was done in the 'before' hook
        // If the test reaches this point, the connection is successful
        expect(true).to.equal(true);
    });

    after(async () => {
        // Optionally, you can disconnect from the database after running tests
        try {
            await mongoose.disconnect();
        } catch (error) {
            console.error('Error disconnecting from the database:', error.message);
        }
    });
});

const WebsiteController = require('../app_server/controllers/websiteController'); // Adjust the path accordingly
const models = require('../app_server/models/locations'); // Adjust the path accordingly


chai.use(chaiHttp);
const sinon = require('sinon');

describe('WebsiteController', () => {
    describe('updateoraddBalance', () => {
        it('should update or add balance successfully', async () => {
            // Mock the request and response objects
            const req = {
                body: {
                    amount: '50',
                    currency: 'USD',
                },
                session: {
                    userId: 'mockUserId',
                },
            };

            let renderCalled = false;
            let statusCalled = false;
            let jsonCalled = false;

            const res = {
                render: (view, data) => {
                    renderCalled = true;
                    // Add assertions for the rendered view and data if needed
                },
                status: (statusCode) => {
                    statusCalled = true;
                    // Add assertions for the status code if needed
                    return res;
                },
                json: (data) => {
                    jsonCalled = true;
                    // Add assertions for the JSON response if needed
                },
            };

            // Mock the models.AccountModel.findOne and models.AccountModel.save functions
            const mockFoundCurrency = {
                balance: 100,
                save: async () => {},
            };

            const mockNewBalance = {
                save: async () => {},
            };

            const findOneStub = sinon.stub(models.AccountModel, 'findOne').resolves(mockFoundCurrency);
            const saveStub = sinon.stub(mockFoundCurrency, 'save').resolves();
            const newBalanceStub = sinon.stub(models.AccountModel, 'create').resolves(mockNewBalance);

            // Call the controller function
            await WebsiteController.updateoraddBalance(req, res);

            // Add assertions for the behavior of the function
            expect(renderCalled).to.equal(true);
            expect(statusCalled).to.equal(false); // You may need to adjust based on your error handling
            expect(jsonCalled).to.equal(false);

            // Restore the stubs
            findOneStub.restore();
            saveStub.restore();
            newBalanceStub.restore();
        });

        // Add more test cases for different scenarios
    });
});
