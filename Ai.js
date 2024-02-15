const puppeteer = require('puppeteer');
const cluster = require('puppeteer-cluster');

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
      screenHeight:768,
      username: "sheffard111",
      user_n: "sheffard",
      password: "joker",
      proxy: "190.104.146.244:999"
    },
    {
      useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      screenWdith: 1366,
      screenHeight:768,
      username: "Olatomide Victor",
      user_n: "olatomide",
      password: "#n5vyun*_r9N6Sh",
      proxy: "190.104.146.244:999"
    },
    {
      useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      screenWdith: 1366,
      screenHeight:768,
      username: "boyyy",
      user_n: " sam neghbiour",
      password: "FRICTION10",
      proxy: "190.104.146.244:999"
    },
    {
      useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      screenWdith: 1366,
      screenHeight:768,
      username: "vectorviper10@gmail.com",
      user_n: "vic",
      password: "Communication1",
      proxy: "190.104.146.244:999"
    },
    {
      useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      screenWdith: 1366,
      screenHeight:768,
      username: "queenreina28@gmail.com",
      user_n: "Queen",
      password: "Queensley",
      proxy: "190.104.146.244:999"
    },
    {
      useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      screenWdith: 1366,
      screenHeight:768,
      username: "megamac589@gmail.com",
      user_n: "Mac",
      password: "Createpassword@123",
      proxy: "190.104.146.244:999"
    },
    {
      useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      screenWdith: 1366,
      screenHeight:768,
      username: "olimic2004@gmail.com",
      user_n: "Mico",
      password: "mIchael4",
      proxy: "190.104.146.244:999"
    },
    {
      useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      screenWdith: 1366,
      screenHeight:768,
      username: "treasure@gmail.com",
      user_n: "Treasure",
      password: "joker",
      proxy: "190.104.146.244:999"
    },
    {
      useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      screenWdith: 1366,
      screenHeight:768,
      username: "emmanueltokyo24@gmail.com",
      user_n: 'Rich dot com',
      password: "tJqkDY_9!WhjU%Q",
      proxy: "190.104.146.244:999"
    }
  ]

(async () => {
  const clusterOptions = {
    concurrency: cluster.CONCURRENCY_BROWSER,
    maxConcurrency: 2, // Number of browsers to launch
    puppeteerOptions: {
      headless: true,
    },
  };
  let url = 'https://faucetearner.org';

  const clusterInstance = await cluster.launch(clusterOptions);
  const pages = [];


  await clusterInstance.task(async ({ page, data }) => {
    const user = data;
    const { username, password } = user;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(url);

    // Click on the "Login" button
    await page.click('a.btn-one[href="login.php"]');

    // Wait for the username, password, and button fields to load
    await page.waitForSelector('input[name="email"]');
    await page.waitForSelector('input[name="password"]');
    await page.waitForSelector('button.reqbtn[type="button"]');

    // Fill in the login form
    await page.type('input[name="email"]', username, { delay: 60 });
    await page.type('input[name="password"]', password, { delay: 60 });

    await page.waitForTimeout(4000);

    // Click on the "Login" button
    await page.click('button.reqbtn[type="button"]');



    // Wait for the page to load
    await page.waitForNavigation();

    // Close the first pop-up (if it's not clickable)
    await page.evaluate(() => {
      const popup = document.querySelector('.btn-secondary');
      if (popup) {
        popup.remove();
      }
    });

    // Wait for the second pop-up to appear
    await page.waitForSelector('button.btn-info');

    // Click on the "OK" button in the second pop-up
    await page.click('button.btn-info');

    // Inject the clicker into the page
    await page.evaluate(() => {
      let clickCount = 0;

      function clickButton() {
        const button = document.querySelector("form button");

        if (button) {
          button.click();
          clickCount++;
        //   console.log(`Clicked button ${clickCount} times.`);
        }
      }

      setInterval(clickButton, 30000);
    });

    // await page.waitForTimeout(300000); // Wait for 5 minutes

    await browser.close();
  });

  for (const user of Emma_bot) {
    await clusterInstance.queue(user);
  }

  await clusterInstance.idle();
  await clusterInstance.close();
})();