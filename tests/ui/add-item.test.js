const { By, until, Key } = require('selenium-webdriver');
const { expect } = require('chai');
const { buildDriver } = require('../../src/driver');
require('dotenv').config();

// UI Scenario 2: Add item to cart on saucedemo.com
const BASE_URL = process.env.UI_BASE_URL || 'https://www.saucedemo.com/';

describe('UI: Add item to cart (saucedemo)', function () {
  this.timeout(60000);
  let driver;

  before(async () => {
    driver = await buildDriver();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('adds a specific item to the cart and verifies the cart badge', async () => {
    await driver.get(BASE_URL);

    // Login first
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    await driver.wait(until.elementLocated(By.css('.inventory_list')), 10000);
    // Ensure at least one inventory item is rendered
    await driver.wait(async () => {
      const items = await driver.findElements(By.css('.inventory_item'));
      return items.length > 0;
    }, 10000, 'Expected inventory items to be rendered');

    // Add the first item to cart
  const firstAddButton = await driver.findElement(By.css('button.btn_inventory'));
  await firstAddButton.click();
  // Give the client a moment to update cart state before navigating
  await driver.sleep(500);

    // Verify cart badge increments to 1
    const badge = await driver.wait(
      until.elementLocated(By.css('.shopping_cart_badge')),
      5000
    );
    const text = await badge.getText();
    expect(text).to.equal('1');

    // Navigate to cart and verify item exists
  await driver.findElement(By.css('.shopping_cart_link')).click();
    // Wait for the SPA to navigate to cart view
    await driver.wait(until.urlContains('cart'), 5000).catch(() => {});
    // Poll for cart items to appear (handles async fetch and render)
    await driver.wait(async () => {
      const items = await driver.findElements(By.css('.cart_item'));
      return items.length > 0;
    }, 25000, 'Expected at least one .cart_item in cart');
    const cartItems = await driver.findElements(By.css('.cart_item'));
    expect(cartItems.length).to.be.greaterThan(0);
  });
});
