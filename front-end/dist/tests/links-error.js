const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

(async function linkFailureTests() {
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

    console.log('Преглед свих линкова са странице...');
    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/links`);
    await driver.wait(until.elementLocated(By.css('.create-link')), 10000);

    console.log('Креирање линка без назива...');
    const filePath = path.resolve(__dirname, '../tests/test-image.jpg');

    if (fs.existsSync(filePath)) {
      const fileInput = await driver.findElement(By.css('input[type="file"]'));
      const websiteInput = await driver.findElement(By.css('input[placeholder="Унеси линк овде типа https://..."]'));
      const addButton = await driver.findElement(By.css('div.button-container'));

      await fileInput.sendKeys(filePath);
      await websiteInput.sendKeys('https://example.com');

      await driver.wait(until.elementIsVisible(addButton), 10000);
      await addButton.click();

      const errorMessage = await driver.findElement(By.css('.message-box__container h2')).getText();

      if (!errorMessage.includes('Потребно је да се унесу и сајт и име!')) {
        throw new Error('Тест није препознао грешку за празан назив линка');
      }

    } else {
      throw new Error('Није пронађена слика за линк');
    }

    console.log('УСПЕХ: Тест за празан назив линка успешно прошао');

    await driver.sleep(5000);

    console.log('Креирање линка без отпремања фајла...');
    const nameInput = await driver.findElement(By.css('input[placeholder="Унеси назив фајла"]'));
    const websiteInput = await driver.findElement(By.css('input[placeholder="Унеси линк овде типа https://..."]'));
    const addButton = await driver.findElement(By.css('div.button-container'));

    await nameInput.sendKeys('Назив линка без логоа');
    await websiteInput.sendKeys('https://example.com');

    await driver.wait(until.elementIsVisible(addButton), 10000);
    await addButton.click();

    const errorMessage = await driver.findElement(By.css('.message-box__container h2')).getText();
    if (!errorMessage.includes('Молим Вас да унесете лого')) {
      throw new Error('Тест није препознао грешку за недостајућу слику');
    }

    console.log('УСПЕХ: Тест за линк без слике успешно прошао');
    console.log('УСПЕХ: Прошао тест за грешке код линкова');

  } catch (error) {
    console.error('ГРЕШКА: ', error.message);
  } finally {
    await driver.quit();
  }
})();
