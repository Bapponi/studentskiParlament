const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

(async function memberTests() {
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

    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/members`);

    await driver.wait(until.elementLocated(By.css('.create-member')), 10000);

    const filePath = path.resolve(__dirname, '../tests/test-image.jpg');
    console.log('Uploading file from path:', filePath);

    if (fs.existsSync(filePath)) {
      const fileInput = await driver.findElement(By.css('input[type="file"]'));
      const nameInput = await driver.findElement(By.css('input[placeholder="Унеси име и презиме члана"]'));
      const emailInput = await driver.findElement(By.css('input[placeholder="Унеси мејл члана"]'));

      const positionSelectOption = await driver.findElement(By.css('.form-element__container .select-field'));
      await positionSelectOption.click();

      const positionOptions = await driver.findElements(By.css('.form-element__container .select-field option'));
      for (const option of positionOptions) {
        const text = await option.getText();
        if (text === 'Члан') { 
          await option.click();
          break;
        }
      }

      const roleSelectOption = await driver.findElement(By.css('.form-element__container .select-field'));
      await roleSelectOption.click();

      const roleOptions = await driver.findElements(By.css('.form-element__container .select-field option'));
      for (const option of roleOptions) {
        const value = await option.getAttribute('value');
        if (value === '3') {
            await option.click();
            break;
        }
      }

      const bioInput = await driver.findElement(By.css('textarea[placeholder="Опционо унеси биографију члана"]'));
      const addButton = await driver.wait(until.elementLocated(By.css('div.button-container')), 10000);

      await fileInput.sendKeys(filePath);
      await nameInput.sendKeys('Име и презиме члана');
      await emailInput.sendKeys('ime.prezime@example.com');
      await bioInput.sendKeys('Овде иде кратка биографија о члану');
      await addButton.click();

      const memberList = await driver.findElement(By.css('.other-members'));
      const memberText = await memberList.getText();
      if (!memberText.includes('Име и презиме члана')) {
        throw new Error('Неуспешно креирање новог члана');
      }

      const editButtons = await driver.findElements(By.css('img.member-update'));
      if (editButtons.length === 0) {
        throw new Error('Није пронађено дугме за ажурирање члана.');
      }

      const lastEditButton = editButtons[editButtons.length - 1];
      await lastEditButton.click();

      const popups = await driver.findElements(By.css('.popup'));
      const targetPopup = popups[popups.length - 1];
      await driver.wait(until.elementIsVisible(targetPopup), 10000);

      const updatedNameInput = await targetPopup.findElement(By.css('input[placeholder="Унеси ново име овде"]'));
      const updatedEmailInput = await targetPopup.findElement(By.css('input[placeholder="Унеси нов мејл овде"]'));
      const updatedFileInput = await targetPopup.findElement(By.css('input[type="file"]'));
      
      const updatePositionSelectOption = await driver.findElement(By.css('.select-field'));
      await updatePositionSelectOption.click();

      const updatePositionOptions = await driver.findElements(By.css('.select-field option'));
      for (const option of updatePositionOptions) {
        const text = await option.getText();
        if (text === 'Председник') {
          await option.click();
          break;
        }
      }

      const updateRoleSelectOption = await driver.findElement(By.css('.select-field'));
      await updateRoleSelectOption.click();

      const updateRoleOptions = await driver.findElements(By.css('.select-field option'));
      for (const option of updateRoleOptions) {
        const value = await option.getAttribute('value'); 
        if (value === '1') {
            await option.click();
            break;
        }
      }

      const saveButton = await targetPopup.findElement(By.css('div.update-member__button'));

      await updatedNameInput.clear();
      await updatedNameInput.sendKeys('Ново Име Презиме');
      await updatedEmailInput.clear();
      await updatedEmailInput.sendKeys('novo.ime@example.com');
      await updatedFileInput.sendKeys(filePath);
      await saveButton.click();

      await driver.wait(until.stalenessOf(targetPopup), 15000);

      const updatedMemberList = await driver.findElement(By.css('.main-members'));
      const updatedMemberText = await updatedMemberList.getText();
      if (!updatedMemberText.includes('Ново Име Презиме')) {
        throw new Error('Члан неуспешно ажуриран');
      }

      const deleteButtons = await driver.findElements(By.css('.main-members img.member-delete'));
      if (deleteButtons.length === 0) {
        throw new Error('Није пронађено дугме за брисање члана');
      }

      const lastDeleteButton = deleteButtons[deleteButtons.length - 1];
      await lastDeleteButton.click();

      const confirmButton = await driver.wait(until.elementLocated(By.css('.conformation-dialog__button:nth-child(1)')), 10000);
      await confirmButton.click();
      
      const finalMemberList = await driver.findElement(By.css('.main-members'));
      const finalMemberText = await finalMemberList.getText();
      console.log("Успешно одрађен тест за чланове");
      if (finalMemberText.includes('Ново Име Презиме')) {
        throw new Error('Члан неуспешно обрисан');
      }
    } else {
      throw new Error('Није пронађена слика члана');
    }

  } finally {
    await driver.quit();
  }
})();
