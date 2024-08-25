import { Page } from '@playwright/test';
import { Header } from './fragments/header';
import { InventoryPage } from './inventoryPage';

export class CheckoutCompletePage {
  public header = new Header(this.page);

  private backHomeBtn = this.page.getByTestId('back-to-products');
  constructor(private page: Page) {}

  async backHome(): Promise<InventoryPage> {
    await this.backHomeBtn.click();
    return new InventoryPage(this.page);
  }
}
