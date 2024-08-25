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
    const loginPage = await LoginPage.open(page);
    await use(loginPage);
  },
  inventoryPage: async ({ currentUser, loginPage }, use) => {
    const inventoryPage = await loginPage.loginAs(currentUser);
    await use(inventoryPage);
  },
});
