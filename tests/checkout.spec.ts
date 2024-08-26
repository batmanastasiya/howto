import { test } from '../fixtures/fixtures';
import { expect } from '@playwright/test';
import { standard_user } from '../user-data/users';
import { ProductInfo } from '../types/product.type';

test.use({ currentUser: standard_user });
test('test the theory', async ({ inventoryPage }) => {
  const addedProducts: ProductInfo[] =
    await test.step('Add products to the cart', async () => {
      return await inventoryPage.addFewProductsToCart(2);
    });
  const cartPage = await test.step('Go to the cart', async () => {
    return await inventoryPage.header.openCart();
  });
  await test.step('Verify all products added to the cart', async () => {
    const productInCart = await cartPage.getCartItemsInfo();

    expect(productInCart).toEqual(addedProducts);
  });

  const checkoutStepOnePage = await test.step('Go to checkout', async () => {
    return await cartPage.goToCheckout();
  });

  await test.step('Fill shipping data', async () => {
    await checkoutStepOnePage.fillShippingData();
  });

  const checkoutStepTwoPage =
    await test.step('Go to checkout step two', async () => {
      return await checkoutStepOnePage.goToCheckoutStepTwo();
    });

  await test.step('Verify all products in checkout', async () => {
    const productsInCheckout = await checkoutStepTwoPage.getCheckoutItemsInfo();
    expect(productsInCheckout).toEqual(addedProducts);
  });

  await test.step('Verify total price', async () => {
    const subtotalPrice = await checkoutStepTwoPage.getSubtotalPrice();
    const expectedTotalPrice =
      await checkoutStepTwoPage.getCalculatedTotalPrice(subtotalPrice);
    const totalPrice = await checkoutStepTwoPage.getTotalPrice();

    // console.log(
    //   `Subtotal price: ${subtotalPrice}, Expected total price: ${expectedTotalPrice}, Total price: ${totalPrice}`,
    // );

    expect(totalPrice).toBe(expectedTotalPrice);
  });

  const checkoutCompletePage = await test.step('Finish checkout', async () => {
    return await checkoutStepTwoPage.finishCheckout();
  });

  await test.step('Verify Back Home button works', async () => {
    const inventoryPageAfterCheckout = await checkoutCompletePage.backHome();

    expect(await inventoryPageAfterCheckout.isPageDisplayed()).toBe(true);
    expect(await inventoryPageAfterCheckout.header.ifCartBadgeVisible()).toBe(
      false,
    );
  });
});
