import { test as base } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

type TestFixtures = {
  testData: {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
};

function getRandomFirstName(): string {
  const firstNames = [
    'James', 'Michael', 'David', 'Robert', 'William',
    'Richard', 'Joseph', 'Thomas', 'Charles', 'Daniel'
  ];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

function getRandomLastName(): string {
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones',
    'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'
  ];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

function getRandomDateOfBirth(): string {
  // Generate a date between 18-65 years old
  const today = new Date();
  const minAge = 18;
  const maxAge = 100;

  const minYear = today.getFullYear() - maxAge;
  const maxYear = today.getFullYear() - minAge;

  const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1; // Use max 28 to avoid invalid dates

  const formattedMonth = String(month).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');

  return `${formattedMonth}/${formattedDay}/${year}`;
}

export const test = base.extend<TestFixtures>({
  testData: async ({}, use) => {
    // Read test data from apply_test_data.json
    const testDataFilePath = path.join(__dirname, 'data', 'apply_test_data.json');
    const testDataFile = JSON.parse(fs.readFileSync(testDataFilePath, 'utf-8'));

    // Get current counter and generate dynamic email/ssn
    const counter = testDataFile.counter;
    const email = `${testDataFile.emailBase}${counter}@test.com`;
    const ssn = `${testDataFile.ssnBase}${counter}`;

    // Extract email without domain
    const emailWithoutDomain = email.split('@')[0];

    // Generate random names
    const randomFirstName = getRandomFirstName();
    const randomLastName = getRandomLastName();

    // Format names:
    // firstName: "TEST_" + random dummy name (e.g., "TEST_James")
    // lastName: random last name + "_" + email with no domain (e.g., "Smith_test2612")
    const firstName = `TEST_${randomFirstName}`;
    const lastName = `${randomLastName}_${emailWithoutDomain}`;

    const data = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: getRandomDateOfBirth(),
    };

    await use(data);

    // Increment counter for next test run
    testDataFile.counter = counter + 1;
    testDataFile.email = `${testDataFile.emailBase}${counter + 1}@test.com`;
    testDataFile.ssn = `${testDataFile.ssnBase}${counter + 1}`;
    fs.writeFileSync(testDataFilePath, JSON.stringify(testDataFile, null, 2));
  },
});

export { expect } from '@playwright/test';
