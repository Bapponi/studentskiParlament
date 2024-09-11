const { Builder, By, until, Key } = require('selenium-webdriver');
require('chromedriver');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

(async function newsTest() {
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

    console.log("Креирање нове вести...")
    const createNewsButton = await driver.findElement(By.xpath("//div[contains(@class, 'button-container') and .//h2[text()='Прављење нових вести']]"));
    await createNewsButton.click();

    const titleInput = await driver.findElement(By.css('input[placeholder="Унесите наслов вести овде"]'));
    const clipInput = await driver.findElement(By.css('textarea[placeholder="Унети максимално 200 карактера"]'));
    const bannerInput = await driver.findElement(By.css('.news-part input[type="file"]'));
    const bannerFilePath = path.resolve(__dirname, '../tests/test-image.jpg');

    await titleInput.sendKeys('Име нове вести');
    await clipInput.sendKeys('Овде иде кратак исечак вести од максимално 200 карактера.');

    if (fs.existsSync(bannerFilePath)) {
        await bannerInput.sendKeys(bannerFilePath);
    } else {
        throw new Error('Није пронађена слика члана');
    }

    const addElementButton = await driver.findElement(By.xpath("//div[@class='new-element__button']"));
    await addElementButton.click();

    const headerOption = await driver.findElement(By.xpath("//div[@class='add-option' and .//h2[text()='Заглавље']]"));
    await headerOption.click();
    const headerInput = await driver.findElement(By.css('input[placeholder="Унесите заглавље овде"]'));
    await headerInput.sendKeys('Заглавље вести');

    await addElementButton.click();
    const textOption = await driver.findElement(By.xpath("//div[@class='add-option' and .//h2[text()='Текст']]"));
    await textOption.click();
    const textInput = await driver.findElement(By.css('textarea[placeholder="Унесите текст параграфа овде"]'));
    await textInput.sendKeys('Овде иде текст параграфа.');

    await addElementButton.click();
    const pictureOption = await driver.findElement(By.xpath("//div[@class='add-option' and .//h2[text()='Слика']]"));
    await pictureOption.click();
    const pictureInput = await driver.findElement(By.css('.picture-input input[type="file"]'));
    const pictureFilePath = path.resolve(__dirname, '../tests/test-image.jpg');

    if (fs.existsSync(pictureFilePath)) {
        await pictureInput.sendKeys(pictureFilePath);
    } else {
        throw new Error('Није пронађена слика члана');
    }

    await addElementButton.click();
    const videoOption = await driver.findElement(By.xpath("//div[@class='add-option' and .//h2[text()='Видео']]"));
    await videoOption.click();
    const videoInput = await driver.findElement(By.css('.video-input input[type="file"]'));
    const videoFilePath = path.resolve(__dirname, '../tests/test-video.mp4');

    if (fs.existsSync(videoFilePath)) {
        await videoInput.sendKeys(videoFilePath);
    } else {
        throw new Error('Није пронађен видео фајл');
    }

    const publishButton = await driver.findElement(By.xpath("//div[contains(@class, 'button-container') and .//h2[text()='Објави вест']]"));
    await publishButton.click();

    console.log("Прелаз на почетну страницу где се иде на детаље ново креиране вести...");

    await driver.sleep(500)
    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}`);
    await driver.sleep(500)

    const moreDetailsLink = await driver.findElement(By.xpath("//div[contains(@class, 'news-clip')]//a[contains(@class, 'news_panel__more')]"));
    await moreDetailsLink.click();

    console.log("Ажурирање вести...");

    await driver.wait(until.elementLocated(By.css('.news-banner__buttons div')), 10000);
    const changeBannerButton = await driver.findElement(By.xpath("//div[contains(@class, 'news-banner__buttons')]//div[1]"));
    await changeBannerButton.click();

    const newBannerFilePath = path.resolve(__dirname, '../tests/test-image.jpg');
    const newBannerInput = await driver.findElement(By.css('input[type="file"]'));

    if (fs.existsSync(newBannerFilePath)) {
        await newBannerInput.sendKeys(newBannerFilePath);
    } else {
        throw new Error('Није пронађена нова слика члана');
    }

    const submitBannerButton = await driver.findElement(By.xpath("//div[contains(@class, 'button-container') and .//h2[text()='Пошаљи измену']]"));
    await submitBannerButton.click();

    const changeTitleButton = await driver.findElement(By.xpath("//div[contains(@class, 'news-banner__buttons')]//div[2]"));
    await changeTitleButton.click();

    const newTitleInput = await driver.findElement(By.css('input[placeholder="Унеси нови наслов овде"]'));
    await newTitleInput.clear();
    await newTitleInput.sendKeys('Нови наслов вести');

    const submitTitleButton = await driver.findElement(By.xpath("//div[contains(@class, 'button-container') and .//h2[text()='Пошаљи измену']]"));
    await submitTitleButton.click();

    const changeClipButton = await driver.findElement(By.css(".one-news__admin .one-news__refresh"));
    await changeClipButton.click();

    const newClipInput = await driver.findElement(By.css('textarea[placeholder="Унесите нови исечак текста овде"]'));
    await newClipInput.clear();
    await newClipInput.sendKeys('Нови исечак вести.');

    const submitClipButton = await driver.findElement(By.xpath("//div[contains(@class, 'button-container') and .//h2[text()='Пошаљи измену']]"));
    await submitClipButton.click();

    const updateDetails = [
      { type: 'Header', changeButtonXpath: "//div[contains(@class, 'one-news__admin hh')]//img[contains(@src, 'refresh.png')]", inputCss: 'input[placeholder="Унеси нови поднаслов овде"]', value: 'Нови поднаслов вести' },
      { type: 'Text',   changeButtonXpath: "//div[contains(@class, 'one-news__admin tt')]//img[contains(@src, 'refresh.png')]", inputCss: 'textarea[placeholder="Унесите нови текст параграфа овде"]', value: 'Нови текст параграфа.' },
      { type: 'Image',  changeButtonXpath: "//div[contains(@class, 'one-news__admin pp')]//img[contains(@src, 'refresh.png')]", inputCss: 'input[type="file"]', filePath: '../tests/test-image.jpg' },
      { type: 'Video',  changeButtonXpath: "//div[contains(@class, 'one-news__admin vv')]//img[contains(@src, 'refresh.png')]", inputCss: 'input[type="file"]', filePath: '../tests/test-video.mp4' }
    ];
  
    for (let detail of updateDetails) {
      const changeButton = await driver.findElement(By.xpath(detail.changeButtonXpath));
      await driver.executeScript("arguments[0].scrollIntoView(true);", changeButton);
      await changeButton.click();
  
      if (detail.inputCss && detail.value) {
        const inputElement = await driver.findElement(By.css(detail.inputCss));
        await inputElement.clear();
        await inputElement.sendKeys(detail.value);
      } else if (detail.filePath) {
        const inputElement = await driver.findElement(By.css(detail.inputCss));
        const resolvedFilePath = path.resolve(__dirname, detail.filePath);
  
        if (fs.existsSync(resolvedFilePath)) {
          await inputElement.sendKeys(resolvedFilePath);
        } else {
          throw new Error(`Није пронађена датотека: ${detail.filePath}`);
        }
      }
  
      const submitButton = await driver.findElement(By.xpath("//div[contains(@class, 'button-container') and .//h2[text()='Пошаљи измену']]"));
      await submitButton.click();
    }

    console.log("Брисање вести на страници са свим вестима...");

    await driver.get(`${process.env.REACT_APP_FRONTEND_LINK}/news`);

    const deleteButtons = await driver.findElements(By.css('.all-news img.news-delete'));
    if (deleteButtons.length === 0) {
      throw new Error('Није пронађено дугме за брисање члана');
    }

    const lastDeleteButton = deleteButtons[0];
    await lastDeleteButton.click();

    const confirmButton = await driver.wait(until.elementLocated(By.css('.conformation-dialog__button:nth-child(1)')), 10000);
    await confirmButton.click();
    
    console.log("Успешно одрађен тест за вести");

  } finally {
    await driver.quit();
  }
})();
