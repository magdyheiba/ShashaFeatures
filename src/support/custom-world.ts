import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import { BrowserContext, Page, PlaywrightTestOptions, APIRequestContext } from '@playwright/test';

export interface CucumberWorldConstructorParams {
  parameters: { [key: string]: string };
}

export interface ICustomWorld extends World {
  pagesObj: any;
  debug: boolean;
  feature?: messages.Pickle;
  context?: BrowserContext;
  page?: Page;

  testName?: string;
  startTime?: Date;

  server?: APIRequestContext;

  playwrightOptions?: PlaywrightTestOptions;
}

export class CustomWorld extends World implements ICustomWorld {
  constructor(options: IWorldOptions) {
    super(options);
  }
  pagesObj: any;
  feature?: messages.Pickle | undefined;
  context?: BrowserContext | undefined;
  page?: Page | undefined;
  testName?: string | undefined;
  startTime?: Date | undefined;
  server?: APIRequestContext | undefined;
  playwrightOptions?: PlaywrightTestOptions | undefined;
  debug = false;
}

setWorldConstructor(CustomWorld);
