export const config = {
    baseUrl: 'http://localhost:5173',
    backendUrl: 'http://localhost:8080',
    timeout: 10000,
    headless: process.env.HEADLESS === 'true',

    testUser: {
        username: 'admin21',
        password: 'Admin3Test123!'
    }
};