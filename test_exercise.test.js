const puppeteer = require('puppeteer');
const path = require('path');

let page;
let browser;
const width = 800;
const height = 600;
const timeout = 15000;

beforeAll(async () => {
    const filePath = path.join(__dirname, 'exercise.html');
    
    browser = await puppeteer.launch({
      headless: true,
      args: [
         '--no-sandbox',
         '--disable-setuid-sandbox',
         '--disable-dev-shm-usage',
         '--font-render-hinting=none'
      ]
    });
    
    page = await browser.newPage();
    await page.goto(`file://${filePath}`);
    await page.setViewport({ width, height });
});

afterAll(() => {
    if (browser) browser.close();
});

describe("Todo App Tests", () => {

    test("Your Website Should Be Able to Add a Task", async () => {
        await page.type('#task', 'Test Task');
        await page.click('#submit');

        const taskContent = await page.$eval('#tasks li', el => el.textContent);
        expect(taskContent).toBe('Test Task');
    }, timeout);

    test("Your Website Should Have an Submit Button Disabled When There is an Empty Input", async () => {
        const buttonDisabled = await page.$eval('#submit', btn => btn.disabled);
        expect(buttonDisabled).toBe(true);
    }, timeout);

});
