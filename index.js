const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const USERNAME = '#UserID';
const PASSWORD = '#UserPW';
const LOGIN = '#cmdSubmit';
const URL = 'https://www.medi-cal.ca.gov/Eligibility/Login.asp';

async function run() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(URL, {
        waitUntil: 'networkidle2',
    });
    console.log("@Login page");
    await page.click(USERNAME);
    await page.keyboard.type(CREDS.username);

    await page.click(PASSWORD);
    await page.keyboard.type(CREDS.password);
    await page.screenshot({ path: 'screenshots/medical.png' });
    await page.click(LOGIN);
    await page.goto("https://www.medi-cal.ca.gov/Eligibility/Eligibility.asp", { waitUntil: 'networkidle2' });
    console.log("@Eligibility Page");
    browser.close();
}

run();