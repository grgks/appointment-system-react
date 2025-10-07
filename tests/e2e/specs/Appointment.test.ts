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

        test('User can search and delete an appointment', async () => {
            await login(driver);
            await driver.get(`${config.baseUrl}/appointments`);

            await driver.sleep(2000);


            // Click στο ellipsis menu (τρεις τελείες)
            const menuButton = await driver.wait(
                until.elementLocated(By.xpath("//button[.//*[name()='svg' and contains(@class, 'lucide lucide-ellipsis-vertical w-5 h-5 text-gray-500')]]")),
                config.timeout
            );
            await menuButton.click();

            console.log('Opened menu');
            await driver.sleep(1000);

            // Click "Διαγραφή" από το dropdown menu
            const editOption = await driver.wait(
                until.elementLocated(By.xpath("//button[.//*[name()='svg' and contains(@class, 'lucide lucide-trash2 lucide-trash-2 w-4 h-4')]]")),
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

            expect(successText).toContain('Ραντεβού διαγράφηκε επιτυχώς');
            await alert.accept();
        });
});
