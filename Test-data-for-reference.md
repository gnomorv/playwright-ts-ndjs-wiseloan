
# Test Data Reference

## Test URL

### For application
https://wiseloandev.wpengine.com/apply/

### For Sign In

https://dev.wise.sandbox.xajeet.io/secure/sign-on/

---

## Test Values for Manual Testing (Application)

### PAGE 1 - Personal Information

First Name: TEST_James
Last Name: Smith_test
Date of Birth: 05/15/1985
Email: unique
Mobile Phone: 555-123-4567
Active Military: No
SSN: unique
Driver License: DL123456789
State: LA
Promo Code: TEST LEAD

### PAGE 2 - Address & Income

Home Address: 55 Saint Joseph Rd
Suite/Apt: 35
City: Pine Grove
State: LA
Zip Code: 70453
Net Monthly Income: 5500
Income Source: Employment
Employer Name: Saint Clare
Payment Frequency: BIWEEKLY
Next Pay Date: 01/15/2026
Additional Monthly Income: 1000
Additional Income Source: Employment

### PAGE 3 - Bank & Loan Information

Bank Name: Decision Logic Test
Bank Routing Number: 999999963
Checking Account Number: 56-4325647
Valid Checking Account: Yes
Years (with bank): 1
Months (with bank): 3
Direct Deposit: Yes
Borrow Amount: 500
Terms Consent: Check
SMS Notifications: Check

### PAGE 4 - Card Information

Name on Card: TEST_James Smith_test2610
Card Number: 4111111111111111

---

## Dynamic Values (from fixtures.ts)

First Name format: TEST_ + random name (e.g., TEST_James, TEST_Michael)
Last Name format: random name + _ + email prefix (e.g., Smith_test2610)
Date of Birth: Random MM/DD/YYYY (18-100 years old)

Random First Names: James, Michael, David, Robert, William, Richard, Joseph, Thomas, Charles, Daniel
Random Last Names: Smith, Johnson, Williams, Brown, Jones, Garcia, Miller, Davis, Rodriguez, Martinez

---

## Locators Reference

### PAGE 1 - Personal Information

First Name = input[name="input_3"]
Last Name = input[name="input_4"]
Date of Birth = input[name="input_5"]
Email = input[name="input_6"]
Mobile Phone = input[name="input_21"]
Active Military = select[name="input_9"]
SSN = input[name="input_11"]
Driver License = input[name="input_12"]
State = select[name="input_13"]
Promo Code = input[name="input_15"]
Submit Button = #gform_submit_button_6

### PAGE 2 - Address & Income

Home Address = input[name="input_3"]
Suite/Apt = input[name="input_4"]
City = input[name="input_6"]
State = select[name="input_7"]
Zip Code = input[name="input_8"]
Net Monthly Income = input[name="input_10"]
Income Source = select[name="input_11"]
Employer Name = input[name="input_12"]
Payment Frequency = select[name="input_17"]
Next Pay Date = input[name="input_18"]
Additional Monthly Income = input[name="input_15"]
Additional Income Source = select[name="input_19"]
Submit Button = #gform_submit_button_7

### PAGE 3 - Bank & Loan Information

Bank Name = #input_8_3
Bank Routing Number = #input_8_4
Checking Account Number = #input_8_5
Valid Checking Account = #input_8_7
Years (with bank) = #input_8_10
Months (with bank) = #input_8_11
Direct Deposit = #input_8_8
Borrow Amount = #input_8_24
Terms Consent = input[name="input_18.1"]
SMS Notifications = input[name="input_19.1"]
Submit Button = #gform_submit_button_8

### PAGE 4 - Card Information

Name on Card = input[name="input_1"]
Card Number (inside iframe) = #text_value

---

## Test Data Files

### apply_test_data.json (tests/data/apply_test_data.json)

email: test2610@test.com
ssn: 114-14-2610

---

## Login Test Accounts with Different Status

### Paid User
Email: testing1816@test.com
Password: 1816

### Active User
Email: test2322@test.com
Password: 2322

### Written Off User
Email: test2533@test.com
Password: 2533

### Past Due User
Email: test@testlimit.com
Password: 5555

### Pending User
Email: test2610@test.com
Password: test2610@test.com
