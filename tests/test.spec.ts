// import { test, expect } from '../fixtures/fixtures';
// import { standard_user } from '../user-data/users';
// import { addBrokenImageToDOM } from '../helpers/imageCheckHelper';
//
// test.use({ currentUser: standard_user });
// test.only('Test', async ({ inventoryPage, page }) => {
//   const pickedProduct = await inventoryPage.pickAnyAvailableProduct();
//   const productDetailsPage = await inventoryPage.openProductPage(
//     pickedProduct.name,
//   );
//
//   //const image = await productDetailsPage.getProductImage();
//   //const product = page.locator('#add-to-cart');
//   //const attributeValue = await productDetailsPage.getAttributeValue('src');
//
//   // const productImage = await productDetailsPage.getProductImage();
//
//   // await addBrokenImageToDOM(page);
//   // const testBrImage = await page.locator('#test-broken');
//   const notBrockenImage = await productDetailsPage.getProductImage();
//   await notBrockenImage.evaluate((node: HTMLImageElement) => {
//     node.src = '/img/broken-image.jpg';
//   });
//   const attributeValue = await productDetailsPage.getAttributeValue('src');
//   console.log(attributeValue);
//
//   const brockenImage = await productDetailsPage.getProductImage();
//
//   expect(brockenImage).toBeValidImage();
//   expect(true).toBe(true);

/* const attributeValue = await productDetailsPage.getAttributeValue('src');


  expect.soft(testBrImage).toBeValidImage();
  expect.soft(await isImageSrcValid(attributeValue)).toBe(true);
});

*/

//
// test.use({ currentUser: standard_user });
// test('Test', async ({ inventoryPage }) => {
//   const selectedOption = await inventoryPage.header.selectSortingOption(
//     'Price (low to high)',
//   );
//
//   console.log(selectedOption);
//
//   expect(true).toBe(true);
//});

// await productImage.evaluate((node: HTMLImageElement) => {
//   node.src = '/img/broken-image.jpg';
// });
//
// const brokenImage = await productDetailsPage.getProductImage();
