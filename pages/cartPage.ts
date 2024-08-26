import { Page } from '@playwright/test';
import { Header } from './fragments/header';
import { ProductInfo } from '../types/product.type';
import { parsePrice } from '../helpers/priceParsingHelper';
import { CheckoutStepOnePage } from './checkoutStepOnePage';

export class CartPage {
  public header = new Header(this.page);

  private cartItem = this.page.getByTestId('inventory-item');
  private itemName = this.page.getByTestId('inventory-item-name');
  private itemDescription = this.page.getByTestId('inventory-item-desc');
  private itemPrice = this.page.getByTestId('inventory-item-price');
  private checkoutBtn = this.page.getByTestId('checkout');

  constructor(private page: Page) {}

  async getCartItemsInfo(): Promise<ProductInfo[]> {
    const cartItems = await this.cartItem.all();
    const products: ProductInfo[] = [];
    for (const item of cartItems) {
      const name = await item.locator(this.itemName).textContent();
      const desc = await item.locator(this.itemDescription).textContent();
      const price = parsePrice(
        await item.locator(this.itemPrice).textContent(),
      );
      products.push({ name, desc, price });
    }
    return products;
  }

  async removeProductFromCart(productName: string): Promise<void> {
    await this.cartItem
      .filter({ hasText: productName })
      .locator('[data-test^=remove]')
      .click();
  }

  async goToCheckout(): Promise<CheckoutStepOnePage> {
    await this.checkoutBtn.click();
    return new CheckoutStepOnePage(this.page);
  }
}
