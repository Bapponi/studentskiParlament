const { Builder, By, until, Key } = require('selenium-webdriver');
require('chromedriver');
const path = require('path');
require('dotenv').config();

(async function newsErrorTest() {
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

    console.log("Прелаз на компоненту за креирање нове вести у корисничком панелу...");
    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/user-panel`);

    console.log("Покушај креирања вести без наслова и исечка...");
    const createNewsButton = await driver.findElement(By.xpath("//div[contains(@class, 'button-container') and .//h2[text()='Прављење нових вести']]"));
    await createNewsButton.click();

    const publishButton = await driver.findElement(By.xpath("//div[contains(@class, 'button-container') and .//h2[text()='Објави вест']]"));
    await publishButton.click();

    const errorMessage = await driver.wait(until.elementLocated(By.css('.message-box__container h2')), 10000);
    const errorText = await errorMessage.getText();

    if (errorText.includes('Потребно је унети наслов и исечак вести!')) {
      console.log("УСПЕХ: Недостају наслов и исечак.");
    } else {
      throw new Error('Грешка: Неправилна порука о грешци за недостајући наслов и исечак.');
    }

    await driver.sleep(5000);

    console.log("Покушај уноса предугачког исечка...");
    const titleInput = await driver.findElement(By.css('input[placeholder="Унесите наслов вести овде"]'));
    await titleInput.sendKeys('Име нове вести');

    const clipInput = await driver.findElement(By.css('textarea[placeholder="Унети максимално 200 карактера"]'));
    const longText = 'Тест '.repeat(50);
    await clipInput.sendKeys(longText);

    console.log("Додавање елемента заглавља...");
    const addElementButton = await driver.findElement(By.xpath("//div[@class='new-element__button']"));
    await addElementButton.click();

    const headerOption = await driver.findElement(By.xpath("//div[@class='add-option' and .//h2[text()='Заглавље']]"));
    await headerOption.click();

    const headerInput = await driver.findElement(By.css('input[placeholder="Унесите заглавље овде"]'));
    await headerInput.sendKeys('Заглавље вести');

    await publishButton.click();

    const longClipErrorMessage = await driver.wait(until.elementLocated(By.css('.message-box__container h2')), 10000);
    const longClipErrorText = await longClipErrorMessage.getText();

    if (longClipErrorText.includes('Унет предугачки исечак текста!')) {
    console.log("Тест прошао: Унет предугачки исечак.");
    } else {
    throw new Error('Грешка: Неправилна порука о грешци за предугачки исечак.');
    }

    await driver.sleep(5000);

    console.log("Покушај без елемената вести...");
    await titleInput.sendKeys('Име нове вести');
    await clipInput.clear();
    await clipInput.sendKeys('Кратак исечак вести.');

    await publishButton.click();

    const elementErrorMessage = await driver.wait(until.elementLocated(By.css('.message-box__container h2')), 10000);
    const elementErrorText = await elementErrorMessage.getText();

    if (elementErrorText.includes('Мора да се унесе минимум један нови елемент вести!')) {
      console.log("УСПЕХ: Ниједан нови елемент вести није додат.");
    } else {
      throw new Error('Грешка: Неправилна порука о грешци за недостајуће елементе вести.');
    }

    console.log("УСПЕХ: Прошао тест за грешке код вести.");

  } catch (error) {
    console.error('ГРЕШКА: ', error.message);
  } finally {
    await driver.quit();
  }
})();
