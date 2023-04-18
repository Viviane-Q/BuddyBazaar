module.exports = {
    testTimeout: 50000,

    projects: [
        {
            displayName: 'spec',
            testMatch: ['**/*.spec.ts'],
        },
        {
            displayName: 'e2e',
            testMatch: ['**/*.test.js'],
        },
    ],
};
