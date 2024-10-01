let console_log = 1;

import puppeteer from 'puppeteer-extra'



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
        puppeteer.launch({
            headless: false,
            args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                '--single-process',
            ],
            args: ['--incognito'],
        }),
        puppeteer.launch({
            headless: true,
            args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                '--single-process',
            ],
            args: ['--incognito'],
        }),
    ]);

    let { username } = Emma_bot;
    const pages = [];

    for (const browser of browsers) {
        const page = await browser.newPage();
        pages.push(page);
        if (console_log == 1) {
            console.log('Browser Launched');
        }
        await page.setDefaultNavigationTimeout(600000);
    }

    // Log in to each account
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const user = Emma_bot[i];

        const { user_n } = user;

        await page.setUserAgent(user.useragent);
        await page.setViewport({
            width: user.screenWdith,
            height: user.screenHeight,
        });
        await page.goto('https://faucetearner.org');

        if (console_log == 1) {
            console.log(' just opened faucelearner.org');
        }

        // Click on the "Login" button
        await page.click('a.btn-one[href="login.php"]');
        if (console_log == 1) {
            console.log(user_n + ' clicked on  the login button');
        }

        // Wait for the username, password, and button fields to load
        await page.waitForSelector('input[name="email"]');
        await page.waitForSelector('input[name="password"]');

        // Fill in the login form
        await page.type('input[name="email"]', user.username, { delay: 70 });
        await page.type('input[name="password"]', user.password, { delay: 70 });
        await page.waitForSelector('button.reqbtn[type="button"]');

        await page.waitForTimeout(4000);

        // Click on the "Login" button
        await page.click('button.reqbtn[type="button"]');

        if (console_log == 1) {
            console.log(user_n + ' just logged into his account');
        }

        // Wait for the page to load
        await page.waitForNavigation();

        // Close the first pop-up (if it's not clickable)
        await page.evaluate(() => {
            const popup = document.querySelector('.btn-secondary');
            if (popup) {
                popup.remove();
            }
        });
        if (console_log == 1) {
            console.log('Initial popup removed');
        }

        // Wait for the second pop-up to appear
        await page.waitForSelector('button.btn-info');

        // Click on the "OK" button in the second pop-up
        await page.click('button.btn-info');
        console.log('i just clicked on the second pop-up');

        // Inject the clicker into the page
        await page.evaluate(() => {
            let clickCount = 0;
            let intervalTimer;

            async function clickButtonWithCountdownCheck() {
                while (true) { // This will create a continuous loop
                    const button = document.querySelector('form button');
                    const close = document.querySelector('.modal-header .btn-close');
                    const countdown = document.getElementById('second'); // Get the countdown element

                    if (button && countdown) {
                        const countdownValue = parseInt(countdown.innerText);

                        if (countdownValue <= 20) {
                            button.click(); // Click button if countdown is less than or equal to 20
                            clickCount++;

                            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds

                            const message = document.querySelector('.modal-body .fs-4');
                            if (
                                message.innerHTML ===
                                'You have already claimed, please wait for the next wave!' ||
                                message.innerHTML ===
                                'The current wave of XRP has been distributed, please wait for the next wave.'
                            ) {
                                close.click();
                                // Comment out the break to prevent the loop from ending
                                // break; // Exit the loop if the claim is not available
                            } else {
                                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for another 2 seconds before closing the pop-up
                                close.click();
                            }
                        }
                    }

                    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 1 second before checking again
                }
            }


            clickButtonWithCountdownCheck();
        });


        if (console_log == 1) {
            console.log('Injection End');
        }
    }
})();
