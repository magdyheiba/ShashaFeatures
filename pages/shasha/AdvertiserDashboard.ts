import { expect, Locator, Page } from '@playwright/test';
import testdata from '../../testData/shasha.json';
import { Common } from './Common';
export class AdvertiserDashboard {
  readonly page: Page;
  CampaginName: any;
  readonly url = testdata['Platform.baseURL'];
  SubTotal: any;
  readonly selectLocation_button: Locator;
  readonly locationPrice_text: Locator;
  readonly selectDate_button: Locator;
  readonly clickOnDate_button: Locator;
  readonly selectDuration_input: Locator;
  readonly selectUploadMedia_button: Locator;
  readonly confirm_button: Locator;
  readonly enterCampaginName_text: Locator;
  readonly UploadLater_select: Locator;
  readonly designerMail_text: Locator;
  readonly reviewPayment_button: Locator;
  readonly enterAccountDetails_button: Locator;
  readonly clickHereToLogin_button: Locator;
  readonly email_input: Locator;
  readonly password_input: Locator;
  readonly login_button: Locator;
  readonly agreeTerms_checkBox: Locator;
  readonly selectVisa_button: Locator;
  readonly cardNumber_text: Locator;
  readonly expiryDate_text: Locator;
  readonly cardHolder_text: Locator;
  readonly CVV_text: Locator;
  // readonly cardNumber_iframe: Locator;
  // readonly CVV_iframe: Locator;
  readonly submit_iframe: Locator;
  readonly payAndSubmitCampagin_button: Locator;
  readonly submit_button: Locator;
  readonly campaginStatus_text: Locator;
  readonly totalPriceAtTimeScreen_text: Locator;
  readonly subTotalPriceAtTimeScreen_text: Locator;
  readonly totalPriceAtSuccessPage_text: Locator;
  readonly paymentStatus_select: Locator;
  readonly typeFilter_dropDown: Locator;
  readonly selectSuperMarketFromFilter_dropDown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.selectLocation_button = page.locator(
      "(//div[contains(text(),'Carrefour')])[1]//ancestor::div[contains(@class,'card-content')]//span[contains(text(),'Select')]",
    );
    this.locationPrice_text = page.locator(
      "(//div[contains(text(),'Carrefour')])[1]//ancestor::div[contains(@class,'card-content')]//div[@class='price']//div[@class='count']",
    );
    this.selectDate_button = page.locator(
      "(//div[contains(text(),' Select date →')])[1]",
    );
    this.clickOnDate_button = page.locator(
      "//div[@class='input date-picker-input']//input",
    );
    this.selectDuration_input = page.locator(
      "//div[.='Weeks']//parent::div/input",
    );
    this.selectUploadMedia_button = page.locator(
      "(//div[.=' Upload Media Files → '])[2]",
    );
    this.confirm_button = page.locator("//div[contains(text(),'Confirm')]");
    this.enterCampaginName_text = page.locator(
      "(//label[.='Campaign name']//parent::div/input)[2]",
    );
    this.UploadLater_select = page.locator(
      "//input[@value='UPLOAD_LATER']//following-sibling::div",
    );
    this.designerMail_text = page.locator(
      "(//label[.='Designer Email (Optional)']//parent::div/input)[1]",
    );
    this.reviewPayment_button = page.locator(
      "//div[contains(text(),'Review & Payment')]",
    );
    this.enterAccountDetails_button = page.locator(
      "(//div[contains(text(),'Enter Account Details')])[2]",
    );
    this.clickHereToLogin_button = page.locator(
      "//a[.=' Please click here to login ']",
    );
    this.email_input = page.locator(
      "//label[.='Email']//following-sibling::input",
    );
    this.password_input = page.locator(
      "//label[.='Password']//following-sibling::input",
    );
    this.login_button = page.locator("//div[.= ' Login ']//span");
    this.agreeTerms_checkBox = page.locator(
      "(//label[contains(text(),'I agree to the Shasha')])[2]//parent::div/div",
    );
    this.selectVisa_button = page.locator(
      "//div[@class='name' and .='Credit / Debit Card']",
    );
    this.cardNumber_text = page
      .frameLocator("//iframe[@placeholder='Card Number']")
      .locator("(//input[@placeholder='Card Number' and @type='tel'])");
    this.expiryDate_text = page.locator("(//input[@placeholder='MM / YY'])[1]");
    this.cardHolder_text = page.locator(
      "(//input[@placeholder='Card holder'])[1]",
    );
    this.CVV_text = page
      .frameLocator("//iframe[@placeholder='CVV']")
      .locator(
        "//input[@placeholder='CVV' and contains(@style,'font-family')]",
      );
    this.submit_iframe = page
      .frameLocator("(//iframe[contains(@name,'card')])[3]")
      .locator("//input[@name='B2']");
    this.payAndSubmitCampagin_button = page.locator(
      "//button[.='Pay & Submit Campaign']",
    );
    this.submit_button = page.locator("//input[@name='B2']");
    this.campaginStatus_text = page.locator(
      "//div[@class='summary']/div[@class='message']",
    );
    this.totalPriceAtTimeScreen_text = page.locator(
      "//div[contains(text(),'Total')]/parent::div/div[2]",
    );
    this.subTotalPriceAtTimeScreen_text = page.locator(
      "//div[contains(text(),'Subtotal')]/parent::div/div[2]",
    );
    this.totalPriceAtSuccessPage_text = page.locator(
      "//div[contains(text(),' Added Balance ')]/parent::div/div[2]",
    );
    this.paymentStatus_select = page
      .frameLocator("(//iframe[contains(@name,'card')])[3]")
      .locator("(//select[@id='returnCode'])[1]");
    this.typeFilter_dropDown = page.locator(
      "//label[text()='Type']//ancestor::div[@aria-haspopup]",
    );
    this.selectSuperMarketFromFilter_dropDown = page.locator(
      "//div[contains(text(),'Super Market')]",
    );
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async createCampaign(Duration: string, CampaignName: string) {
    let LocationPrice = await this.selectLocation();
    let TotalPrice = await this.selectTime(Duration);
    expect(await this.convertPriceToDouble(this.SubTotal)).toEqual(
      (await new Common().convertStringToDouble(LocationPrice)) *
        (await new Common().convertStringToDouble(Duration)),
    );
    expect(await this.convertPriceToDouble(TotalPrice)).toStrictEqual(
      await this.calculateTotalPrice(),
    );
    await (
      await (await this.selectAdContent(CampaignName)).loginToPlatform()
    ).proceedToPayment();
    return TotalPrice;
  }

