import { User } from '../user-data/users';
import { BasePage } from './basePage';
import { InventoryPage } from './inventoryPage';

export class LoginPage extends BasePage {
	public pagePath = '';

	private loginButton = this.page.locator('#login-button');
	private usernameInput = this.page.getByPlaceholder('Username');
	private passwordInput = this.page.getByPlaceholder('Password');

	async loginAs(user: User): Promise<InventoryPage> {
		await this.usernameInput.fill(user.username);
		await this.passwordInput.fill(user.password);
		await this.loginButton.click();

        return new InventoryPage(this.page)
	}


    async doFailedLogin(user: User) {
        await this.usernameInput.fill(user.username);
		await this.passwordInput.fill(user.password);
		await this.loginButton.click();
    }
}