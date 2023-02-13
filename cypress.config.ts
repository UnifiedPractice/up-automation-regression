import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: "sy96yg",
  pageLoadTimeout: 140000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    supportFile: false,
    specPattern: 'cypress/e2e/Tests/UP-802.spec.ts',
  },
})
