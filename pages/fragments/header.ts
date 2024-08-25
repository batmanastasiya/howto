import { Page } from '@playwright/test';
import { CartPage } from '../cartPage';

export class Header {
  constructor(private page: Page) {}

  private cartButton = this.page.getByTestId('shopping_cart_link');
  private cartBadge = this.page.getByTestId('shopping_cart_badge');
  private pageTitle = this.page.getByTestId('title');
  private sortingDropdown = this.page.getByTestId('product-sort-container');

  async getPageTitle(): Promise<string> {
    return this.pageTitle.textContent();
  }

  async openCart(): Promise<CartPage> {
    await this.cartButton.click();
    return new CartPage(this.page);
  }

  async getCartBadge(): Promise<string> {
    return this.cartBadge.textContent();
  }
}
