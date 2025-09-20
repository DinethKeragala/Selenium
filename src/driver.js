const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
require('dotenv').config();

async function buildDriver() {
  const options = new chrome.Options();
  // Run in headless mode for CI; set UI_HEADLESS=false to see browser locally
  const headless = (process.env.UI_HEADLESS || 'true').toLowerCase() !== 'false';
  if (headless) {
    options.addArguments('--headless=new');
  }
  options.addArguments(
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--window-size=1280,800'
  );

  // Explicitly use the chromedriver binary shipped with the npm package to avoid auto-download issues
  const service = new chrome.ServiceBuilder(chromedriver.path);
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .setChromeService(service)
    .build();
  return driver;
}

module.exports = { buildDriver };
