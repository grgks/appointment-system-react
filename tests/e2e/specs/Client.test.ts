import {By, until, WebDriver} from "selenium-webdriver";
import { Select } from 'selenium-webdriver/lib/select';
import { createDriver, quitDriver } from '../helpers/browser';
import { login } from '../helpers/authSelenium';
import {config} from "../config/config";

describe('Client Tests', () => {
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

        await driver.sleep(1000);

        //driver wait = perimenei to element kasi epistrefei webElement
        const createButton =await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(),'Εισαγωγή Πελάτη')]")),
            config.timeout
        );
        await driver.wait(until.elementIsVisible(createButton), config.timeout);
        // await driver.wait(until.elementIsEnabled(createButton), config.timeout);

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

        await driver.wait(until.elementLocated(By.xpath("//textarea[@placeholder='Επιπλέον σημειώσεις για τον πελάτη...']")),
            config.timeout
        ).sendKeys('Selenium Test completed successfully');

        await driver.sleep(1000);



        // Submit button
        await driver.wait(
            until.elementLocated(By.xpath("//form//button[contains(text(),'Δημιουργία Πελάτη')]")),
            config.timeout
        ).click();

        await driver.sleep(1000);

        // Χειρισμός του alert
        try {
            // το alert να εμφανιστεί
            await driver.wait(until.alertIsPresent(), config.timeout);

            // alert
            const alert = await driver.switchTo().alert();

            // Διάβασε το μήνυμα
            const alertText = await alert.getText();
            console.log('Alert message:', alertText);

            expect(alertText).toContain('δημιουργήθηκε επιτυχώς');
            //  accept
            await alert.accept();

            console.log('Client created successfully - Alert verified!');
        } catch (error) {
            console.log(' No success alert found - Client creation failed', error);
            throw error;
        }

        await driver.sleep(1000);


        // Wait for redirect
        await driver.wait(until.urlContains('/dashboard'), config.timeout);

        await driver.sleep(1000);
    });


    test('User can search and edit a client', async () => {
        await login(driver);
        await driver.get(`${config.baseUrl}/clients`);

        await driver.sleep(2000);

        // Search for client
        const searchInput = await driver.wait(
            until.elementLocated(By.xpath("//input[contains(@placeholder, 'Αναζήτηση')]")),
            config.timeout
        );
        await searchInput.sendKeys('test34');
        await driver.sleep(1500);

        // Click στο ellipsis menu (τρεις τελείες)
        const menuButton = await driver.wait(
            until.elementLocated(By.xpath("//button[.//*[name()='svg' and contains(@class, 'lucide-ellipsis-vertical')]]")),
            config.timeout
        );
        await menuButton.click();

        console.log('Opened menu');
        await driver.sleep(1000);

        // Click "Επεξεργασία" από το dropdown menu
        const editOption = await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(), 'Ενημέρωση Πελάτη')]")),
            config.timeout
        );
        await editOption.click();

        console.log('Clicked edit option');
        await driver.sleep(2000);

        // Verify φόρμα επεξεργασίας άνοιξε
        await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(),'Ενημέρωση Πελάτη')] | //button[contains(text(),'Αποθήκευση')]")),
            config.timeout
        );

        // Edit notes
        const notesField = await driver.findElement(By.xpath("//textarea[@placeholder='Επιπλέον σημειώσεις για τον πελάτη...']"));
        await notesField.clear();
        await notesField.sendKeys('Selenium Test - Edit successful');
        await driver.sleep(500);

        // Save
        await driver.findElement(By.xpath("//button[contains(text(),'Ενημέρωση') or contains(text(),'Αποθήκευση')]")).click();
        await driver.sleep(2000);

        console.log('Client edited successfully!');
    });


    //test delete
    test('User can search and delete a client', async () => {
        await login(driver);
        await driver.get(`${config.baseUrl}/clients`);

        await driver.sleep(2000);

        // Search for client
        const searchInput = await driver.wait(
            until.elementLocated(By.xpath("//input[contains(@placeholder, 'Αναζήτηση')]")),
            config.timeout
        );
        await searchInput.sendKeys('test34');
        await driver.sleep(1000);

        // Click το button "Αναζήτηση"
        const searchButton = await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(), 'Αναζήτηση')]")),
            config.timeout
        );
        await searchButton.click();

        const screenshot = await driver.takeScreenshot();
        require('fs').writeFileSync('search-debug.png', screenshot, 'base64');


        // Click στο ellipsis menu (τρεις τελείες)
        const menuButton = await driver.wait(
            until.elementLocated(By.xpath("//button[.//*[name()='svg' and contains(@class, 'lucide-ellipsis-vertical')]]")),
            config.timeout
        );
        await menuButton.click();

        console.log('Opened menu');
        await driver.sleep(1000);

        // Click "Διαγραφή" από το dropdown menu
        const editOption = await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(), 'Διαγραφή Πελάτη')]")),
            config.timeout
        );
        await editOption.click();

        await driver.sleep(1000);
        console.log('Clicked delete option');
        await driver.sleep(1000);

        // Handle confirmation alert (1ο alert)
        await driver.wait(until.alertIsPresent(), config.timeout);
        let alert = await driver.switchTo().alert();
        const confirmText = await alert.getText();
        console.log('Confirmation alert:', confirmText);

        // Verify confirmation message
        expect(confirmText).toContain('Είσαι σίγουρος');
        await driver.sleep(1000);
        // Click OK to confirm delete
        await alert.accept();
        await driver.sleep(1000);

        // Handle success alert (2ο alert)
        await driver.wait(until.alertIsPresent(), config.timeout);
        alert = await driver.switchTo().alert();
        const successText = await alert.getText();

        expect(successText).toContain('επιτυχής διαγραφή');
        await alert.accept();

    });
});