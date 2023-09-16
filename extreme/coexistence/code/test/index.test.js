const fs = require('fs');
const { By, until } = require('selenium-webdriver')
const { scan, shellFiles, dependencyCount } = require('@sliit-foss/bashaway');

const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require('chromedriver')

test('should validate if only bash files are present', () => {
    const shellFileCount = shellFiles().length;
    expect(shellFileCount).toBe(1);
    expect(shellFileCount).toBe(scan('**', ['src/**']).length);
});

describe('should check if the websites were merged successfully', () => {
    const rootURL = 'http://localhost:8088'
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments("--no-sandbox")
    chromeOptions.addArguments("--disable-dev-shm-usage")
    chromeOptions.addArguments("--headless")
    const d = new webdriver.Builder().forBrowser(webdriver.Browser.CHROME).setChromeOptions(chromeOptions).build()
    const waitUntilTime = 5000
    let driver

    beforeAll(async () => {
        await d.then(async _d => {
            driver = _d
            await driver.manage().window().setPosition(0, 0)
            await driver.manage().window().setSize(1280, 1024)
            await driver.get(rootURL)
        })
    })

    async function getElementById(id) {
        const el = await driver.wait(until.elementLocated(By.id(id)), waitUntilTime)
        return await driver.wait(until.elementIsVisible(el), waitUntilTime)
    }

    afterAll((done) => done())

    test('non existant routes should display 404 page of the cornerstone', async () => {
        await driver.navigate().to(rootURL);
        expect(driver.getTitle()).resolves.toBe('Home | Cornerstone');
        await driver.navigate().to(rootURL + '/abc');
        expect(driver.getTitle()).resolves.toBe('404 | Cornerstone');
        (await getElementById('home-btn')).click();
        expect(driver.getTitle()).resolves.toBe('Home | Cornerstone');
    });

    test('should navigate to and back from the dashboard successfully', async () => {
        await driver.navigate().to(rootURL);
        (await getElementById('dashboard-btn')).click();
        expect(driver.getTitle()).resolves.toBe('Dashboard');
        (await getElementById('home-btn')).click();
        expect(driver.getTitle()).resolves.toBe('Home | Cornerstone');
    });

    test('should navigate to and back from the support page successfully', async () => {
        await driver.navigate().to(rootURL);
        (await getElementById('support-btn')).click();
        expect(driver.getTitle()).resolves.toBe('Support');
        (await getElementById('home-btn')).click();
        expect(driver.getTitle()).resolves.toBe('Home | Cornerstone');
    });
});

describe('should check installed dependencies', () => {
    let script
    beforeAll(() => {
        script = fs.readFileSync('./execute.sh', 'utf-8')
    });
    test("no additional npm dependencies should be installed", async () => {
        await expect(dependencyCount()).resolves.toStrictEqual(6)
    });
});