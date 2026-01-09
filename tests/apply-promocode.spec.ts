import { test } from './fixtures';
import * as fs from 'fs';
import * as path from 'path';

test.use({
  browserName: 'chromium',
});

test('Apply with Promo Codo TEST WISE', async ({ page, testData }) => {
  test.setTimeout(120000); // 2 minutes timeout

  // Load test data from separate JSON file
  const testDataPath = path.join(__dirname, 'data', 'apply_test_data.json');
  const testDataFile = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));

  // Navigate to the form
  await page.goto('https://wiseloandev.wpengine.com/apply/');



  //PAGE 1--------------------------------------

  // Wait for the form to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(300);

  // Scroll to top of form
  await page.evaluate(() => window.scrollTo(0, 0));

  // Fill First Name field using name attribute (best practice)
  await page.locator('input[name="input_3"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_3"]', testData.firstName);
  await page.waitForTimeout(200);

  // Fill Last Name field using name attribute
  await page.locator('input[name="input_4"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_4"]', testData.lastName);
  await page.waitForTimeout(200);

  // Fill Date of Birth field using name attribute
  await page.locator('input[name="input_5"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_5"]', testData.dateOfBirth);
  await page.waitForTimeout(200);

  await page.click('body');
  await page.waitForTimeout(200);

  // Fill Email Address field using name attribute (from email.txt)
  await page.locator('input[name="input_6"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_6"]', testData.email);
  await page.waitForTimeout(200);

  // Fill Mobile Phone field
  await page.locator('input[name="input_21"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_21"]', '555-123-4567');
  await page.waitForTimeout(200);

  // Select "Are you active military?" option
  await page.locator('select[name="input_9"]').scrollIntoViewIfNeeded();
  await page.selectOption('select[name="input_9"]', 'No');
  await page.waitForTimeout(200);

  // Fill Social Security Number field (from apply_test_data.json)
  await page.locator('input[name="input_11"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_11"]', testDataFile.ssn);
  await page.waitForTimeout(200);

  // Fill Driver License Number field
  await page.locator('input[name="input_12"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_12"]', 'DL123456789');
  await page.waitForTimeout(200);

  // Select State option
  await page.locator('select[name="input_13"]').scrollIntoViewIfNeeded();
  await page.selectOption('select[name="input_13"]', 'LA');
  await page.waitForTimeout(200);

  // Fill Promo Code field (hardcoded as "TEST WISE")
  await page.locator('input[name="input_15"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_15"]', 'TEST LEAD');
  await page.waitForTimeout(200);

  // Close any open date pickers/calendars by clicking outside and waiting
  await page.click('body');
  await page.waitForTimeout(500);

  // Take screenshot 1 before submission
  const emailWithoutDomain = testData.email.split('@')[0];
  let screenshotCounter = 1;
  const screenshot1Name = `${emailWithoutDomain}_application_${screenshotCounter}.png`;
  await page.screenshot({ path: `screenshots/${screenshot1Name}`, fullPage: true });
  screenshotCounter++;

  // Click the submit button
  await page.click('#gform_submit_button_6');


   //PAGE 2--------------------------------------

  // Wait for next page to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(300);

  // Scroll to top of form
  await page.evaluate(() => window.scrollTo(0, 0));

  // Fill Home Address field
  await page.locator('input[name="input_3"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_3"]', '55 Saint Joseph Rd');
  await page.waitForTimeout(200);

  // Fill Suite/Apt # field
  await page.locator('input[name="input_4"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_4"]', '35');
  await page.waitForTimeout(200);

  // Fill City field
  await page.locator('input[name="input_6"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_6"]', 'Pine Grove');
  await page.waitForTimeout(200);

  // Select State option
  await page.locator('select[name="input_7"]').scrollIntoViewIfNeeded();
  await page.selectOption('select[name="input_7"]', 'LA');
  await page.waitForTimeout(200);

  // Fill Zip Code field
  await page.locator('input[name="input_8"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_8"]', '70453');
  await page.waitForTimeout(200);

  // Fill Net Monthly Income field
  await page.locator('input[name="input_10"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_10"]', '5500');
  await page.waitForTimeout(200);

  // Select Income Source option
  await page.locator('select[name="input_11"]').scrollIntoViewIfNeeded();
  await page.selectOption('select[name="input_11"]', 'Employment');
  await page.waitForTimeout(200);

  // Fill Employer Name field
  await page.locator('input[name="input_12"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_12"]', 'Saint Clare');
  await page.waitForTimeout(200);

  // Select Payment Frequency option
  await page.locator('select[name="input_17"]').scrollIntoViewIfNeeded();
  await page.selectOption('select[name="input_17"]', 'BIWEEKLY');
  await page.waitForTimeout(200);

  // Fill Next date you will get paid field
  await page.locator('input[name="input_18"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_18"]', '01/15/2026');
  await page.waitForTimeout(200);

  await page.click('body');
  await page.waitForTimeout(200);

  // Fill Additional Monthly Income field
  await page.locator('input[name="input_15"]').scrollIntoViewIfNeeded();
  await page.fill('input[name="input_15"]', '1000');
  await page.waitForTimeout(200);

  // Select Additional Monthly Income Source option
  await page.locator('select[name="input_19"]').scrollIntoViewIfNeeded();
  await page.selectOption('select[name="input_19"]', 'Employment');
  await page.waitForTimeout(200);

  // Take screenshot 2 after filling address and income fields
  const screenshot2Name = `${emailWithoutDomain}_application_${screenshotCounter}.png`;
  await page.screenshot({ path: `screenshots/${screenshot2Name}`, fullPage: true });
  screenshotCounter++;

  // Click the submit next button
  await page.click('#gform_submit_button_7');


   //PAGE 3--------------------------------------

  // Wait for next page to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(300);

  // Scroll to top of form
  await page.evaluate(() => window.scrollTo(0, 0));

  // Fill Bank Name field
  await page.locator('#input_8_3').scrollIntoViewIfNeeded();
  await page.fill('#input_8_3', 'Decision Logic Test');
  await page.waitForTimeout(200);

  // Fill Bank Routing Number field (9 digits)
  await page.locator('#input_8_4').scrollIntoViewIfNeeded();
  await page.fill('#input_8_4', '999999963');
  await page.waitForTimeout(200);

  // Fill Checking Account Number field
  await page.locator('#input_8_5').scrollIntoViewIfNeeded();
  await page.fill('#input_8_5', '56-4325647');
  await page.waitForTimeout(200);

  // Select "Is this a valid checking account?" option
  await page.locator('#input_8_7').scrollIntoViewIfNeeded();
  await page.selectOption('#input_8_7', 'Yes');
  await page.waitForTimeout(200);

  // Fill Years field
  await page.locator('#input_8_10').scrollIntoViewIfNeeded();
  await page.fill('#input_8_10', '1');
  await page.waitForTimeout(200);

  // Fill Months field
  await page.locator('#input_8_11').scrollIntoViewIfNeeded();
  await page.fill('#input_8_11', '3');
  await page.waitForTimeout(200);

  // Select "Do you have direct deposit on this account?" option
  await page.locator('#input_8_8').scrollIntoViewIfNeeded();
  await page.selectOption('#input_8_8', 'Yes');
  await page.waitForTimeout(200);

  // Select "Select the approximate amount you want to borrow" option
  await page.locator('#input_8_24').scrollIntoViewIfNeeded();
  await page.selectOption('#input_8_24', '500');
  await page.waitForTimeout(200);

  // Check "I have read, understand, and consent to Wise Loan's Electronic Disclosure Agreement, General Terms & Conditions and Privacy Policy" checkbox
  await page.locator('input[name="input_18.1"]').scrollIntoViewIfNeeded();
  await page.check('input[name="input_18.1"]');
  await page.waitForTimeout(200);

  // Check "Would you like to receive SMS notifications from Wise Loan regarding this account?" checkbox
  await page.locator('input[name="input_19.1"]').scrollIntoViewIfNeeded();
  await page.check('input[name="input_19.1"]');
  await page.waitForTimeout(200);

  // Take screenshot 3 after filling bank and loan information
  const screenshot3Name = `${emailWithoutDomain}_application_${screenshotCounter}.png`;
  await page.screenshot({ path: `screenshots/${screenshot3Name}`, fullPage: true });
  screenshotCounter++;

  // Click the submit button
  await page.click('#gform_submit_button_8');


   //PAGE 4--------------------------------------

  // Wait for next page to load
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  // Scroll to top of form
  await page.evaluate(() => window.scrollTo(0, 0));

  // Fill Name on Card field (full name from fixture)
  await page.fill('input[name="input_1"]', `${testData.firstName} ${testData.lastName}`);
  await page.waitForTimeout(200);

  // Fill Card Number field (inside iframe)
  const cardFrame = page.locator('iframe').contentFrame();
  await cardFrame.locator('#text_value').fill('4111111111111111');
  await page.waitForTimeout(200);


  // Keep browser open to observe behavior
  await page.pause();
});



///npx playwright test tests/apply-promocode.spec.ts --project=chromium --headed
//node server.js 