const puppeteer = require('puppeteer');
const APP = `http://localhost:${process.env.PORT || 3000}/`;

describe('Google', () => {
  let page : any;
  let browser : any;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    page = await browser.newPage()
    await page.goto('https://google.com');
  });

  afterAll(() => {
    browser.close();
  });

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch('Google');
  });
});