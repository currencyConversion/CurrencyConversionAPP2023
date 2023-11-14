const puppeteer = require('puppeteer');
const { expect } = require('chai');

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
        await page.goto('http://localhost:3000/login');  // Replace with your actual login page URL

        const usernameInput = await page.$('input[name="username"]');
        expect(usernameInput).to.exist;
    });

    // Add more test cases as needed...

});
