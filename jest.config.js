export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.ts'],
    moduleFileExtensions: ['ts', 'js'],
    verbose: true,
    testTimeout: 30000, // 30 seconds for E2E tests
    collectCoverageFrom: [
        'tests/**/*.ts',
        '!tests/**/*.test.ts'
    ],
    reporters: [
        'default',
        [
            'jest-html-reporter',
            {
                pageTitle: 'E2E Test Report',
                outputPath: 'reports/test-report.html',
                includeFailureMsg: true,
                includeConsoleLog: true,
                dateFormat: 'yyyy-mm-dd HH:MM:ss'
            }
        ],
        [
            'jest-allure2-reporter',
            {
                resultsDir: 'allure-results'
            }
        ]
    ]
};