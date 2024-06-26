import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  projectId: "hqze8x",
  pageLoadTimeout: 140000,
  retries: {
    runMode: 8,
    openMode: 8
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    supportFile: false,
    specPattern: 'cypress/e2e/Tests/*.spec.ts',
  },
})

