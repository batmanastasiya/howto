import { Page } from '@playwright/test';
import { CartPage } from '../cartPage';

export class Header {
  constructor(private page: Page) {}

  private cartButton = this.page.getByTestId('shopping-cart-link');
  private cartBadge = this.page.getByTestId('shopping-cart-badge');
  private pageTitle = this.page.getByTestId('title');
  private sortingDropdown = this.page.getByTestId('product-sort-container');

  async getPageTitle(): Promise<string> {
    return this.pageTitle.textContent();
  }

  async openCart(): Promise<CartPage> {
    await this.cartButton.click();
    return new CartPage(this.page);
  }

  async getProductAmountInCart(): Promise<string> {
    return this.cartBadge.textContent();
  }

  async ifCartBadgeVisible(): Promise<boolean> {
    return this.cartBadge.isVisible();
  }
}
