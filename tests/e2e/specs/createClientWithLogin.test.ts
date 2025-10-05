import {By, until, WebDriver} from "selenium-webdriver";
import { Select } from 'selenium-webdriver/lib/select';
import { createDriver, quitDriver } from '../helpers/browser';
import { login } from '../helpers/authSelenium';
import {config} from "../config/config";

describe('Create Client Flow', () => {
    let driver: WebDriver;

    // Runs before each test
    beforeEach(async () => {
        driver = await createDriver();
    });


    // Runs after each test
    afterEach(async () => {
        await quitDriver(driver);
    });

    test('User can create a new client', async () => {
        // Perform login
        await login(driver);


        // Μετά το login, πήγαινε στο /clients
        await driver.get(`${config.baseUrl}/clients`);

        console.log(' Login test passed!');


        //driver wait = perimenei to element kasi epistrefei webElement
        const createButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(text(),'Εισαγωγή Πελάτη')]")),
            config.timeout
        );
        await createButton.click();

        await driver.sleep(1000);

       await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Επέλεξε όνομα χρήστη']")),
        config.timeout
        ).sendKeys('test34');

        await driver.sleep(1000);

        await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='email@aueb.com']")),
            config.timeout
        ).sendKeys('test34@aueb.gr');

        await driver.sleep(1000);

        await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Τουλάχιστον 8 χαρακτήρες']")),
            config.timeout
        ).sendKeys('Password123!');

        await driver.sleep(1000);

        await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Εισάγεται κωδικό']")),
            config.timeout
        ).sendKeys('Password123!');

        await driver.sleep(1000);

        await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Εισάγεται όνομα']")),
            config.timeout
        ).sendKeys('test34');

        await driver.sleep(1000);

        await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Εισάγεται επώνυμο']")),
            config.timeout
        ).sendKeys('test34');

        await driver.sleep(1000);

        await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='2101234567']")),
            config.timeout
        ).sendKeys('6778877665');

        await driver.sleep(1000);

        await driver.wait(
            until.elementLocated(By.xpath("//input[@type='date']")),
            config.timeout
        ).sendKeys('01-15-1999');

        await driver.sleep(1000);

        await driver.wait(
            until.elementLocated(By.xpath("//select")),
            config.timeout
        ).sendKeys('MALE');


        await driver.sleep(1000);


        const citySelectElement =
        await driver.wait(
            until.elementLocated(By.xpath("//label[contains(text(), 'Πόλη')]/parent::div//select")),
            config.timeout
        );
        const citySelect = new Select(citySelectElement);
        await citySelect.selectByValue('8');


        await driver.sleep(1000);

        await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Αριθμός, Περιοχή']")),
            config.timeout
        ).sendKeys('56 street');

        await driver.sleep(1000);

        await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='1234567890']")),
            config.timeout
        ).sendKeys('8909876556');

        await driver.sleep(1000);

        await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Επιπλέον σημειώσεις για τον πελάτη...']")),
            config.timeout
        ).sendKeys('Selenium Test completed successfully');

         await driver.wait(until.elementLocated(By.xpath("//form//button[contains(text(),'Δημιουργία Πελάτη')]")),
            config.timeout
        ).click();

        await driver.sleep(1000);

        await driver.wait(until.urlContains('/clients'), config.timeout);

        await driver.sleep(1000);

        const clientElement = await driver.wait(
            until.elementLocated(By.xpath("//td[contains(text(), 'test34')]")),
            config.timeout
        );
        expect(clientElement).toBeTruthy();

        await driver.sleep(1000);


    });



});