import { Common } from './Common';
// eslint-disable-next-line prettier/prettier
import { Locator, Page } from '@playwright/test';
// eslint-disable-next-line import/order
import testdata from '../../testData/shasha.json';

export class StoreOwnerDashboard {
  readonly page: Page;
  readonly url = testdata['StoreOwnerDashboard.baseURL'];
  readonly email_input: Locator;
  readonly password_input: Locator;
  readonly login_button: Locator;
  readonly burgerMenu_button: Locator;
  readonly incomingCampagin_button: Locator;
  readonly approve_button: Locator;
  readonly storeOwnerPayment_text: Locator;
  readonly approvalMessage_text: Locator;

  storeOwnerPayment: any;

  constructor(page: Page) {
    this.page = page;
    this.email_input = page.locator("//input[@type='email']");
    this.password_input = page.locator(
      "//label[.='Password']//following-sibling::input",
    );
    this.login_button = page.locator("//div[.= ' Login ']//span");
    this.burgerMenu_button = page.locator("//img[@alt='burger-menu']");
    this.incomingCampagin_button = page.locator(
      "//div[text()='Incoming campaigns']",
    );

    this.approve_button = page.locator("//div[text()=' Approve ']");
    this.storeOwnerPayment_text = page.locator(
      "//div[text()='Expected revenue']//parent::div//parent::div/div[@class='value']",
    );
    this.approvalMessage_text = page.locator("//div[@role='status']/div");
  }

  async goto() {
    await this.page.goto(this.url);
  }
  async loginToStoreOwnerDashboard() {
    await this.email_input.type('ammarelfeky11@gmail.com');
    await new Common().delay(2000);
    await this.password_input.type('Ammar1234');
    await this.login_button.click();
    return this;
  }

  async navigateToPendingCampaigns() {
    await this.incomingCampagin_button.click();
    return this;
  }

  async approveCampaign() {
    // let respond_button: Locator = this.page.locator(
    //   "(//div[contains(text(),'" +
    //     CampaignName +
    //     "')])[1]//ancestor::div[@class='card']//div[text()='Respond']"
    // );
    await new Common().delay(2000);
    const respond_button: Locator = this.page.locator(
      "(//div[contains(text(),'Shasha')])[1]//ancestor::div[@class='card']//div[text()='Respond']",
    );
    await respond_button.click();
    this.storeOwnerPayment = await this.getstoreOwnerPayment();
    await this.approve_button.click();
    return this.storeOwnerPayment;
  }

  async getstoreOwnerPayment() {
    return await this.storeOwnerPayment_text.textContent();
  }

  async getApprovalMessage() {
    return await this.approvalMessage_text.textContent();
  }
}
