import { test } from '../fixtures/fixtures';
import { expect } from '@playwright/test';
import { standard_user } from '../user-data/users';

test.use({ currentUser: standard_user });
test('test the theory', async ({ inventoryPage, page }) => {
  const addedProducts = await inventoryPage.addFewProductsToCart(2);
  console.log(addedProducts);

  await page.reload();

  const addedProducts2 = await inventoryPage.addFewProductsToCart(2);
  console.log(addedProducts2);

  expect(addedProducts.length + addedProducts2.length).toBe(4);
});
