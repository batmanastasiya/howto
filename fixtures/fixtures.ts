import { test as base } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage';
import { LoginPage } from '../pages/loginPage';
import { User } from '../types/user.type';

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
