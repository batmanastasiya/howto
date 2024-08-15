import { Page } from '@playwright/test';
import { User } from '../user-data/users';
import { InventoryPage } from './inventoryPage';

export class LoginPage {
    constructor(private page: Page) {}
	
	private loginButton = this.page.locator('#login-button');
	private usernameInput = this.page.getByPlaceholder('Username');
	private passwordInput = this.page.getByPlaceholder('Password');

	async loginAs(user: User): Promise<InventoryPage> {
		await this.usernameInput.fill(user.username);
		await this.passwordInput.fill(user.password);
		await this.loginButton.click();

        return new InventoryPage(this.page)
	}

    static async open(page: Page){
        await page.goto('');
        return new LoginPage(page)
    }
}