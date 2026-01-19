import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.use({
  browserName: 'chromium',
});

test('Sign In - Active User', async ({ page }) => {
  test.setTimeout(60000);

  // Load test data from JSON file
  const testDataPath = path.join(__dirname, 'data', 'apply_test_data.json');
  const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
  const { email, password } = testData.loginAccounts.active;

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

  // Validate Dashboard navigation links
  const dashboardLink = page.getByRole('link', { name: 'Dashboard' });
  await expect(dashboardLink).toHaveAttribute('href', 'https://dev.wise.sandbox.xajeet.io/secure/dashboard/');

  const changePasswordLink = page.getByRole('link', { name: 'Change Password' });
  await expect(changePasswordLink).toHaveAttribute('href', 'https://dev.wise.sandbox.xajeet.io/secure/dashboard/change-password/');

  const personalDetailsLink = page.getByRole('link', { name: 'Change Personal Details' });
  await expect(personalDetailsLink).toHaveAttribute('href', 'https://dev.wise.sandbox.xajeet.io/secure/dashboard/personal-details/');

  const signOutLink = page.getByRole('link', { name: 'Sign Out' });
  await expect(signOutLink).toHaveAttribute('href', 'https://dev.wise.sandbox.xajeet.io/secure/sign-out/');

  // Validate main logo redirects to WiseLoan homepage
  const mainLogo = page.locator('a.logo, header a:has(img), .logo a').first();
  await expect(mainLogo).toHaveAttribute('href', 'https://wiseloandev.wpengine.com/');

  // Take screenshot of Dashboard
  await page.screenshot({ path: 'screenshots/sign_in_active.png', fullPage: true });

  // Keep browser open to observe behavior
  await page.pause();
});

// npx playwright test tests/sign-in-active-user.spec.ts --project=chromium --headed