  async selectFromTypeDropdown() {
    await this.typeFilter_dropDown.click();
    await this.selectSuperMarketFromFilter_dropDown.click();
  }

  async selectLocation() {
    await this.selectFromTypeDropdown();
    await this.page.mouse.down();
    await this.selectLocation_button.click();
    let PriceLocation = this.getlocationPrice();
    await this.selectDate_button.click();
    return PriceLocation;
  }

  async selectAdContent(CampaignName: string) {
    await this.enterCampaginName_text.click();
    await this.enterCampaginName_text.type(CampaignName);
    await this.confirm_button.click();
    await this.UploadLater_select.click();
    await this.designerMail_text.click();
    await this.designerMail_text.type('x@shasha.io');
    await this.enterAccountDetails_button.click();
    return this;
  }

  async loginToPlatform() {
    await this.clickHereToLogin_button.click();
    await this.email_input.type('magdy@shasha.io');
    await this.password_input.type('12345678Pa');
    await this.login_button.click();
    await this.reviewPayment_button.click();
    return this;
  }

  async proceedToPayment() {
    await this.selectVisa_button.click();
    await new Common().delay(5000);
    await this.agreeTerms_checkBox.click();
    await this.cardNumber_text.type('4111111111111111');
    await new Common().delay(2000);
    await this.expiryDate_text.type('1123');
    await new Common().delay(2000);
    await this.cardHolder_text.type('magdy');
    await new Common().delay(2000);
    await this.CVV_text.type('111');
    await this.payAndSubmitCampagin_button.click();
    await this.paymentStatus_select.selectOption('Successful');
    await new Common().delay(5000);
    await this.submit_iframe.click();
    await new Common().delay(5000);
  }

  async getCampaignStatus() {
    await new Common().delay(10000);
    return await this.campaginStatus_text.textContent();
  }
  async getSubTotal() {
    return this.SubTotal;
  }

  async getsubTotalPriceAtTimeScreen() {
    return await this.subTotalPriceAtTimeScreen_text.textContent();
  }
  async getTotalPriceAtTimeScreen() {
    return await this.totalPriceAtTimeScreen_text.textContent();
  }

  async getTotalPriceAtSuccessPage() {
    await new Common().delay(2000);
    return await this.totalPriceAtSuccessPage_text.textContent();
  }

  async getlocationPrice() {
    return await this.locationPrice_text.textContent();
  }

  async selectTime(Duration: string) {
    await this.clickOnDate_button.click();
    let SelectedDay = (await new Common().getTheDayOfToday()) + 1;
    let selectDay: Locator = this.page.locator(
      "//div[.='" + SelectedDay + "']",
    );
    await selectDay.click();
    await this.selectDuration_input.type(Duration);
    this.SubTotal = await this.getsubTotalPriceAtTimeScreen();
    let TotalPayment = await this.getTotalPriceAtTimeScreen();
    await this.selectUploadMedia_button.click();
    return TotalPayment;
  }

  async convertPriceToDouble(TotalPrice: any) {
    let x = TotalPrice.substring(0, TotalPrice.length - 5);
    let FinalPrice: string = x.trim().replace(',', '');
    return new Common().convertStringToDouble(FinalPrice);
  }

  async calculateTotalPrice() {
    let TotalPrice: number =
      (await this.convertPriceToDouble(this.SubTotal)) +
      (await this.calculateVAT());
    return Math.round(TotalPrice);
  }

  async calculateVAT() {
    let PriceWithVAT: number =
      (await this.convertPriceToDouble(this.SubTotal)) * 0.15;
    return PriceWithVAT;
  }
}
