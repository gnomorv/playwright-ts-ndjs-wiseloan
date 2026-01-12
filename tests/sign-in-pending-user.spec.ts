import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.use({
  browserName: 'chromium',
});

test('Sign In - Pending User', async ({ page }) => {
  test.setTimeout(60000);

  // Load test data from JSON file
  const testDataPath = path.join(__dirname, 'data', 'apply_test_data.json');
  const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
  const { email, password } = testData.loginAccounts.pending;

  // Navigate to Sign In page
  await page.goto('https://dev.wise.sandbox.xajeet.io/secure/sign-on/');

  // PAGE 1 - Email
  const usernameField = page.getByRole('textbox', { name: 'Username' });
  await usernameField.waitFor({ state: 'visible' });

  // Fill Email field
  await usernameField.fill(email);

  // Click Next button
  await page.getByRole('button', { name: 'Next' }).click();

  // PAGE 2 - Password
  const passwordField = page.getByRole('textbox', { name: 'Password' });
  await passwordField.waitFor({ state: 'visible' });

  // Fill Password field
  await passwordField.fill(password);

  // Click Sign In button
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Wait for successful login - wait for URL change or dashboard element
  await page.waitForURL(/.*(?:dashboard|account|home).*/, { timeout: 30000 }).catch(() => {
    // If URL doesn't change, just wait for navigation to complete
  });
  await page.waitForLoadState('domcontentloaded');

  // Take screenshot of Dashboard
  await page.screenshot({ path: 'screenshots/sign_in_pending.png', fullPage: true });

  // Keep browser open to observe behavior
  await page.pause();
});

// npx playwright test tests/sign-in-pending-user.spec.ts --project=chromium --headed
