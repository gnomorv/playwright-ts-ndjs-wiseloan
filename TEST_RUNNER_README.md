# Wise Loan Test Runner - Frontend Interface

This is a web-based frontend to manage test data and trigger Playwright tests for the Wise Loan application.

## Files Created

- **frontend.html** - Beautiful web interface for managing test data and running tests
- **server.js** - Node.js Express backend server
- **tests/data/apply_test_data.json** - Test credentials (email and SSN)

## Setup & Installation

### 1. Install Dependencies

Make sure you have Node.js installed, then install express:

```bash
npm install express
```

### 2. Start the Server

From the project root directory, run:

```bash
node server.js
```

You should see:
```
╔═══════════════════════════════════════╗
║  🏦 Wise Loan Test Runner Started    ║
║  Open: http://localhost:3000         ║
╚═══════════════════════════════════════╝
```

### 3. Open the Frontend

Open your browser and navigate to:
```
http://localhost:3000
```

## How to Use

1. **Enter Test Credentials**
   - Email: Test email address (e.g., `test2490@test.com`)
   - SSN: Social Security Number in format `XXX-XX-XXXX` (e.g., `114-14-2490`)

2. **Update Data Button**
   - Click "Update Data" to save the credentials to `apply_test_data.json`
   - The system will validate the format and confirm success

3. **Run Test Button**
   - Click "Run Test" to trigger the Playwright test
   - The test will execute and display output in real-time
   - Screenshots will be saved in the `screenshots/` directory

## Features

✅ **Real-time Data Loading** - Current test data loads automatically on page load
✅ **Form Validation** - Email and SSN format validation before submission
✅ **Status Messages** - Success/error feedback for all operations
✅ **Test Output Display** - View test execution output directly in the UI
✅ **Disabled State** - Run button disabled until test data is updated
✅ **Beautiful UI** - Modern, responsive design with smooth animations
✅ **Error Handling** - Comprehensive error handling on both frontend and backend

## API Endpoints

### GET /api/test-data
Retrieves current test credentials from `apply_test_data.json`

**Response:**
```json
{
  "email": "test2490@test.com",
  "ssn": "114-14-2490"
}
```

### POST /api/update-test-data
Updates test credentials in `apply_test_data.json`

**Request Body:**
```json
{
  "email": "test2490@test.com",
  "ssn": "114-14-2490"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Test data updated successfully"
}
```

### POST /api/run-test
Executes the Playwright test in Chromium browser

**Response:**
```json
{
  "success": true,
  "message": "Test completed successfully",
  "output": "test output here..."
}
```

## File Structure

```
playwright-ts-ndjs-WISELOAN/
├── frontend.html                    # Web UI
├── server.js                        # Backend server
├── tests/
│   ├── open-site-print-title.spec.ts   # Playwright test
│   ├── fixtures.ts                     # Test fixtures
│   └── data/
│       ├── apply_test_data.json        # Test credentials
│       └── email.txt                   # Legacy email file
├── screenshots/                     # Test screenshots output
└── playwright.config.ts
```

## Test Data Format

The `apply_test_data.json` file has the following structure:

```json
{
  "email": "test2490@test.com",
  "ssn": "114-14-2490"
}
```

### Email Format
- Standard email format: `user@domain.com`

### SSN Format
- Must be in format: `XXX-XX-XXXX`
- Example: `114-14-2490`

## Notes

- The test runner automatically uses Chromium browser
- Screenshots are saved in the `screenshots/` directory with naming pattern: `{email}_application_{number}.png`
- The random name generation (from fixtures.ts) occurs each test run
- Test data is persisted in JSON for consistency across runs

## Troubleshooting

**Port Already in Use:**
```bash
node server.js --port 3001
```

**Playwright Not Installed:**
```bash
npm install -D @playwright/test
```

**Test Fails:**
- Check browser console for errors (F12)
- Review test output in the UI
- Check `screenshots/` folder for visual evidence

## Next Steps

To enhance this further, you could add:
- Test history/logs
- Multiple test scenarios
- Scheduled test runs
- Test reports generation
- Authentication for production use
