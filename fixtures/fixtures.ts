import { test as base, expect as baseExpect, Locator } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';
import { LoginPage } from '../pages/loginPage';
import { User } from '../types/user.type';
import { isImageSrcValid } from '../helpers/imageCheckHelper';
import { ImageCheck } from '../types/imageCheck.type';

export type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  currentUser: User;
};

export const test = base.extend<TestFixtures>({
  currentUser: {} as User,
  loginPage: async ({ page }, use) => {
    const loginPage = await test.step('Open the login page', async () => {
      return await LoginPage.open(page);
    });
    await use(loginPage);
  },
  inventoryPage: async ({ currentUser, loginPage }, use) => {
    const inventoryPage =
      await test.step(`Login as '${currentUser.username}'`, async () => {
        return loginPage.loginAs(currentUser);
      });
    await use(inventoryPage);
  },
});

export const expect = baseExpect.extend({
  toBeValidImage: async (received: Locator) => {
    const image: ImageCheck = {
      hasNaturalWidth: false,
      hasValidSrc: false,
    };

    image.hasNaturalWidth = await received.evaluate(
      (node: HTMLImageElement) => {
        return node.naturalWidth > 0;
      },
    );

    const src = await received.getAttribute('src');
    image.hasValidSrc = await isImageSrcValid(src);

    if (image.hasNaturalWidth && image.hasValidSrc) {
      return {
        message: () => 'Image is valid',
        pass: true,
      };
    } else {
      return {
        message: () =>
          'Image is not valid. The natural width is 0. Or check the locator to be image locator.',
        pass: false,
      };
    }
  },
});
