import { LaunchOptions } from '@playwright/test';
const browserOptions: LaunchOptions = {
  headless: false,
};

export const config = {
  browser: process.env.BROWSER || 'chromium',
  browserOptions,
  BASE_URL: 'https://shasha-platform-qa.web.app/create-campaign',
  IMG_THRESHOLD: { threshold: 0.4 },
  // BASE_API_URL: 'https://catfact.ninja/',
};
