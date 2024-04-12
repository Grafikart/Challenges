import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 1000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
      baseUrl: 'http://localhost:8000',
  },
});
