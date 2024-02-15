const puppeteer = require('puppeteer');

// const proxy = "38.154.227.167:5868"
   
const Emma_bot = {
    useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    screenWidth: 1366,
    screenHeight: 768,
    username: "Munir92",
    name: "Emma",
    password: "Munitbako",
    username: "pqxijzqq",
    password: "r3qojkz1lm1u",
    country: 'Spain',
    proxy: "38.154.227.167:5868"
  };
  
  // const { proxy } = Emma_bot;
  const proxy = 'p.webshare.io:80'

(async () => {
  const browser = await puppeteer.launch({headless: false,
    args: [`--proxy-server=${proxy}`]});
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(600000);


  await page.goto('https://whatismyipaddress.com/');
  

  // Wait for the username and password fields to load
//   await page.waitForSelector('input[name="username"]');
//   await page.waitForSelector('input[name="password"]');

  // Type your username and password into the fields
//   await page.type('input[name="username"]', 'pqxijzqq',  { delay: 60 });
//   await page.type('input[name="password"]', 'r3qojkz1lm1u',  { delay: 60 });

  // Click the login button
//   await page.click('button[type="submit"]');

  // Wait for the page to load
  await page.waitForNavigation();

  // // Check if the login was successful
  // const isLoggedIn = await page.evaluate(() => {
  //   return document.querySelector('.logged-in');
  // });

  // if (isLoggedIn) {
  //   console.log('Login successful!');
  // } else {
  //   console.log('Login failed.');
  // }

  // await browser.close();
})();