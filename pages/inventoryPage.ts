import { Locator, Page } from '@playwright/test';
import { ProductInfo } from '../types/product.type';
import { Header } from './fragments/header';
import { parsePrice } from '../helpers/priceParsingHelper';
import { chance } from '../helpers/chanceHelper';
import { SingleProductPage } from './singleProductPage';

export class InventoryPage {
  public header = new Header(this.page);

  private inventoryItem = this.page.getByTestId('inventory-item');
  private itemName = this.page.getByTestId('inventory-item-name');
  private itemDescription = this.page.getByTestId('inventory-item-desc');
  private itemPrice = this.page.getByTestId('inventory-item-price');
  private itemAddToCartBtn = this.page.locator('[data-test^=add-to-cart]');

  constructor(private page: Page) {}

  async addFewProductsToCart(numberOfProducts: number): Promise<ProductInfo[]> {
    const addedProducts: ProductInfo[] = [];

    await this.inventoryItem.first().waitFor({ state: 'visible' });

    for (let i = 0; i < numberOfProducts; i++) {
      const availableProducts: Locator[] = await this.inventoryItem
        .filter({
          has: this.itemAddToCartBtn,
        })
        .all();

      const product = chance.pickone(availableProducts);
      addedProducts.push(await this.getProductInfo(product));
      await product.locator(this.itemAddToCartBtn).click();
    }

    return addedProducts;

    // async getInventoryItemsInfo(): Promise<ProductInfo[]> {
    //   const inventoryItems = await this.inventoryItem.all();
    //   const products: ProductInfo[] = [];
    //   for (const item of inventoryItems) {
    //     const productInfo = await this.getProductInfo(item);
    //     products.push(productInfo);
    //   }
    //   return products;
    // }
    //
    // const inventoryItems = await this.getInventoryItemsInfo();
    // const availableProducts = inventoryItems.filter((item) => !item.isAdded);
    // // if (availableProducts.length < numberOfProducts) {
    // //   throw new Error('Not enough products in inventory');
    // // }
    // const differenceCount = inventoryItems.length - availableProducts.length;
    // const exitCondition = differenceCount + numberOfProducts;
    // const addedProducts: ProductInfo[] = [];
    //
    // for (let i = 0; i < exitCondition; i++) {
    //   if (!inventoryItems[i].isAdded) {
    //     await this.inventoryItem.nth(i).locator(this.itemAddToCartBtn).click();
    //     addedProducts.push(inventoryItems[i]);
    //   }
    // }
    //
    // return addedProducts;
  }

  async pickAnyAvailableProduct(): Promise<ProductInfo> {
    await this.inventoryItem.first().waitFor({ state: 'visible' });
    const availableProducts: Locator[] = await this.inventoryItem
      .filter({
        has: this.itemAddToCartBtn,
      })
      .all();
    const product = chance.pickone(availableProducts);

    return await this.getProductInfo(product);
  }

  async openProductPage(productName: string): Promise<SingleProductPage> {
    const product: Locator = this.inventoryItem.filter({
      hasText: productName,
    });
    await product.locator(this.itemName).click();

    return new SingleProductPage(this.page);
  }

  async isPageDisplayed(): Promise<boolean> {
    await this.inventoryItem.first().waitFor({ state: 'visible' });

    return true;
  }

  private async getProductInfo(item: Locator): Promise<ProductInfo> {
    const name = await item.locator(this.itemName).textContent();
    const desc = await item.locator(this.itemDescription).textContent();
    const price = parsePrice(await item.locator(this.itemPrice).textContent());

    return { name, desc, price };
  }
}
