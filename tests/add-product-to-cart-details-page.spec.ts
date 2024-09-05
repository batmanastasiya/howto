import { test, expect } from '../fixtures/fixtures';
import { standard_user } from '../user-data/users';
import { ProductInfo } from '../types/product.type';
import { SingleProductPage } from '../pages/singleProductPage';

test.use({ currentUser: standard_user });
test('Add product to cart from the details page', async ({ inventoryPage }) => {
  const pickedProduct: ProductInfo =
    await test.step('Pick any available product', async () => {
      return await inventoryPage.pickAnyAvailableProduct();
    });
  const productDetailsPage: SingleProductPage =
    await test.step('Open the product details page', async () => {
      return await inventoryPage.openProductPage(pickedProduct.name);
    });

  await test.step('Verify that the product details are same on details and inventory pages', async () => {
    const productInfo = await productDetailsPage.getProductInfo();
    expect(productInfo).toEqual(pickedProduct);
  });

  await test.step('Verify that the product image is valid', async () => {
    const productImage = await productDetailsPage.getProductImage();
    await expect(productImage).toBeValidImage();
  });

  await test.step('Add product to the cart', async () => {
    await productDetailsPage.addProductToCart();
  });

  await test.step('Verify that the product is added to the cart', async () => {
    const cartBadge = await productDetailsPage.header.getProductAmountInCart();
    const cartPage = await productDetailsPage.header.openCart();
    const productInCart = await cartPage.getCartItemsInfo();

    expect(cartBadge).toBe('1');
    expect(productInCart).toContainEqual(pickedProduct);
  });
});
