import { request } from '@playwright/test';
import playwrightConfig from '../playwright.config';

export async function isImageSrcValid(imgPath) {
  const context = await request.newContext();
  const response = await context.get(playwrightConfig.use.baseURL + imgPath);
  const status = response.status();

  return status === 200;
}
