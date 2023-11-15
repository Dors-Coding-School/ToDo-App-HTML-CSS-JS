const puppeteer = require('puppeteer');
const path = require('path');

let page;
let browser;
const width = 800;
const height = 600;
const timeout = 500000;

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
        // Add a task first
        await page.type('#task', 'Test Task');
        await page.click('#submit');

        // Wait for the task list to update
        await page.waitForSelector('#tasks li');

        // Check if the task is added
        const taskContent = await page.$eval('#tasks li', el => el.innerHTML);
        expect(taskContent).toBe('Test Task<button>Delete</button>');
    }, timeout);

    test("Your Website Should Have an Submit Button Disabled When There is an Empty Input", async () => {
        const buttonDisabled = await page.$eval('#submit', btn => btn.disabled);
        expect(buttonDisabled).toBe(true);
    }, timeout);

    test("Your Website Should Be Able to Remove a Task", async () => {
        // Add a task first
        await page.type('#task', 'Task to Delete');
        await page.click('#submit');
    
        // Wait for the task list to update
        await page.waitForSelector('#tasks li');
    
        // Click the delete button for the newly added task
        await page.click('#tasks li button');
    
        // Check if the task is removed
        const tasks = await page.$$eval('#tasks li', tasks => tasks.map(task => task.innerHTML));
        expect(tasks).not.toContain('Task to Delete');
    }, timeout);

});
