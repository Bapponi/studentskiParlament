const { Builder, By, until, Key } = require('selenium-webdriver');
require('chromedriver');
require('dotenv').config();

(async function createPollErrorTest() {
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

    console.log("Прелаз на компоненту за креирање новог гласања у корисничком панелу...");
    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/user-panel`);

    console.log("Креирање новог гласања без имена анкете...");
    const createPollButton = await driver.findElement(By.xpath("//div[contains(@class, 'button-container') and .//h2[text()='Прављење новог гласања']]"));
    await createPollButton.click();

    await driver.wait(until.elementLocated(By.css('.create-news')), 10000);

    const publishButtonWithoutName = await driver.findElement(By.xpath("//div[contains(@class, 'button-container') and .//h2[text()='Објави ново гласање']]"));
    await publishButtonWithoutName.click();

    const nameError = await driver.findElement(By.css('.message-box__container h2'));
    const nameErrorMessage = await nameError.getText();
    if (nameErrorMessage.includes('Потребно је унети наслов анкете!')) {
      console.log('УСПЕХ: Приказана је грешка да је име анкете обавезно.');
    } else {
      console.error('ГРЕШКА: Није приказана грешка да је име анкете обавезно.');
    }

    await driver.sleep(5000)

    console.log("Креирање новог гласања са мање од једне опције...");
    const titleInput = await driver.findElement(By.css('input[placeholder="Унесите наслов гласања овде"]'));
    await titleInput.sendKeys('Тест анкета');

    await publishButtonWithoutName.click();

    const optionError = await driver.findElement(By.css('.message-box__container h2'));
    const optionErrorMessage = await optionError.getText();
    if (optionErrorMessage.includes('Морају да постоје минимун две опције у склопу анкете!')) {
      console.log('УСПЕХ: Приказана је грешка да је потребно најмање једна опција.');
    } else {
      console.error('ГРЕШКА: Није приказана грешка за недовољан број опција.');
    }

    console.log("УСПЕX: Прошао тест за грешке код гласања/анкета");

  } catch (error) {
    console.error('ГРЕШКА: ', error.message);
  } finally {
    await driver.quit();
  }
})();
