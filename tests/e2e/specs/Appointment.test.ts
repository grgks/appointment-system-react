import {By, until, WebDriver} from "selenium-webdriver";
import {createDriver, quitDriver} from "../helpers/browser";
import {login} from "../helpers/authSelenium";
import {config} from "../config/config";
import {Select} from "selenium-webdriver/lib/select";

describe('Appointment Tests', () => {
    let driver: WebDriver;

    // Runs before each test
    beforeEach(async () => {
        driver = await createDriver();
    });


    // Runs after each test
    afterEach(async () => {
        await quitDriver(driver);
    });

    test('User can create a new appointment', async () => {
        // Perform login
        await login(driver);

        // Μετά το login, πήγαινε στο /appointments
        await driver.get(`${config.baseUrl}/appointments`);
        await driver.sleep(1000);

        //click "Προγραμμάτισε ραντεβού"
        const createAppointmentButton =await driver.wait(
            until.elementLocated(By.xpath("//button[contains(text(),'Προγραμμάτισε ραντεβού')]")),
            config.timeout
        );
        await createAppointmentButton.click();
        await driver.sleep(1000);

        const clientSelectElement = await driver.wait(
            until.elementLocated(By.css("select.w-full")),
            config.timeout
        );
        await clientSelectElement.click();

        //click from dropdown
        const clientSelect = new Select(clientSelectElement);
        await clientSelect.selectByValue('4');
        //await clientSelectElement.click();

        await driver.sleep(1000);

        //pick date
        const dateInput = await driver.findElement(By.xpath("//input[@type='date']"));
        await dateInput.sendKeys('12-12-2025');
        await driver.sleep(1000);

        //pick time
        const timeInput = await driver.findElement(By.xpath("//input[@type='time']"));
        await timeInput.sendKeys('14:30'); // HH:MM format
        await driver.sleep(1000);

        //pick from dropdown Status
        const statusSelectElement = await driver.findElement(By.xpath("//label[contains(text(), 'Status')]/following-sibling::select"));
        const statusSelect = new Select(statusSelectElement);
        await statusSelect.selectByVisibleText('CONFIRMED');
        await driver.sleep(1000);

        // //check Στείλε ειδοποίηση
        // const checkbox = await driver.findElement(By.css('input[type="checkbox"]'));
        // await checkbox.click();
        // await driver.sleep(1000);


        //pick reminder date
        const dateReminderInput = await driver.findElement(By.xpath("//label[contains(text(), 'Ειδοποιήση ημερομηνίας')]/following-sibling::input"));
        await dateReminderInput.sendKeys('11-12-2025');
        await driver.sleep(1000);

        //pick reminder time
        const timeReminderInput = await driver.findElement(By.xpath("//label[contains(text(), 'Ειδοποιήση ώρας')]/following-sibling::input"));
        await timeReminderInput.sendKeys('14:30'); // HH:MM format
        await driver.sleep(1000);

        //write text to Σημειώσεις
        await driver.wait(until.elementLocated(By.xpath("//textarea[@placeholder='Επιπλέον σημειώσεις για το ραντεβού...']")),
            config.timeout
        ).sendKeys('Selenium Test completed successfully');

        await driver.sleep(1000);

        // Submit button
        await driver.wait(
            until.elementLocated(By.xpath("//form//button[contains(text(),'Προγραμμάτισε ραντεβού')]")),
            config.timeout
        ).click();


        await driver.sleep(1000);

        // Wait for redirect
        //aplo test me /view
        // await driver.wait(until.urlContains('/view'), config.timeout);

        //urlMatches gia na perilavei kai arithmo (id) gia pio sigouria
        await driver.wait(until.urlMatches(/\/appointments\/\d+\/view/), config.timeout);
        const currentUrl = await driver.getCurrentUrl();
        console.log('Redirected to:', currentUrl);

        // expect(currentUrl).toMatch(/\/appointments\/\d+\/view/); // regex gia validation to path
        await driver.sleep(1000);
    });


});
