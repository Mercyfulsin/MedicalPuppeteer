const puppeteer = require('puppeteer');
const CREDS = require('./creds');
const USERNAME = '#UserID';
const PASSWORD = '#UserPW';
const LOGIN = '#cmdSubmit';
const POLICY = '#RecipID';
const DOB = '#RecipDOB';
const DOS = '#RecipDOS';
const DOI = '#RecipDOI';
const ISSUE_DATE = new Date().toLocaleDateString();
const SUBMIT = '#middle_column > div.column_inner > form > div:nth-child(2) > input[type=submit]:nth-child(1)';
const URL = 'https://www.medi-cal.ca.gov/Eligibility/Login.asp';

async function run() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(URL, {
        waitUntil: 'networkidle2',
    });
    console.log("@Login page");
    await page.click(USERNAME);
    await page.keyboard.type(CREDS.username);
    await page.click(PASSWORD);
    await page.keyboard.type(CREDS.password);
    await page.click(LOGIN);
    await page.goto("https://www.medi-cal.ca.gov/Eligibility/Eligibility.asp", { waitUntil: 'networkidle2' });
    console.log("@Eligibility Page");
    await page.click(POLICY);
    await page.keyboard.type(CREDS.policy);
    await page.click(DOB);
    await page.keyboard.type(CREDS.dob);
    await page.click(DOS);
    await page.keyboard.type(CREDS.dos);
    await page.click(DOI);
    await page.keyboard.type(ISSUE_DATE);
    await page.click(SUBMIT);
    await page.waitForNavigation({ timeout: 1000, waitUntil: 'load' }).catch(err => console.log(err));
    console.log("@Resultant Page");
    const data = await page.$$eval('center > b', info => info.map(item => item.innerHTML));
    console.log(data);
    browser.close();
}
run();