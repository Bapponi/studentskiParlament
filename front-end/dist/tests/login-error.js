const { error } = require('console');
const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');
require('dotenv').config();

(async function loginFailureTests() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    console.log('Тестирање пријаве за администратора...');
    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/login`);

    const emailLoginInput = await driver.findElement(By.css('input[placeholder="Унеси мејл овде"]'));
    const passwordInput = await driver.findElement(By.css('input[placeholder="Унеси шифру овде"]'));
    const loginButton = await driver.findElement(By.css('div.login-button'));

    console.log('Тестирање без унетих креденцијала...');
    await loginButton.click();
    let errorMessage = await driver.findElement(By.css('.message-box__container h2')).getText();
    if (!errorMessage.includes('Нису унети креденцијали')) {
      throw new Error('Тест није препознао грешку за недостајуће креденцијале');
    }
    console.log('УСПЕХ: Тест за недостајуће креденцијале успешно прошао');

    await driver.sleep(5000);

    console.log('Тестирање са нетачним мејлом...');
    await emailLoginInput.clear();
    await passwordInput.clear();
    await emailLoginInput.sendKeys('netacan@mail.com');
    await passwordInput.sendKeys(`${process.env.REACT_APP_ADMIN_PASSWORD}`);
    await loginButton.click();

    errorMessage = await driver.findElement(By.css('.message-box__container h2')).getText();
    if (!errorMessage.includes('Нетачни кориснички мејл!')) {
      throw new Error('Тест није препознао грешку за нетачан мејл');
    }
    console.log('УСПЕХ: Тест за нетачан мејл успешно прошао');

    await driver.sleep(5000);

    console.log('Тестирање са нетачном шифром...');
    await emailLoginInput.clear();
    await passwordInput.clear();
    await emailLoginInput.sendKeys(`${process.env.REACT_APP_ADMIN_MAIL}`);
    await passwordInput.sendKeys('netacnaSifra');
    await loginButton.click();

    await driver.sleep(500);

    errorMessage = await driver.findElement(By.css('.message-box__container h2')).getText();
    if (!errorMessage.includes('Нетачна корисничка шифра!')) {
      throw new Error('Тест није препознао грешку за нетачну шифру');
    }
    console.log('УСПЕХ: Тест за нетачну шифру успешно прошао');

  } catch (error) {
    console.error('ГРЕШКА: ', error.message);
  } finally {
    await driver.quit();
  }
})();
