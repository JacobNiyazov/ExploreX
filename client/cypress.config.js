const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require('cy-verify-downloads');
module.exports = defineConfig({
  e2e: {
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      on('task', verifyDownloadTasks);
    },
  },
  projectId: 's39qm2'
});