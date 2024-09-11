const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

(async function materialFailureTests() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    console.log('Пријављивање за категорију администратора...');
    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/login`);

    const emailInput = await driver.findElement(By.css('input[placeholder="Унеси мејл овде"]'));
    const passwordInput = await driver.findElement(By.css('input[placeholder="Унеси шифру овде"]'));
    const loginButton = await driver.findElement(By.css('div.login-button'));

    await emailInput.sendKeys(process.env.REACT_APP_ADMIN_MAIL);
    await passwordInput.sendKeys(process.env.REACT_APP_ADMIN_PASSWORD);
    await loginButton.click();

    await driver.wait(until.urlIs(`${process.env.REACT_APP_FRONTEND_LINK}/`), 15000);

    console.log('Преглед свих материјала са странице...');
    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/materials`);
    await driver.wait(until.elementLocated(By.css('.create-material')), 10000);

    console.log('Креирање материјала без назива...');
    const filePath = path.resolve(__dirname, '../tests/test-document.pdf');

    if (fs.existsSync(filePath)) {
      const fileInput = await driver.findElement(By.css('input[type="file"]'));
      const addButton = await driver.findElement(By.css('div.button-container'));

      await fileInput.sendKeys(filePath);

      await driver.wait(until.elementIsVisible(addButton), 10000);
      await addButton.click();

      const errorMessage = await driver.findElement(By.css('.message-box__container h2')).getText();

      if (!errorMessage.includes('Потребно је да се унесе име!')) {
        throw new Error('Тест није препознао грешку за празан назив материјала');
      }

      console.log('УСПЕХ: Тест за празан назив материјала успешно прошао');

    } else {
      throw new Error('Није пронађен фајл за материјал');
    }

    await driver.sleep(5000);

    console.log('Креирање материјала без отпремања фајла...');
    const titleInput = await driver.findElement(By.css('input[placeholder="Унеси назив фајла"]'));
    const addButton = await driver.findElement(By.css('div.button-container'));

    await titleInput.sendKeys('Назив материјала без фајла');

    await driver.wait(until.elementIsVisible(addButton), 10000);
    await addButton.click();

    const errorMessage = await driver.findElement(By.css('.message-box__container h2')).getText();
    if (!errorMessage.includes('Молим Вас да унесете фајл')) {
      throw new Error('Тест није препознао грешку за недостајући фајл');
    }

    console.log('УСПЕХ: Тест за материјал без фајла успешно прошао');
    console.log('УСПЕХ: Прошао тест за грешке код материјала');

  } catch (error) {
    console.error('ГРЕШКА: ', error.message);
  } finally {
    await driver.quit();
  }
})();
