import { test, expect, beforeEach } from "@playwright/test";
import { describe } from "node:test";
const landingPage = require("../Locators/landingPage.json");
const signinPage = require("../Locators/signinPage.json");
const Utils = require("../commomMethods/utils");
const bulletinBoard = require("../Locators/bulletinBoard.json");

let util;

test.describe("Bulletin Board", () => {
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
      "kashif.ali+2@camp1.tkxel.com"
    );

    await util.typeField(signinPage.passwordFieldSelector, "Tkxel123@");
    await util.click(signinPage.ClickloginBtn);
  });

  test.afterAll(async () => {
    await page.close();
  });
  test("Verify that user is able to Create post", async () => {
    await util.click(bulletinBoard.clickWhatsOnYourMindField);
    // await page.waitForTimeout(3000);
    await util.click(bulletinBoard.enterPostText);

    await util.typeField(bulletinBoard.enterPostText, "Testing");
    await util.click(bulletinBoard.clickPostBtn);
    await expect(page.locator(bulletinBoard.createdPostMessage)).toHaveText(
      "Post has been created"
    );
  });
  test("Verify that user is able to liked a post", async () => {
    await util.click(bulletinBoard.clickLikedBtn);
    // await page.waitForTimeout(3000);
  });
  test("Verify that user is able to reply a post", async () => {
    await util.typeField(bulletinBoard.enterTextRepliedBox,"Test");
    await util.click(bulletinBoard.clickPostBtn)
    // await page.waitForTimeout(3000);
    await expect(page.locator(bulletinBoard.replyToastMessage)).toHaveText("Comment added successfully")
  });
  test("Verify that user is able to update post", async () => {
    await util.click(bulletinBoard.clickPostEllipsesIcon);
    await util.click(bulletinBoard.clickEditPostBtn);
    await util.click(bulletinBoard.clickUpdatePostBtn);
    await expect(page.locator(bulletinBoard.updatePostMessage)).toHaveText(
      "Post has been updated"
    );

    // await page.waitForTimeout(3000);
  });

  test("Verify that user is able to delete post", async () => {
    await util.click(bulletinBoard.clickPostEllipsesIcon);
    await util.click(bulletinBoard.clickPostDeleteBtn);
    await util.click(bulletinBoard.clickModalDeleteBtn);
    // await page.waitForTimeout(3000);
    await expect(page.locator(bulletinBoard.deletedPostMessage)).toHaveText(
      "Post has been deleted"
    );
  });
 
});
