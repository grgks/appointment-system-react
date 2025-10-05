import {By, WebDriver} from "selenium-webdriver";
import {createDriver, quitDriver} from "../helpers/browser";
import {config} from "../config/config";

describe('Login Failure Flow', () => {
    let driver: WebDriver;

    // Runs before each test
    beforeEach(async () => {
        driver = await createDriver();
    });

    // Runs after each test
    afterEach(async () => {
        await quitDriver(driver);
    });

    test('User cannot login with invalid credentials', async () => {
        await driver.get(`${config.baseUrl}/login`);

        await driver.sleep(1000);

        const usernameInput = await driver.findElement(By.name('username'));
        await usernameInput.clear();
        await usernameInput.sendKeys("WrongUsername");

        await driver.sleep(1000);

        const passwordInput = await driver.findElement(By.name('password'));
        await passwordInput.clear();
        await driver.sleep(1000);
        await passwordInput.sendKeys("WrongPassword2!");

        const submitButton = await driver.findElement(By.css('button[type="submit"]'));
        await submitButton.click();

        await driver.sleep(2000);

        const currentUrl = await driver.getCurrentUrl();
        console.log('Current URL:', currentUrl);
        expect(currentUrl).toContain('/login');


        expect(currentUrl).toContain('/login');

        console.log('Login failure test completed successfully');

    });
});