import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config as dotenvConfig } from 'dotenv';
import process from 'process';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenvConfig();

const envInfo = {
    'Tester': 'grgks',
    'Browser': 'Chrome',
    'Environment': process.env.TEST_ENV || 'Local',
    'Base URL': process.env.BASE_URL || 'http://localhost:5173',
    'Backend URL':process.env.BACKEND_URL || 'http://localhost:8080',
    'Node Version': process.version,
    'Test Date': new Date().toLocaleString('el-GR')
};

const allureResultsDir = path.join(process.cwd(), 'allure-results');

if (!fs.existsSync(allureResultsDir)) {
    fs.mkdirSync(allureResultsDir, { recursive: true });
}

const envContent = Object.entries(envInfo)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

fs.writeFileSync(
    path.join(allureResultsDir, 'environment.properties'),
    envContent
);

console.log('Allure environment info created');