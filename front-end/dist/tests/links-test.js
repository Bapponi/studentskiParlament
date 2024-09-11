const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

(async function linkTests() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    console.log('Пријављивање за категорију администратора...');
    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/login`);

    const emailInput = await driver.findElement(By.css('input[placeholder="Унеси мејл овде"]'));
    const passwordInput = await driver.findElement(By.css('input[placeholder="Унеси шифру овде"]'));
    const loginButton = await driver.findElement(By.css('div.login-button'));

    await emailInput.sendKeys(`${process.env.REACT_APP_ADMIN_MAIL}`);
    await passwordInput.sendKeys(`${process.env.REACT_APP_ADMIN_PASSWORD}`);
    await loginButton.click();

    await driver.wait(until.urlIs(`${process.env.REACT_APP_FRONTEND_LINK}/`), 15000);

    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/links`);

    console.log("Преглед свиг линкова са странице...");
    await driver.wait(until.elementLocated(By.css('.create-link')), 10000);
    const filePath = path.resolve(__dirname, '../tests/test-image.jpg');

    console.log('Качење фајла са путање: ', filePath);
    
    if (fs.existsSync(filePath)) {
      const fileInput = await driver.findElement(By.css('input[type="file"]'));
      const nameInput = await driver.findElement(By.css('input[placeholder="Унеси назив фајла"]'));
      const websiteInput = await driver.findElement(By.css('input[placeholder="Унеси линк овде типа https://..."]'));
      const addButton = await driver.wait(until.elementLocated(By.css('div.button-container')), 10000);

      await fileInput.sendKeys(filePath);
      await nameInput.sendKeys('Име линка');
      await websiteInput.sendKeys('https://example.com');
      await driver.wait(until.elementIsVisible(addButton), 10000);
      await addButton.click();

      const linkList = await driver.findElement(By.css('.links'));
      const linkText = await linkList.getText();

      if (!linkText.includes('Име линка')) {
        throw new Error('Неуспешно креирање новог линка');
      }

      const editButtons = await driver.findElements(By.css('img.link-update'));
      if (editButtons.length === 0) {
        throw new Error('Није пронађено дугме за ажурирање података.');
      }

      const lastEditButton = editButtons[editButtons.length - 1];
      await lastEditButton.click();

      console.log('Ажурирање линка...');
      const popups = await driver.findElements(By.css('.popup'));
      const targetPopup = popups[popups.length - 1];
      await driver.wait(until.elementIsVisible(targetPopup), 10000);

      const updatedNameInput = await targetPopup.findElement(By.css('input[placeholder="Унеси ново име овде"]'));
      const updatedWebsiteInput = await targetPopup.findElement(By.css('input[placeholder="Унеси нови линк овде типа https://..."]'));
      const updatedFileInput = await targetPopup.findElement(By.css('input[type="file"]'));
      const saveButton = await targetPopup.findElement(By.css('div.update-link__button'));

      await updatedNameInput.clear();
      await updatedNameInput.sendKeys('Ново име линка');
      await updatedWebsiteInput.clear();
      await updatedWebsiteInput.sendKeys('https://updated-example.com');
      await updatedFileInput.sendKeys(filePath);
      await saveButton.click();

      await driver.wait(until.stalenessOf(targetPopup), 15000);

      const updatedLinkList = await driver.findElement(By.css('.links'));
      const updatedLinkText = await updatedLinkList.getText();
      if (!updatedLinkText.includes('Ново име линка')) {
        throw new Error('Линк неуспешно ажуриран');
      }

      console.log('Брисање линка...');
      const deleteButtons = await driver.findElements(By.css('img.link-delete'));
      if (deleteButtons.length === 0) {
        throw new Error('Није пронађено дугме за брисање података');
      }

      const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
      await lastDeleteButton.click();

      const confirmButton = await driver.wait(until.elementLocated(By.css('.conformation-dialog__button:nth-child(1)')), 10000);
      await confirmButton.click();
      
      const finalLinkList = await driver.findElement(By.css('.links'));
      const finalLinkText = await finalLinkList.getText();
      
      if (finalLinkText.includes('Ново име линка')) {
        throw new Error('Линк неуспешно обрисан');
      }
      
      console.log("Успешно одрађен тест за линкове!");

    } else {
      throw new Error('Није пронађена слика за линк');
    }

  } finally {
    await driver.quit();
  }
})();
