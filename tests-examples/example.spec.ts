import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures'
import { performance_glitch_user } from '../user-data/users';


test('sdfsdf', async ({ loginPage }) => {
  await loginPage.doFailedLogin({username: '', password: ''})
  expect(true).toBe(true)
})

