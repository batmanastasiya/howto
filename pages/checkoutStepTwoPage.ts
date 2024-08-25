import { Header } from './fragments/header';
import { Page } from '@playwright/test';
import { ProductInfo } from '../types/product.type';
import { parsePrice } from '../helpers/priceParsingHealper';
import { calculateTax } from '../helpers/taxCalculatorHealper';
import { CheckoutCompletePage } from './checkoutCompletePage';

export class CheckoutStepTwoPage {
  public header = new Header(this.page);

  private checkoutItem = this.page.getByTestId('inventory-item');
  private itemName = this.page.getByTestId('inventory-item-name');
  private itemDescription = this.page.getByTestId('inventory-item-desc');
  private itemPrice = this.page.getByTestId('inventory-item-price');
  private subtotalPrice = this.page.getByTestId('subtotal-label');
  private tax = this.page.getByTestId('tax-label');
  private total = this.page.getByTestId('total-label');
  private finishCheckoutBtn = this.page.getByTestId('finish');
  constructor(private page: Page) {}

  async getCheckoutItemsInfo(): Promise<ProductInfo[]> {
    const checkoutItems = await this.checkoutItem.all();
    const products: ProductInfo[] = [];
    for (const item of checkoutItems) {
      const name = await item.locator(this.itemName).textContent();
      const desc = await item.locator(this.itemDescription).textContent();
      const price = parsePrice(
        await item.locator(this.itemPrice).textContent(),
      );
      products.push({ name, desc, price });
    }
    return products;
  }

  async getSubtotalPrice() {
    return parsePrice(await this.subtotalPrice.textContent());
  }

  async getTax() {
    return parsePrice(await this.tax.textContent());
  }

  async getCalculatedTotalPrice(price: number) {
    const calculatedTax = calculateTax(price);
    console.log(`Calculated in method ${calculatedTax}`);
    const roundedPrice = parseFloat(price.toFixed(2));
    const roundedTax = parseFloat(calculatedTax.toFixed(2));
    const calsulatedTotal = parseFloat((roundedPrice + roundedTax).toFixed(2));

    return calsulatedTotal;
  }
  async getTotalPrice() {
    return parsePrice(await this.total.textContent());
  }

  async finishCheckout(): Promise<CheckoutCompletePage> {
    await this.finishCheckoutBtn.click();
    return new CheckoutCompletePage(this.page);
  }
}
