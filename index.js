//#region  Constants/Globals
const myArg = process.argv.slice(2);
const puppeteer = require('puppeteer');
const CREDS = require('./creds.js');
<<<<<<< HEAD
const MEDI = require('./MEDI.js');
=======
const { cst_DOS, cst_ID } = require('./creds.js');
const { parse } = require('path');
>>>>>>> 9ecf1dfe19331cbebd42df3d7b7885dd5bffebc9
const USERNAME = '#MainContent_txtUserID';
const PASSWORD = '#MainContent_txtPassword';
const LOGIN = '#MainContent_btnSubmit';
fs = require('fs');
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
const LOGOUT = 'https://www.medi-cal.ca.gov/MCWebPub/Cookiemonster.aspx';
var result = [];
var DHS = [];
var EC = [];
<<<<<<< HEAD
var Limit = 5000;
=======
var Limit = parseInt(myArg[1]);
var Start = parseInt(myArg[0]);
const HEADLESS = parseInt(myArg[2]);
>>>>>>> 9ecf1dfe19331cbebd42df3d7b7885dd5bffebc9
//#endregion

async function run() {
    //#region Initiate Browser
<<<<<<< HEAD
    const browser = await puppeteer.launch({ headless: true });
=======
    const browser = await puppeteer.launch({ headless: HEADLESS });
>>>>>>> 9ecf1dfe19331cbebd42df3d7b7885dd5bffebc9
    const page = await browser.newPage();
    await page.goto(URL, {
        waitUntil: 'networkidle2',
    });
    //#endregion

    //#region First Credential
    console.log("@Login page");
    await page.click(USERNAME);
    await page.keyboard.type(CREDS.username);
    await page.click(PASSWORD);
    await page.keyboard.type(CREDS.password);
    await page.click(LOGIN);
    //#endregion
    console.log(CREDS.cst_DOS.length)
    for (var i = 0; i < MEDI.length; i++) {
        await page.goto("https://www.medi-cal.ca.gov/APS/ClaimStatus.aspx", { waitUntil: 'networkidle2' });
        //console.log("@Eligibility Page");
        var temp_DOS = cst_DOS[i];
        if (cst_DOS[i] == "" || cst_ID[i] == "") {
            DHS[i] = result[i] = "NOT IN MEDICAL";
        } else {
            //#region Claim Status Transaction Process
            await page.click(CST_ID);
            await page.keyboard.type(cst_ID[i]);
            await page.click(CST_DOS);
            await page.type(CST_DOS, cst_DOS[i]);
            await page.click(LOGIN);
            await page.waitForNavigation({ timeout: 4000, waitUntil: 'load' }).catch(err => console.log(err));
            //console.log("@Resultant Page");
            const SUBSCRIBER_ID = await page.$$eval('#MainContent_dvOut > center > table > tbody > tr:nth-child(2) > td:nth-child(2) > b', info => info.map(item => item.innerHTML));
            const CLAIM = await page.$$eval('#MainContent_dvOut > center > table > tbody > tr:nth-child(2) > td:nth-child(4) > b', info => info.map(item => item.innerHTML));
            const EFT = await page.$$eval('#MainContent_dvOut > center > table > tbody > tr:nth-child(5) > td:nth-child(4) > b', info => info.map(item => item.innerHTML));
            const DATE = await page.$$eval('#MainContent_dvOut > center > table > tbody > tr:nth-child(5) > td:nth-child(2) > b', info => info.map(item => item.innerHTML));
            const PAID_AMOUNT = await page.$$eval('#MainContent_dvOut > center:nth-child(1) > table > tbody > tr:nth-child(6) > td:nth-child(4) > b', info => info.map(item => item.innerHTML));
            EFT != '' ? DHS[i] = result[i] = `${SUBSCRIBER_ID}, ${CLAIM}, ${EFT}, ${PAID_AMOUNT}$, ${DATE}` : DHS[i] = result[i] = `NONE`;
            console.log(`DHS: ${i}, ${PAID_AMOUNT}`);
        }
    }
    //#endregion
    page.goto(LOGOUT, { waitUntil: 'networkidle2' });
    await page.goto(URL, {
        waitUntil: 'networkidle2',
    });
    console.log("@Login page");
    await page.click(USERNAME);
    await page.keyboard.type(CREDS.username1);
    await page.click(PASSWORD);
    await page.keyboard.type(CREDS.password1);
    await page.click(LOGIN);
    console.log(CREDS.cst_DOS.length);
    for (var i = 0; i < MEDI.length; i++) {
        await page.goto("https://www.medi-cal.ca.gov/APS/ClaimStatus.aspx", { waitUntil: 'networkidle2' });
        //console.log("@Eligibility Page");
        var temp_DOS = cst_DOS[i];
        if (cst_DOS[i] == "" || cst_ID[i] == "") {
            EC[i] = result[i] = "NOT IN MEDICAL";
        } else if (result[i] != "NONE") {
            EC[i] = "NONE";
            result[i] = result[i];
        } else {
            temp_DOS = cst_DOS[i];
            //#region Claim Status Transaction Process
            await page.click(CST_ID);
            await page.keyboard.type(cst_ID[i]);
            await page.click(CST_DOS);
            await page.type(CST_DOS, temp_DOS);
            await page.click(LOGIN);
            await page.waitForNavigation({ timeout: 4000, waitUntil: 'load' }).catch(err => console.log(err));
            //console.log("@Resultant Page");
            const SUBSCRIBER_ID = await page.$$eval('#MainContent_dvOut > center > table > tbody > tr:nth-child(2) > td:nth-child(2) > b', info => info.map(item => item.innerHTML));
            const CLAIM = await page.$$eval('#MainContent_dvOut > center > table > tbody > tr:nth-child(2) > td:nth-child(4) > b', info => info.map(item => item.innerHTML));
            const EFT = await page.$$eval('#MainContent_dvOut > center > table > tbody > tr:nth-child(5) > td:nth-child(4) > b', info => info.map(item => item.innerHTML));
            const DATE = await page.$$eval('#MainContent_dvOut > center > table > tbody > tr:nth-child(5) > td:nth-child(2) > b', info => info.map(item => item.innerHTML));
            const PAID_AMOUNT = await page.$$eval('#MainContent_dvOut > center:nth-child(1) > table > tbody > tr:nth-child(6) > td:nth-child(4) > b', info => info.map(item => item.innerHTML));
            EFT != '' ? EC[i] = result[i] = `${SUBSCRIBER_ID}, ${CLAIM}, ${EFT}, ${DATE}` : EC[i] = result[i] = `NONE`;
            console.log(`EC: ${i}, ${PAID_AMOUNT}`);
        }
    }
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
    console.log("Final", result);
    fs.writeFile(`Final_${Limit-1000}_${Limit}.txt`,result,function (err) {
        if (err) return console.log(err);
        console.log(`List {${Limit-1000} - ${Limit}} Generated in project directory > Final_${Limit-1000}_${Limit}.txt`);
      });
    //console.log("EC", EC);
    //console.log("DHS", DHS);

}
run();