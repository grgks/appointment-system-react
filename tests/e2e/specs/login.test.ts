import { WebDriver } from 'selenium-webdriver';
import { createDriver, quitDriver } from '../helpers/browser';
import { login } from '../helpers/authSelenium';
//import { config } from '../config/config';

describe('Login Flow', () => {
    let driver: WebDriver;

    // Runs before each test
    beforeEach(async () => {
        driver = await createDriver();
    });

    // Runs after each test
    afterEach(async () => {
        await quitDriver(driver);
    });

    test('User can login with valid credentials', async () => {
        // Perform login
        await login(driver);

        // Verify we're on the dashboard
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('/dashboard');

        console.log(' Login test passed!');
    });
});