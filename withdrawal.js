let console_log = 1;

const { promises } = require('fs');
const puppeteer = require('puppeteer-extra');

const Emma_bot = [
    {
        useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        screenWdith: 1366,
        screenHeight: 768,
        username: "Munir92",
        user_n: "munir",
        password: "Munitbako",
        proxy: "117.2.28.235:55443"
    },
    {
        useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        screenWdith: 1366,
        screenHeight: 768,
        username: "sheffard111",
        user_n: "sheffard",
        password: "joker",
        proxy: "190.104.146.244:999"
    },
    {
        useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        screenWdith: 1366,
        screenHeight: 768,
        username: "Olatomide Victor",
        user_n: "olatomide",
        password: "#n5vyun*_r9N6Sh",
        proxy: "190.104.146.244:999"
    },
    {
        useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        screenWdith: 1366,
        screenHeight: 768,
        username: "boyyy",
        user_n: " sam neghbiour",
        password: "FRICTION10",
        proxy: "190.104.146.244:999"
    },
    {
        useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        screenWdith: 1366,
        screenHeight: 768,
        username: "vectorviper10@gmail.com",
        user_n: "vic",
        password: "Communication1",
        proxy: "190.104.146.244:999"
    }

]
const [a] = Emma_bot;

(async () => {
    const browsers = await Promise.all([
        puppeteer.launch({ headless: false }),
        puppeteer.launch({ headless: true }),
        // puppeteer.launch({ headless: true }),
        // puppeteer.launch({ headless: true }),
        // puppeteer.launch({ headless: true }),
    ])

    const total = Emma_bot.length;
    console.log("Boss Rich you have" + total + " Bots running");
    const pages = []

    for (const browser of browsers) {
        const page = await browser.newPage();
        pages.push(page)
        if (console_log == 1) { console.log('Browser Launched'); }
        await page.setDefaultNavigationTimeout(600000);
    }

    // log into each account 

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
        if (console_log == 1) { console.log(user_n + ' just opened faucelearner.org'); }

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




        // WAIT  FOR THE WIDTHDRAL BUTTON
        await page.waitForSelector('a [href="/withdraw.php]')

        // CLICK ON THE WITHDRAWAL BUTTON

        await page.click('[href="/withdraw.php]')

        if (console_log == 1) { console.log(user_n + " Just clicked on the widthdral button"); }

        // wait fot 4 seconds
        await page.waitForTimeout(4000);

        // clcik on  widthdraw

        await page.waitForSelector('buttton.reqbtn[type="button"]')

        if (console_log == 1) { console.log(user_n + " just widthdrew"); }
        


    }
})();