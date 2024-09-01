const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

(async function materialTests() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/login`);

    const emailInput = await driver.findElement(By.css('input[placeholder="Унеси мејл овде"]'));
    const passwordInput = await driver.findElement(By.css('input[placeholder="Унеси шифру овде"]'));
    const loginButton = await driver.findElement(By.css('div.login-button'));

    await emailInput.sendKeys(`${process.env.REACT_APP_ADMIN_MAIL}`);
    await passwordInput.sendKeys(`${process.env.REACT_APP_ADMIN_PASSWORD}`);
    await loginButton.click();

    await driver.wait(until.urlIs(`${process.env.REACT_APP_FRONTEND_LINK}/`), 15000);

    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/materials`);

    await driver.wait(until.elementLocated(By.css('.create-material')), 10000);

    const filePath = path.resolve(__dirname, '../tests/test-document.pdf');
    console.log('Качење фајла са путање:', filePath);

    if (fs.existsSync(filePath)) {
      const fileInput = await driver.findElement(By.css('input[type="file"]'));
      const titleInput = await driver.findElement(By.css('input[placeholder="Унеси назив фајла"]'));
      const addButton = await driver.wait(until.elementLocated(By.css('div.button-container')), 10000);

      await fileInput.sendKeys(filePath);

      await titleInput.sendKeys('Назив материјала');

      await driver.wait(until.elementIsVisible(addButton), 10000);
      await addButton.click();

      const materialList = await driver.findElement(By.css('.materials'));
      const materialText = await materialList.getText();
      if (!materialText.includes('Назив материјала')) {
        throw new Error('Неуспешно креирање новог материјала');
      }

      const editButtons = await driver.findElements(By.css('img.material-update'));
      if (editButtons.length === 0) {
        throw new Error('Није пронађено дугме за ажурирање података.');
      }

      const lastEditButton = editButtons[editButtons.length - 1];
      await lastEditButton.click();

      const popups = await driver.findElements(By.css('.popup'));
      const targetPopup = popups[popups.length - 1];
      await driver.wait(until.elementIsVisible(targetPopup), 10000);

      const updatedTitleInput = await targetPopup.findElement(By.css('input[placeholder="Унеси нови наслов овде"]'));
      const updatedFileInput = await targetPopup.findElement(By.css('input[type="file"]'));
      const saveButton = await targetPopup.findElement(By.css('div.update-material__button'));

      await updatedTitleInput.clear();
      await updatedTitleInput.sendKeys('Нови назив материјала');
      await updatedFileInput.sendKeys(filePath);
      await saveButton.click();

      await driver.wait(until.stalenessOf(targetPopup), 15000);

      const updatedMaterialList = await driver.findElement(By.css('.materials'));
      const updatedMaterialText = await updatedMaterialList.getText();
      if (!updatedMaterialText.includes('Нови назив материјала')) {
        throw new Error('Материјал неуспешно ажуриран');
      }

      const deleteButtons = await driver.findElements(By.css('img.material-delete'));
      if (deleteButtons.length === 0) {
        throw new Error('Није пронађено дугме за брисање података');
      }

      const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
      await lastDeleteButton.click();

      const confirmButton = await driver.wait(until.elementLocated(By.css('.conformation-dialog__button:nth-child(1)')), 10000);
      await confirmButton.click();
      
      const finalMaterialList = await driver.findElement(By.css('.materials'));
      const finalMaterialText = await finalMaterialList.getText();
      console.log("Успешно одрађен тест за материјале");
      if (finalMaterialText.includes('Нови назив материјала')) {
        throw new Error('Материјал неуспешно обрисан');
      }
    } else {
      throw new Error('Није пронађен фајл за материјал');
    }

  } finally {
    await driver.quit();
  }
})();
