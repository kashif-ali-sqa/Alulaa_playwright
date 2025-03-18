import { test, expect, beforeEach } from "@playwright/test";
import { describe } from "node:test";
// import { describe } from "node:test";
const landingPage = require("../Locators/landingPage.json");
const bulletinBoard = require("../Locators/bulletinBoard.json");

const signinPage = require("../Locators/signinPage.json");
const Utils = require("../commomMethods/utils");
const taskboard = require("../Locators/taskBoard.json");

let util;
test.describe("Task Board", () => {
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
  test("Create First Task", async () => {
    await util.click(taskboard.clickTaskBoardBtn);
    await util.click(taskboard.clickCreateTaskBtn);
    await util.typeField(taskboard.enterTaskTitle, "Test");
    await util.typeField(taskboard.enterTaskDescription, "Test");
    await util.click(taskboard.clickDrawerCreateTaskBtn);
    await expect(page.locator(taskboard.toastMessageCreateTask)).toHaveText(
      "Task has been created"
    );
  });
  test("Task Ownership Button", async () => {
    await util.click(taskboard.clickTaskBoardBtn);
    await util.click(taskboard.clickTaskownershipBtn);
    await expect(page.locator(taskboard.taskOwnershipMessage)).toHaveText(
      "Task owner has been updated"
    );
  });
  test("User is able to change the status of task", async () => {
    await util.click(taskboard.clickTaskBoardBtn);
    await util.click(taskboard.clickStatusDropdown);
    await util.click(taskboard.clickCompletedStatusBtn);
    await expect(page.locator(taskboard.taskStatusUpdatedMessage)).toHaveText(
      "Task status has been updated"
    );
  });

  test("Delete Create task", async () => {
    await util.click(taskboard.clickTaskBoardBtn);
    await util.click(taskboard.clickCompletedBtn)
    await util.click(taskboard.clickTaskEllipsesicon);
    await util.click(bulletinBoard.clickPostDeleteBtn);
    await util.click(bulletinBoard.clickModalDeleteBtn);
    await expect(page.locator(taskboard.deletedTaskMessage)).toHaveText(
      "Task has been deleted"
    );
  });
});
