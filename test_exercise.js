const puppeteer = require('puppeteer');

let page;
let browser;
const width = 800;
const height = 600;
const timeout = 15000;

beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('file:///exercise.html');
    await page.setViewport({ width, height });
});

afterAll(() => {
    browser.close();
});

describe("Todo App Tests", () => {

    test("Should add a task", async () => {
        await page.type('#task', 'Test Task');
        await page.click('#submit');

        const taskContent = await page.$eval('#tasks li', el => el.textContent);
        expect(taskContent).toBe('Test Task');
    }, timeout);

    test("Submit button should be disabled with empty input", async () => {
        const buttonDisabled = await page.$eval('#submit', btn => btn.disabled);
        expect(buttonDisabled).toBe(true);
    }, timeout);

});

