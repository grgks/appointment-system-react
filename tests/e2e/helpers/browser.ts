import { Builder, WebDriver } from 'selenium-webdriver';
import { Options as ChromeOptions } from 'selenium-webdriver/chrome';
import { config } from '../config/config';

export async function createDriver(): Promise<WebDriver> {
    const options = new ChromeOptions();

    if (config.headless) {
        options.addArguments('--headless');
        options.addArguments('--disable-gpu');
    }

    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--start-maximized');

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    await driver.manage().setTimeouts({ implicit: config.timeout });

    return driver;
}

export async function quitDriver(driver: WebDriver): Promise<void> {
    if (driver) {
        await driver.quit();
    }
}