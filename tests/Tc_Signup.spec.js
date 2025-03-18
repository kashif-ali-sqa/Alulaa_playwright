import { test, expect, beforeEach } from "@playwright/test";
const landingPage = require("../Locators/landingPage.json");
const signinPage = require("../Locators/signinPage.json");
const Utils = require("../commomMethods/utils");
const signupLocator = require("../Locators/signupLocator.json");
// const { google } = require("googleapis");
let util;
test.describe("Signup Test Case", () => {
  let context = null;
  let page = null;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    util = new Utils(page);
    await util.visitWebsite(landingPage.baseURL);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("siginup process", async () => {
    await util.click(signupLocator.createAccountBtn);
    await util.typeField(
      signinPage.emailFieldSelector,
      "kashif.ali+99@camp1.tkxel.com"
    );

    await util.typeField(signupLocator.enterCreatePasswordField, "Tkxel123@");
    await util.click(signupLocator.signupCheckbox);
    await util.click(signupLocator.clickSignupBtn);
    await page.waitForTimeout(3000);
    //   await util.typeField(signupLocator.enterCodeField);
  });
});
