import { Locator, Page } from "@playwright/test";
import testdata from "../../testData/shasha.json";
import { Common } from "./Common";

export class AdminDashboard {
  readonly page: Page;
  readonly email_input: Locator;
  readonly password_input: Locator;
  readonly login_button: Locator;
  readonly search_button: Locator;
  readonly uploadImage_button: Locator;
  readonly approve_button: Locator;
  readonly confirmApproval_button: Locator;
  readonly pendingCampaigns_text: Locator;
  readonly url = testdata["AdminDashboard.baseURL"];

  constructor(page: Page) {
    this.page = page;
    this.email_input = page.locator("//input[@id='user-email']");
    this.password_input = page.locator("//input[@id='user-password']");
    this.login_button = page.locator("//button[@type='submit']");
    this.search_button = page.locator("//input[@placeholder='Search']");
    this.uploadImage_button = page.locator(
      "(//input[contains(@accept,'image')])[1]"
    );
    this.approve_button = page.locator("//div[.='Approve']");
    this.confirmApproval_button = page.locator("(//div[text()='Confirm'])[1]");
    this.pendingCampaigns_text = page.locator(
      "//div[text()='Pending Campaigns']"
    );
  }

  async goto() {
    await this.page.goto(this.url);
  }
  async loginToAdminDashboard() {
    await this.email_input.type("admin@shasha.test");
    await this.password_input.type("Asdqwe12");
    await this.login_button.click();
    return this;
  }

  async approveCampaign(CampaignName: any) {
    await this.search_button.type(CampaignName);
    let CreatedCampaign = await this.page.locator(
      "(//td[contains(.,'" +
        CampaignName +
        "')]//parent::tr//div[@class='actions-center']/i[.='fact_check'])[1]"
    );
    await CreatedCampaign.click();
    await new Common().delay(2000);
    await this.page.setInputFiles(
      "(//input[contains(@accept,'image')])[1]",
      "testData/files/Dell.jpg"
    );
    await this.approve_button.click();
    await this.confirmApproval_button.click();
    return this;
  }
  async getPendingCampaignsText() {
    new Common().delay(10000);
    return await this.pendingCampaigns_text.textContent();
  }
}
