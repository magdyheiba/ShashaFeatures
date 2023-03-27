import { Page } from '@playwright/test';
import { AdvertiserDashboard } from './AdvertiserDashboard';

export class AllPagesObject {
  advertiserDashboard: AdvertiserDashboard;

  constructor(public page: Page) {
    this.advertiserDashboard = new AdvertiserDashboard(page);
  }
}