const puppeteer = require('puppeteer');

puppeteer.launch({ headless: false }).then(async browser => {
    const Emma_bot = {
        useragent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        screenWdith: 1366,
        screenHeight: 768,
    }
    // Set navigation timeout to 60 seconds


    // Create a new page
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(60000);

    // Set user agent and viewport
    await page.setUserAgent(Emma_bot.useragent);
    await page.setViewport({
        width: Emma_bot.screenWdith,
        height: Emma_bot.screenHeight,
    });

    // Navigate to the URL
    await page.goto('http://localhost:3000/index.html');

    async function getattribute() {
        const nav_link = await page.$("a[href='Business.html']")
        // await page.setTimeout(6000)
        await nav_link.click("a[href='Business.html']")

        //Get the div boxes

        // const div_boxes = await page.$$eval(."business_news")
        // const grid = div_boxes.queryselectorAll('box')

        // for(let box of grid){
            
        //     console.log(box);
        // }
        await page.scrollBy(0, 1000)


    }
    getattribute()






    // Click on the submit button



    // Capture screenshot
    await page.screenshot({ path: 'test.png' });

    // Close the browser
    //   await browser.close();
});