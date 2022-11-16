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
  });

  afterAll(() => {
    browser.close();
  });

  it('should be titled "Google"', async () => {
    await page.goto(APP);
    await expect(page.title()).resolves.toMatch('Google');
  });
});