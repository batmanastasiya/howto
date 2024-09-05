import { Page } from '@playwright/test';
import { Header } from './fragments/header';
import { ProductInfo } from '../types/product.type';
import { parsePrice } from '../helpers/priceParsingHelper';

export class SingleProductPage {
  public header = new Header(this.page);

  private inventoryItem = this.page.getByTestId('inventory-item');
  private itemName = this.page.getByTestId('inventory-item-name');
  private itemDescription = this.page.getByTestId('inventory-item-desc');
  private itemPrice = this.page.getByTestId('inventory-item-price');
  private itemAddToCartBtn = this.page.getByTestId('add-to-cart');
  private itemImage = this.page.locator('.inventory_details_img');

  constructor(private page: Page) {}

  async getProductInfo(): Promise<ProductInfo> {
    const name = await this.itemName.textContent();
    const desc = await this.itemDescription.textContent();
    const price = parsePrice(await this.itemPrice.textContent());

    return { name, desc, price };
  }

  async addProductToCart(): Promise<void> {
    await this.itemAddToCartBtn.click();
  }

  async getAttributeValue(attribute: string): Promise<string> {
    return this.itemImage.getAttribute(attribute);
  }

  async getProductImage() {
    return this.itemImage;
  }
}
