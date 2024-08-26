import { Header } from './fragments/header';
import { Page } from '@playwright/test';

import { shippingData } from '../user-data/shippingData';
import { CheckoutStepTwoPage } from './checkoutStepTwoPage';
import { ShippingData } from '../types/shippingData.type';

export class CheckoutStepOnePage {
  public header = new Header(this.page);

  private firstNameInput = this.page.getByTestId('firstName');
  private lastNameInput = this.page.getByTestId('lastName');
  private postalCodeInput = this.page.getByTestId('postalCode');
  private continueButton = this.page.getByTestId('continue');
  constructor(private page: Page) {}

  async fillShippingData(data: ShippingData = shippingData): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.postalCodeInput.fill(data.postalCode);
  }

  async goToCheckoutStepTwo(): Promise<CheckoutStepTwoPage> {
    await this.continueButton.click();

    return new CheckoutStepTwoPage(this.page);
  }
}
