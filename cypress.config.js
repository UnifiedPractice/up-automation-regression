const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            return {
                browsers: config.browsers.filter(
                    (b) => b.family === 'chromium' && b.name !== 'electron'
                ),
            }
        },
    }
})
