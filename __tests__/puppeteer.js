const puppeteer = require('puppeteer');
const APP = `http://localhost:${process.env.PORT || 3000}/`;

describe('Google', () => {
  let page;
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage()
    await page.goto(APP);
  });

  afterAll(() => {
    browser.close();
  });

  it('should be titled "Aliwawa"', async () => {

    //await page.waitForSelector('.N3ewq',{timeout:3000}).catch(() => console.log('Class N3ewq doesn\'t exist!'));

    await page.evaluate(() => {
      if (document.querySelectorAll('p').length > 0) {
        Array.from(document.querySelectorAll('p')).filter(element => console.log('element:', element));
      }
    });

  });
});