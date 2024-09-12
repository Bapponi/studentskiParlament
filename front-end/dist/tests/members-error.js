const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

(async function memberFailureTests() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    console.log('Пријављивање за категорију администратора...');
    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/login`);

    const emailLoginInput = await driver.findElement(By.css('input[placeholder="Унеси мејл овде"]'));
    const passwordInput = await driver.findElement(By.css('input[placeholder="Унеси шифру овде"]'));
    const loginButton = await driver.findElement(By.css('div.login-button'));

    await emailLoginInput.sendKeys(`${process.env.REACT_APP_ADMIN_MAIL}`);
    await passwordInput.sendKeys(`${process.env.REACT_APP_ADMIN_PASSWORD}`);
    await loginButton.click();

    await driver.wait(until.urlIs(`${process.env.REACT_APP_FRONTEND_LINK}/`), 15000);

    console.log('Преглед свих чланова...');
    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/members`);
    await driver.wait(until.elementLocated(By.css('.create-member')), 10000);

    console.log('Креирање члана без имена...');
    const filePath = path.resolve(__dirname, '../tests/test-image.jpg');

    const fileInput = await driver.findElement(By.css('input[type="file"]'));
    const nameInput = await driver.findElement(By.css('input[placeholder="Унеси име и презиме члана"]'));
    const emailInput = await driver.findElement(By.css('input[placeholder="Унеси мејл члана"]'));
    const positionSelectOption = await driver.findElement(By.css('.form-element__container .select-field'));  
    const positionOptions = await driver.findElements(By.css('.form-element__container .select-field option'));  
    const roleSelectOption = await driver.findElement(By.css('.form-element__container .select-field'));
    const roleOptions = await driver.findElements(By.css('.form-element__container .select-field option'));
    const bioInput = await driver.findElement(By.css('textarea[placeholder="Опционо унеси биографију члана"]'));
    const addButton = await driver.wait(until.elementLocated(By.css('div.button-container')), 10000);

    if (fs.existsSync(filePath)) {
  
      await positionSelectOption.click();
  
      for (const option of positionOptions) {
        const text = await option.getText();
        if (text === 'Члан') { 
          await option.click();
          break;
        }
      }
  
      await roleSelectOption.click();
  
      for (const option of roleOptions) {
        const value = await option.getAttribute('value');
        if (value === '3') {
            await option.click();
            break;
        }
      }
  
      await fileInput.sendKeys(filePath);
      await emailInput.sendKeys('ime.prezime@example.com');
      await bioInput.sendKeys('Овде иде кратка биографија о члану');
      await addButton.click();

      const errorMessage = await driver.findElement(By.css('.message-box__container h2')).getText();

      if (!errorMessage.includes('Потребно је да се унесу и име и позиција члана!')) {
        throw new Error('Тест није препознао грешку за празно име');
      }

    } else {
      throw new Error('Није пронађена слика за члана');
    }

    console.log('УСПЕХ: Тест за празно име члана успешно прошао');

    await driver.sleep(5000);

    console.log('Креирање члана без отпремања слике...');

    await positionSelectOption.click();
  
    for (const option of positionOptions) {
      const text = await option.getText();
      if (text === 'Члан') { 
        await option.click();
        break;
      }
    }
  
    await roleSelectOption.click();
  
    for (const option of roleOptions) {
      const value = await option.getAttribute('value');
      if (value === '1') {
          await option.click();
          break;
      }
    }
  
    await nameInput.sendKeys('Име и презиме члана');
    await emailInput.sendKeys('ime.prezime@example.com');
    await bioInput.sendKeys('Овде иде кратка биографија о члану');
    await addButton.click();

    const errorMessage = await driver.findElement(By.css('.message-box__container h2')).getText();
    if (!errorMessage.includes('Молим Вас да унесете слику')) {
      throw new Error('Тест није препознао грешку за недостајућу слику');
    }

    console.log('УСПЕХ: Тест за члана без слике успешно прошао');
    console.log('УСПЕХ: Прошао тест за грешке код чланова');

  } catch (error) {
    console.error('ГРЕШКА: ', error.message);
  } finally {
    await driver.quit();
  }
})();
