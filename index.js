// if you want to recieve live updates via console set to 1 else set to 0
import './server.js'
let console_log = 1;

import puppeteer from 'puppeteer-extra'
// const cluster = require('puppeteer-cluster');
 
const Emma_bot = [
 
  {
    useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    screenWdith: 1366,
    screenHeight: 768,
    username: "Reinaaaa",
    user_n: "Reinaaaa",
    password: "Queensley",
    proxy: "190.104.146.244:999"
  },
  {
    useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    screenWdith: 1366,
    screenHeight: 768,
    username: "Olatomide Victor",
    user_n: "eric11",
    password: "eric11",
    proxy: "190.104.146.244:999"
  }


]
const [a] = Emma_bot;
const { proxy } = a
console.log(proxy);

(async () => {
  const browsers = await Promise.all([
    puppeteer.launch({ headless: false,  args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--single-process',
    ], args: ['--incognito'] }),
    puppeteer.launch({ headless: true,  args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--single-process',
    ], args: ['--incognito']  }),
   
  ]);




  let { username } = Emma_bot;
  const pages = [];

  for (const browser of browsers) {

    const page = await browser.newPage();
    pages.push(page);
    if (console_log == 1) { console.log('Browser Launched'); }
    await page.setDefaultNavigationTimeout(600000);
  }

  const clickCounts = [];


  // Log in to each account
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const user = Emma_bot[i];

    const { user_n } = user;

    await page.setUserAgent(user.useragent);
    // await page.setproxy(user.proxy);
    await page.setViewport({
      width: user.screenWdith,
      height: user.screenHeight,
    });
    await page.goto('https://faucetearner.org');
    // await page.waitForNavigation();

    if (console_log == 1) { console.log(' just opened faucelearner.org'); }



    // Click on the "Login" button
    await page.click('a.btn-one[href="login.php"]');
    if (console_log == 1) { console.log(user_n + ' clicked on  the login button'); }


    // Wait for the username, password  and button fields to load
    await page.waitForSelector('input[name="email"]');
    await page.waitForSelector('input[name="password"]');


    // Fill in the login form
    await page.type('input[name="email"]', user.username, { delay: 60 });
    await page.type('input[name="password"]', user.password, { delay: 60 });
    await page.waitForSelector('button.reqbtn[type="button"]');


    await page.waitForTimeout(4000);

    // Click on the "Login" button
    await page.click('button.reqbtn[type="button"]');

    if (console_log == 1) { console.log(user_n + ' just logged into his account') }



    // Wait for the page to load
    await page.waitForNavigation();


    // Close the first pop-up (if it's not clickable)
    await page.evaluate(() => {
      const popup = document.querySelector('.btn-secondary');
      if (popup) {
        popup.remove();
      }
    });
    if (console_log == 1) { console.log('Initial popup removed'); }


    // Wait for the  second pop-up to appear
    await page.waitForSelector('button.btn-info');

    // Click on the "OK" button in the second  pop-up
    await page.click('button.btn-info');
    console.log("i just clicked on the second pop_up");

    // Inject the clicker into the page
    await page.evaluate(() => {
      let clickCount = 0;
      let intervalTimer;




      function clickButton() {
        const button = document.querySelector("form button");
        const close = document.querySelector(".modal-header .btn-close");

        if (button) {
          button.click();
          // console.log();
          clickCount++;

          setTimeout(function () {
            if (
              document.querySelector(".modal-body .fs-4").innerHTML ==
              "You have already claimed, please wait for the next wave!" || document.querySelector(".modal-body .fs-4").innerHTML == "The current wave of XRP has been distributed, please wait for the next wave."
            ) {
              setTimeout(function () {
                close.click();
                setTimeout(function () {
                  if (clickButton()) {
                    // alert('success');
                  }
                  if (clearInterval(intervalTimer)) {

                  }
                  if (intervalTimer = setInterval(clickButton, 30000)) {

                  }

                }, 2000)
                // clickButton(); // Recalling the clickButton function after 5 seconds
                // c; // Resetting the original interval timer
                // intervalTimer = setInterval(clickButton,60000); // Starting a new interval timer
              }, 2000);
            }
            else {
              setTimeout(function () {
                close.click();
              }, 2000);
            }
          }, 2000);
        }
      }

      clickButton();
      intervalTimer = setInterval(clickButton, 5000);

    });

    if (console_log == 1) { console.log('Injection End'); }




  }


  // Keep the browsers open
  // await browsers[0].close();
  // await browsers[1].close();
})(); 