const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:19006",
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // what could be here? : https://nodejs.org/api/process.html#process_process_events
    },
  },
  video: false,
});
