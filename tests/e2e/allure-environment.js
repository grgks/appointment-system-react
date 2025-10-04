import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envInfo = {
    'Tester': 'grgks',
    'Browser': 'Chrome',
    'Environment': 'Local',
    'Base URL': 'http://localhost:5173',
    'Backend URL': 'http://localhost:8080',
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

console.log('✅ Allure environment info created');