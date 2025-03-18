import { test, expect, beforeEach } from "@playwright/test";
const landingPage = require("../Locators/landingPage.json");
const signinPage = require("../Locators/signinPage.json");
const Utils = require("../commomMethods/utils");

let util;
test.describe("Signin Test Case", () => {
  let context = null;
  let page = null;

 test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    util = new Utils(page);
    await util.visitWebsite(landingPage.baseURL);
  });

  test.afterAll( async() =>{
    await page.close();}
  )

test("complete signin", async () => {
  await util.click(landingPage.loginBTN);
  await expect(page.locator(landingPage.loginBTN)).toBeVisible();

  await util.typeField(
    signinPage.emailFieldSelector,
    "kashif.ali+32@camp1.tkxel.com"
  );

  await util.typeField(signinPage.passwordFieldSelector, "Tkxel123@");
  await util.click(signinPage.ClickloginBtn);
  await page.waitForTimeout(3000); // Wait for 3 seconds
  // await expect(page).toHaveURL(/\/feed/);
  // await util.click(signinPage.clickProfileIcon);

  // await expect(page.locator(signinPage.loggedinUser)).toHaveText(
  //   "kashif.ali+32@camp1.tkxel.com"
  // );
});
});
