import { config as dotenvConfig } from 'dotenv';

// Load environment variables
dotenvConfig();

export const config = {
    baseUrl: process.env.BASE_URL || 'http://localhost:5173',
    backendUrl: process.env.BACKEND_URL || 'http://localhost:8080',
    timeout: parseInt(process.env.TIMEOUT || '10000'),
    headless: process.env.HEADLESS === 'true',

    testUser: {
        username: process.env.TEST_USERNAME || '',  // or keno se περίπτωση να μην υπάρχει να μην έχουμε undefined
        password:  process.env.TEST_PASSWORD || ''
    }
};