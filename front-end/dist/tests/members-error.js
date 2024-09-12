const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
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

    const addButton = await driver.wait(until.elementLocated(By.css('div.button-container')), 10000);

    console.log('Тестирање лоше форматираног мејла...');
    const еmailInput = await driver.findElement(By.css('input[placeholder="Унеси мејл члана"]'));
    await еmailInput.sendKeys('лошформат');
    await addButton.click();

    let errorMessage = await driver.findElement(By.css('.message-box__container h2')).getText();
    if (!errorMessage.includes('Лоше форматиран мејл!')) {
      throw new Error('Тест није препознао грешку за лоше форматиран мејл');
    }

    console.log('УСПЕХ: Тест за лоше форматиран мејл успешно прошао');

    await driver.sleep(5000)

    console.log('Креирање члана са улогом 3, без имена и позиције...');
    await еmailInput.sendKeys('dobar@format.com');
    const roleSelectOption = await driver.findElement(By.css('.form-element__container .select-field'));
    const roleOptions = await driver.findElements(By.css('.form-element__container .select-field option'));

    await roleSelectOption.click();
    for (const option of roleOptions) {
      const value = await option.getAttribute('value');
      if (value === '3') {
        await option.click();
        break;
      }
    }

    await addButton.click();
    errorMessage = await driver.findElement(By.css('.message-box__container h2')).getText();
    if (!errorMessage.includes('Потребно је да се унесу и име и позиција члана!')) {
      throw new Error('Тест није препознао грешку за празно име и позицију за улогу члана');
    }

    console.log('УСПЕХ: Тест за члана са улогом 3 без имена и позиције успешно прошао');

    await driver.sleep(5000)

    console.log('Креирање члана са улогом 1, без слике и биографије...');
    const nameInput = await driver.findElement(By.css('input[placeholder="Унеси име и презиме члана"]'));
    await nameInput.sendKeys('лошформат');
    await еmailInput.sendKeys('dobar@format.com');

    const positionSelectOption = await driver.findElement(By.css('.form-element__container .select-field'));
    await positionSelectOption.click();

    const positionOptions = await driver.findElements(By.css('.form-element__container .select-field option'));
    for (const option of positionOptions) {
      const text = await option.getText();
      if (text === 'Председник') { 
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

    await addButton.click();
    errorMessage = await driver.findElement(By.css('.message-box__container h2')).getText();
    if (!errorMessage.includes('Молим Вас да унесете слику')) {
      throw new Error('Тест није препознао грешку за недостатак слике за улогу администратора');
    }

    console.log('УСПЕХ: Одрађен тест за члана са улогом администратора без слике и биографије');
    console.log('УСПЕX: Прошао тест за грешке код чланова');

  } catch (error) {
    console.error('ГРЕШКА: ', error.message);
  } finally {
    await driver.quit();
  }
})();
