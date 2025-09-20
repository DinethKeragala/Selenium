const { By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const { buildDriver } = require('../../src/driver');
require('dotenv').config();

// UI Scenario 1: Login on saucedemo.com
// We'll use the public demo credentials.
const BASE_URL = process.env.UI_BASE_URL || 'https://www.saucedemo.com/';

describe('UI: Login flow (saucedemo)', function () {
  this.timeout(60000);
  let driver;

  before(async () => {
    driver = await buildDriver();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('logs in with valid credentials and reaches inventory page', async () => {
    await driver.get(BASE_URL);

    // Enter username and password
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    // Wait for inventory page to load
    await driver.wait(until.elementLocated(By.css('.inventory_list')), 10000);

    const url = await driver.getCurrentUrl();
    expect(url).to.include('/inventory.html');

    // Validate there are items visible
    const items = await driver.findElements(By.css('.inventory_item'));
    expect(items.length).to.be.greaterThan(0);
  });
});
