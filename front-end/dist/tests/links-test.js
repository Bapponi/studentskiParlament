const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const fs = require('fs');
const path = require('path');

(async function linkTests() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Log in as an admin
    await driver.get('http://localhost:3000/login'); // Update this to your login page URL

    // Fill in the login form
    const emailInput = await driver.findElement(By.css('input[placeholder="Унеси мејл овде"]'));
    const passwordInput = await driver.findElement(By.css('input[placeholder="Унеси шифру овде"]'));
    const loginButton = await driver.findElement(By.css('div.login-button')); // Use the login button's selector

    // Input admin credentials
    await emailInput.sendKeys('aleksandarbubalo99@gmail.com'); // Replace with the actual admin email
    await passwordInput.sendKeys('sifra123'); // Replace with the actual admin password
    await loginButton.click();

    // Wait for the redirection to the home page
    await driver.wait(until.urlIs('http://localhost:3000/'), 15000); // Adjust URL and timeout as needed

    // Verify redirection to links page
    await driver.get('http://localhost:3000/links'); // Update this to your links page URL

    // Wait for the page to load and the elements to be visible
    await driver.wait(until.elementLocated(By.css('.create-link')), 10000);

    // Define the path to the test image
    const filePath = path.resolve(__dirname, '../tests/test-image.jpg');
    console.log('Uploading file from path:', filePath);
    
    // Check if the file exists
    if (fs.existsSync(filePath)) {
      const fileInput = await driver.findElement(By.css('input[type="file"]'));
      const nameInput = await driver.findElement(By.css('input[placeholder="Унеси назив фајла"]'));
      const websiteInput = await driver.findElement(By.css('input[placeholder="Унеси линк овде типа https://..."]'));
      const addButton = await driver.wait(until.elementLocated(By.css('div.button-container')), 10000);

      await fileInput.sendKeys(filePath);

      // Enter name and website
      await nameInput.sendKeys('Test Link');
      await websiteInput.sendKeys('https://example.com');

      // Ensure the add button is visible and clickable
      await driver.wait(until.elementIsVisible(addButton), 10000);
      await addButton.click();

      // Wait for link creation to be processed
      const linkList = await driver.findElement(By.css('.links'));
      const linkText = await linkList.getText();
      if (!linkText.includes('Test Link')) {
        throw new Error('Link was not created successfully');
      }

      // Find all delete buttons and target the last one
      const deleteButtons = await driver.findElements(By.css('img.link-delete')); // Update this selector as needed
      if (deleteButtons.length === 0) {
        throw new Error('No delete buttons found.');
      }

      const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
      await lastDeleteButton.click();

      // Confirm deletion in the confirmation dialog
      const confirmButton = await driver.wait(until.elementLocated(By.css('.conformation-dialog__button:nth-child(1)')), 10000);
      await confirmButton.click();
      
      const updatedLinkList = await driver.findElement(By.css('.links'));
      const updatedLinkText = await updatedLinkList.getText();
      console.log("Успешно одрађен тест за линкове")
      if (updatedLinkText.includes('Test Link')) {
        throw new Error('\nЛинк није успешно избрисан');
      }
    } else {
      throw new Error('Test image file not found.');
    }

  } finally {
    await driver.quit();
  }
})();
