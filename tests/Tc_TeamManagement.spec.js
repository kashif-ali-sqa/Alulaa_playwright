import { test, expect, beforeEach } from "@playwright/test";
import { describe } from "node:test";
// import { describe } from "node:test";
const landingPage = require("../Locators/landingPage.json");
const signinPage = require("../Locators/signinPage.json");
const Utils = require("../commomMethods/utils");
const teamManagement = require("../Locators/teamManagement.json");

let util;
test.describe("Team Management Module", () => {
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
  test("Verify that user is able to add care recipient", async () => {
    await util.click(teamManagement.clickSwitchCarespaceDropdownicon);
    await util.click(teamManagement.clickOtherCarespaceBtn);

    await util.click(teamManagement.clickTeamManagementlink);

    await util.click(teamManagement.clickAddCareRecipientBtn);
    // await page.waitForTimeout(3000);

    await util.typeField(teamManagement.enterCareRecipientName, "Test User");
    await util.click(teamManagement.clickInviteBtn);
    await util.typeField(
      teamManagement.enterCareRecipientEmail,
      "kashif.ali+22@camp1.tkxel.com"
    );
    await util.click(teamManagement.clickAddBtn);
    // await page.waitForTimeout();
    await expect(
      page.locator(teamManagement.careRecipientAddedToastMessage)
    ).toHaveText("Care recipient has been added successfully.");
  });

  test("Verify that user is able to add care Givers", async () => {
    await util.click(teamManagement.clickSwitchCarespaceDropdownicon);
    await util.click(teamManagement.clickOtherCarespaceBtn);

    await util.click(teamManagement.clickTeamManagementlink);
    await util.click(teamManagement.clickCareGiversBtn);
    await util.click(teamManagement.clickAddCareGiverBtn);
    await util.typeField(teamManagement.enterCareGiverEmail, "Test@gmail.com");
    await util.click(teamManagement.clickSendInviteBtn);
    await expect(page.locator(teamManagement.alreadyInvitedemail)).toHaveText(
      "Email address(es) already invited: Test@gmail.com"
    );
    // await expect(page.locator(teamManagement.careGiverInvitedToastMessage)).toHaveText("Caregiver has been invited successfully.")
  });
  test("Verify that user is able to remove care Givers", async () => {
    await util.click(teamManagement.clickSwitchCarespaceDropdownicon);
    await util.click(teamManagement.clickOtherCarespaceBtn);

    await util.click(teamManagement.clickTeamManagementlink);
    await util.click(teamManagement.clickCareGiverEllipsesIcon);
    await util.click(teamManagement.clickRemoveCareGiverBtn);
    await util.click(teamManagement.clickRemoveMemberBtn);
    await util.click(teamManagement.removeMemberToastMessage);


  });
});
