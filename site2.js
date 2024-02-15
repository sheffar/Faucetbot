
const { Cluster } = require('puppeteer-cluster');


(async () => {
  const clusters = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_BROWSER,
    maxConcurrency: 2,
    puppeteerOptions: {
        headless: false,
        defaultViewport: false
      },
    
  });
  let url = ['http://localhost:3000/index.html']

  await clusters.task(async ({ page, data: url }) => {
    let pages = []
    for (const cluster of clusters){
      const page = await cluster.newpage()
      pages.push(page)
    }
    await page.goto(url);
    await page.waitForNavigation();

    console.log("i readched this point");
    const screen = await page.screenshot();
    // Store screenshot, do something else
    await page.waitForTimeout(9000);
      await page.screenshot({ path: 'testrnewtestesult.png', fullPage: true });
  });

  // cluster.queue('http://localhost:3000/index.html');
  // cluster.queue('http://localhost:3000/index.html');

  // many more pages

  // await cluster.idle();
  // await cluster.close();
})();