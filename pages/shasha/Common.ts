

export class Common {
  getCampaignName(): string {
    return 'Campagin name - ' + this.generateIntNumber();
  }
  generateIntNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async convertStringToInteger(price: string) {
    return parseInt(price);
  }
  async convertStringToDouble(price: any) {
    return parseFloat(price);
  }
  async getTheDayOfToday() {
    let date = new Date();
    let currentDate = date.getDate();
    return currentDate;
  }
  async formatThePrice(Price: string) {
    let x = Price.substring(0, Price.length - 5);
    let FinalPrice: string = x.trim().replace(",", "");
    return FinalPrice;
  }
}
