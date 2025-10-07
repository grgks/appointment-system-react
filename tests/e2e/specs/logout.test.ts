import {By, until, WebDriver} from "selenium-webdriver";
import {createDriver, quitDriver} from "../helpers/browser";
import {login} from "../helpers/authSelenium";
import {config} from "../config/config";

describe('Logout Test', () => {
    let driver: WebDriver;

    // Runs before each test
    beforeEach(async () => {
        driver = await createDriver();
    });


    // Runs after each test
    afterEach(async () => {
        await quitDriver(driver);
    });

    test('User can logout from the app', async () => {
        // Perform login
        await login(driver);

        await driver.sleep(1000);


        //finds dropdown menu
        const menuButton = await driver.wait(
            until.elementLocated(By.xpath("//button[.//*[name()='svg' and contains(@class, 'lucide lucide-chevron-down w-4 h-4')]]")),
            config.timeout
        );
        await menuButton.click();

        await driver.sleep(1000);


        //finds exit button
        const exitButton = await driver.wait(
            until.elementLocated(By.xpath("//button[.//*[name()='svg' and contains(@class, 'lucide lucide-log-out w-4 h-4')]]")),
            config.timeout
        );
        await exitButton.click();

        await driver.sleep(500);

        //waits until URL contains "/login"
        await driver.wait(until.urlContains('/login'), config.timeout);

        // Verify we're on the login page
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('/login');

        console.log(' Logout successful');
        console.log(' Logout test passed!');
      });
    });