import { expect } from "@playwright/test";
import { text } from "stream/consumers";

class Utils {
  constructor(page, locator) {
    this.page = page;
    this.locator = locator;
  }

  async visitWebsite(url) {
    await this.page.goto(url);
  }

  async click(element) {
    await this.page.locator(element).first().click();
  }
  async typeField(element, text) {
    await this.page.locator(element).fill(""); // Ensure the field is cleared
    await this.page.locator(element).fill(text);
    // await this.page.locator(element).press('Control+A').press('Backspace').fill(text);
  }

  async expectVisible(element) {
    await expect(this.page.locator(element)).toBeVisible();
  }
  async getText(element) {
    await this.page.locator(element).waitFor({ state: 'visible' }); // Ensure it's visible
    return await this.page.locator(element).innerText(); // Return the text
}
}

module.exports = Utils;
