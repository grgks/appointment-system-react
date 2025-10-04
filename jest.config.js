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
    ]
};