/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 50000,
  transform: {
    "^.+\\.js?$": "ts-jest",
    "^.+\\.ts?$": "ts-jest",
  },
  setupFiles: ["dotenv/config"],
};
