const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const assert = require('assert');

setDefaultTimeout(30 * 1000);

let browser;
let page;

Before({ tags: '@checkout' }, async function () {
  browser = await chromium.launch({ headless: false, slowMo: 300 });
  page = await browser.newPage();
});

After({ tags: '@checkout' }, async function () {
  await browser.close();
});

Given('the user opens the checkout page', async function () {
  await page.goto('http://localhost:3000/index.html');
});

When('the user enters the full name {string}', async function (name) {
  await page.getByLabel('Full Name').fill(name);
});

When('the user enters the postal code {string}', async function (code) {
  await page.getByLabel('Postal Code').fill(code);
});

When('the user clicks Place Order', async function () {
  await page.getByRole('button', { name: 'Place Order' }).click();
});

Then('the checkout shows the message {string}', async function (expected) {
  const message = page.getByText(expected, { exact: true });
  await message.waitFor({ state: 'visible' });
  assert.ok(await message.isVisible());
});
