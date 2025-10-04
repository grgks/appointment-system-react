import { WebDriver, By, until } from 'selenium-webdriver';
import { config } from '../config/config';

export async function login(driver: WebDriver): Promise<void> {

    // Ανοίγει το URL http://localhost:5173/login στο browser
    await driver.get(`${config.baseUrl}/login`);

    // Περιμένει μέχρι 10 δευτερόλεπτα να εμφανιστεί στη σελίδα ένα στοιχείο με name="username"

    // Αν δεν εμφανιστεί σε 10 δευτ, πετάει timeout error
    await driver.wait(until.elementLocated(By.name('username')), config.timeout);

    // Βρίσκει το input field που έχει name="username"
    const usernameInput = await driver.findElement(By.name('username'));

    await driver.sleep(2000);

    // Καθαρίζει το field (σβήνει οτιδήποτε υπάρχει μέσα)
    await usernameInput.clear();

    await driver.sleep(2000);

    // Γράφει μέσα "admin21" (από το config.testUser.username)
    await usernameInput.sendKeys(config.testUser.username);

    await driver.sleep(2000);
    // Βρίσκει το input field που έχει name="password"
    const passwordInput = await driver.findElement(By.name('password'));

    // Καθαρίζει το field
    await passwordInput.clear();

    await driver.sleep(2000);
    // Γράφει μέσα "Admin3Test123!" (από το config.testUser.password)
    await passwordInput.sendKeys(config.testUser.password);

    await driver.sleep(2000);

    // Βρίσκει το κουμπί που έχει type="submit" χρησιμοποιώντας CSS selector
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));

    // Κάνει κλικ στο κουμπί (σαν να το πατάς με το mouse)
    await submitButton.click();

    await driver.sleep(4000);

    // Περιμένει μέχρι 10 δευτερόλεπτα το URL να περιέχει τη λέξη "/dashboard"
    // Αυτό σημαίνει ότι το login πέτυχε και έγινε redirect
    await driver.wait(until.urlContains('/dashboard'), config.timeout);

    // Εκτυπώνει μήνυμα επιτυχίας
    console.log('Login successful!');
}