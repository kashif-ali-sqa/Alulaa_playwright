import { test, expect, beforeEach } from "@playwright/test";
const landingPage = require("../Locators/landingPage.json");
const signinPage = require("../Locators/signinPage.json");
const Utils = require("../commomMethods/utils");
const Onboarding = require("../Locators/onboardScreen.json");

let util;
test.describe.skip("On Boading Test Case", () => {
  let context = null;
  let page = null;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    util = new Utils(page);
    await util.visitWebsite(landingPage.baseURL);
    await util.click(landingPage.loginBTN);
    await expect(page.locator(landingPage.loginBTN)).toBeVisible();

    await util.typeField(
      signinPage.emailFieldSelector,
      "kashif.ali+32@camp1.tkxel.com"
    );

    await util.typeField(signinPage.passwordFieldSelector, "Tkxel123@");
    await util.click(signinPage.Clicklogin);
  });

  test.afterAll(async () => {
    await page.close();
  });
  test("Complete Onboarding process", async () => {
    
    await util.typeField(Onboarding.fullName, "Kashif ali");
    await util.typeField(Onboarding.phoneNumber, "2222222222");
    await util.click(Onboarding.continueButton);
    // await page.waitForTimeout(3000);
    await util.click(Onboarding.forYourSlef);
    await util.click(Onboarding.continueButton);
    await util.click(Onboarding.clickJump);
  });
});
