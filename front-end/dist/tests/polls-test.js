const { Builder, By, until, Key } = require('selenium-webdriver');
require('chromedriver');
require('dotenv').config();

(async function createPollTest() {
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

    console.log("Прелаз на компоненту за креирање новог гласања/ankete у корисничком панелу...");
    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/user-panel`);

    console.log("Креирање новoг гласања...");
    const createPollButton = await driver.findElement(By.xpath("//div[contains(@class, 'button-container') and .//h2[text()='Прављење новог гласања']]"));
    await createPollButton.click();

    await driver.wait(until.elementLocated(By.css('.create-news')), 10000);

    const titleInput = await driver.findElement(By.css('input[placeholder="Унесите наслов гласања овде"]'));
    await titleInput.sendKeys('Име новог гласања');

    for (let i = 1; i <= 4; i++) {
        const addElementButton = await driver.findElement(By.css('.new-element__button'));
        await addElementButton.click();
      
        await driver.wait(until.elementLocated(By.css('.element-options')), 5000);
        const optionInputs = await driver.findElements(By.css('.element-options input'));
      
        if (optionInputs.length > 0) {
          const optionInput = optionInputs[optionInputs.length - 1];
          await optionInput.sendKeys(`Опција ${i}`);
        } else {
          console.error('Није пронађено поље за унос нове опције');
        }
      }

    const publishButton = await driver.findElement(By.xpath("//div[contains(@class, 'button-container') and .//h2[text()='Објави ново гласање']]"));
    await publishButton.click();

    console.log("Преглед свих гласања на делу корисничког панела за то...");
    const allPollsButton = await driver.findElement(By.xpath("//div[contains(@class, 'button-container') and .//h2[text()='Преглед свих гласања']]"));
    await allPollsButton.click();

    await driver.sleep(1000);

    console.log("Гласање на ново креираној анкети...");
    const polls = await driver.findElements(By.css('.poll-container'));
    if (polls.length > 0) {
      const latestPoll = polls[0];

      const selectOption = await latestPoll.findElement(By.css('.poll-vote select'));
      await selectOption.click();
      const options = await selectOption.findElements(By.tagName('option'));
      if (options.length > 1) {
        await options[1].click(); 
      } else {
        console.error('Није пронађена ниједна опција за гласање');
      }

      const submitVoteButton = await latestPoll.findElement(By.xpath("//div[contains(@class, 'button-container') and .//h2[text()='Пошаљи глас']]"));
      await submitVoteButton.click();

      console.log("Деактивирање гласања...");
      const deactivateButton = await latestPoll.findElement(By.xpath("//button[contains(@class, 'poll-toggle__active') and .//h3[text()='Деактивирај']]"));      await deactivateButton.click();
      await deactivateButton.click();
      await deactivateButton.click();

      console.log("Брисање гласања...");
      const deleteButtons = await driver.findElements(By.css('img.poll-delete'));
      if (deleteButtons.length === 0) {
        throw new Error('Није пронађено дугме за брисање члана');
      }

      const lastDeleteButton = deleteButtons[0];
      await lastDeleteButton.click();

      const confirmButton = await driver.wait(until.elementLocated(By.css('.conformation-dialog__button:nth-child(1)')), 10000);
      await confirmButton.click();

    } else {
      console.error('Није пронађена ниједна анкета');
    }

    console.log("УСПЕХ: Одрађен тест за гласања/анкете");

  } catch (error) {
    console.error('ГРЕШКА: ', error.message);
  } finally {
    await driver.quit();
  }
})();
