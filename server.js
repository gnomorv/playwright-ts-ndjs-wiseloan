const express = require('express');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Serve frontend.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend.html'));
});

// Path to test data file
const testDataPath = path.join(__dirname, 'tests', 'data', 'apply_test_data.json');

// API endpoint to get current test data
app.get('/api/test-data', (req, res) => {
    try {
        if (fs.existsSync(testDataPath)) {
            const data = JSON.parse(fs.readFileSync(testDataPath, 'utf-8'));
            res.json(data);
        } else {
            res.json({ email: '', ssn: '' });
        }
    } catch (error) {
        console.error('Error reading test data:', error);
        res.status(500).json({ error: 'Failed to read test data' });
    }
});

// API endpoint to update test data
app.post('/api/update-test-data', (req, res) => {
    try {
        const { email, ssn } = req.body;

        // Validate input
        if (!email || !ssn) {
            return res.status(400).send('Email and SSN are required');
        }

        // Validate SSN format
        const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
        if (!ssnRegex.test(ssn)) {
            return res.status(400).send('Invalid SSN format. Use XXX-XX-XXXX');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send('Invalid email format');
        }

        // Create data directory if it doesn't exist
        const dataDir = path.dirname(testDataPath);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Write test data to JSON file
        const testData = { email, ssn };
        fs.writeFileSync(testDataPath, JSON.stringify(testData, null, 2));

        console.log(`✓ Test data updated: ${email}`);
        res.json({ success: true, message: 'Test data updated successfully' });
    } catch (error) {
        console.error('Error updating test data:', error);
        res.status(500).send('Failed to update test data: ' + error.message);
    }
});

// API endpoint to run Playwright test
app.post('/api/run-test', (req, res) => {
    try {
        console.log('Starting Playwright test...');

        // Run the Playwright test with properly quoted file path
        // Use spawn instead of execSync to allow browser to display
        const test = spawn('npx', ['playwright', 'test', 'tests/apply-promocode.spec.ts', '--project=chromium', '--headed'], {
            cwd: __dirname,
            stdio: 'inherit',
            detached: true
        });

        let outputData = '';

        test.on('close', () => {
            console.log('✓ Test completed successfully');
            res.json({
                success: true,
                message: 'Test completed successfully',
                output: outputData
            });
        });

        test.on('error', (error) => {
            console.error('Error running test:', error.message);
            res.status(500).json({
                success: false,
                error: error.message,
                output: ''
            });
        });
    } catch (error) {
        console.error('Error running test:', error.message);
        res.status(500).json({
            success: false,
            error: error.message,
            output: ''
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`\n╔═══════════════════════════════════════╗`);
    console.log(`║  🏦 Wise Loan Test Runner Started    ║`);
    console.log(`║  Open: http://localhost:${PORT}        ║`);
    console.log(`╚═══════════════════════════════════════╝\n`);
});
