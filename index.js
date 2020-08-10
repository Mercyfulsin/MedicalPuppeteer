const puppeteer = require('puppeteer');
const CREDS = require('./creds.js');
const USERNAME = '#MainContent_txtUserID';
const PASSWORD = '#MainContent_txtPassword';
const LOGIN = '#MainContent_btnSubmit';

//Eligiblity
const POLICY = '#RecipID';
const DOB = '#RecipDOB';
const DOS = '#RecipDOS';
const DOI = '#RecipDOI';

//Claim Status Transcation (PTN)
const CST_ID = '#MainContent_txtSubscriberID';
const CST_DOS = '#MainContent_txtDOSFrom';


const ISSUE_DATE = new Date().toLocaleDateString();
const SUBMIT = '#middle_column > div.column_inner > form > div:nth-child(2) > input[type=submit]:nth-child(1)';
const URL = 'https://www.medi-cal.ca.gov/MCWebPub/Login.aspx';

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
    var result = [];

    for (var i = 0; i < 100; i++) {
        await page.goto("https://www.medi-cal.ca.gov/APS/ClaimStatus.aspx", { waitUntil: 'networkidle2' });
        console.log("@Eligibility Page");
        var temp_DOS = CREDS.cst_DOS[i];
        if (CREDS.cst_DOS[i] = "" || CREDS.cst_ID[i] == "") {
            result[i] = "NOT IN MEDICAL";
        } else {
            console.log(temp_DOS);
            //#region Claim Status Transaction Process
            await page.click(CST_ID);
            await page.keyboard.type(CREDS.cst_ID[i]);
            await page.click(CST_DOS);
            await page.type(CST_DOS, temp_DOS);
            await page.click(LOGIN);
            await page.waitForNavigation({ timeout: 4000, waitUntil: 'load' }).catch(err => console.log(err));
            console.log("@Resultant Page");
            const EFT = await page.$$eval('#MainContent_dvOut > center > table > tbody > tr:nth-child(5) > td:nth-child(4) > b', info => info.map(item => item.innerHTML));
            const DATE = await page.$$eval('#MainContent_dvOut > center > table > tbody > tr:nth-child(5) > td:nth-child(2) > b', info => info.map(item => item.innerHTML));
            result[i] = `${EFT}, ${DATE}`;
        }
    }
    //#endregion

    //#region Eligiblity Process 
    // await page.click(POLICY);
    // await page.keyboard.type(CREDS.policy);
    // await page.click(DOB);
    // await page.keyboard.type(CREDS.dob);
    // await page.click(DOS);
    // await page.keyboard.type(CREDS.dos);
    // await page.click(DOI);
    // await page.keyboard.type(ISSUE_DATE);
    // await page.click(SUBMIT);
    //#endregion
    console.log(result);
    // browser.close();
}
run();