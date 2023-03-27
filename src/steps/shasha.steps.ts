import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AdminDashboard } from '../../pages/shasha/AdminDashboard';
import { AdvertiserDashboard } from '../../pages/shasha/AdvertiserDashboard';
import { Common } from '../../pages/shasha/Common';
import { StoreOwnerDashboard } from '../../pages/shasha/StoreOwnerDashboard';
import { ICustomWorld } from '../support/custom-world';

var CampaginStatus: any;
var CampaignName: string;
var StoreOwnerPayment: string;
var subTotalValue: string;
Given('navigate to shasha URL', async function (this: ICustomWorld) {
  const page = this.page!;
  await new AdvertiserDashboard(page).goto();
});

When(
  'selecting date and time of the campagin',
  async function (this: ICustomWorld) {
    const page = this.page!;
    CampaignName = new Common().getCampaignName();
    console.log(CampaignName);
    const advertiserDashboard = new AdvertiserDashboard(page);
    let totalPriceAtTimeScreen = await advertiserDashboard.createCampaign(
      '3',
      CampaignName,
    );
    subTotalValue = await advertiserDashboard.getSubTotal();
    console.log(subTotalValue);
    CampaginStatus = await new AdvertiserDashboard(page).getCampaignStatus();
    let totalPriceAtSuccessPage = await new AdvertiserDashboard(
      page,
    ).getTotalPriceAtSuccessPage();
    expect(totalPriceAtSuccessPage).toStrictEqual(totalPriceAtTimeScreen);
  },
);

Then('I should see the campagin created', async function () {
  expect(CampaginStatus).toStrictEqual(
    ' Payment Done and Campaign Submitted Successfully ',
  );
});

Given('navigate to shasha Admin URL', async function (this: ICustomWorld) {
  const page = this.page!;
  console.log(CampaignName);
  await new AdminDashboard(page).goto();
});
When('approve the campagin by the admin', async function (this: ICustomWorld) {
  const page = this.page!;
  await new AdminDashboard(page).loginToAdminDashboard();
  await new AdminDashboard(page).approveCampaign(CampaignName);
});
Then('I should see the campagin approved', async function () {
  const page = this.page!;
  expect(
    await new AdminDashboard(page).getPendingCampaignsText(),
  ).toStrictEqual('Pending Campaigns');
});

Given(
  'navigate to shasha store owner URL',
  async function (this: ICustomWorld) {
    const page = this.page!;
    console.log(CampaignName);
    new StoreOwnerDashboard(page).goto();
  },
);
When(
  'approve the campagin by the store owner',
  async function (this: ICustomWorld) {
    const page = this.page!;
    new StoreOwnerDashboard(page).loginToStoreOwnerDashboard();
    StoreOwnerPayment = await (
      await new StoreOwnerDashboard(page).navigateToPendingCampaigns()
    ).approveCampaign();
  },
);
Then('I should see the campagin approved by the owner', async function () {
  expect(StoreOwnerPayment.trim()).toStrictEqual(
    await new Common().formatThePrice(subTotalValue),
  );
});
