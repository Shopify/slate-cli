var Promise = require('bluebird');
var msg = require('../includes/messages.js');
var utils = require('../includes/utils.js');
var install = Promise.promisify(require('shopify-themekit').install);

module.exports = {
  command: function() {
    setupThemeKit()
      .then(function() {
        process.stdout.write(msg.installerSuccess('slate-cli'));
      });
  },
  help: function() {
    utils.logHelpMsg([
      'Usage: setup',
      '',
      'Install framework dependencies.'
    ]);
  }
};

/**
 * Uses ThemeKit include to install ThemeKit and write the
 * status of the install.
 *
 * @returns {Promise} - The ThemeKit install
 * @private
 */
function setupThemeKit() {
  return install()
    .then(function(binPath) {
      process.stdout.write(msg.installerPath('ThemeKit', binPath));
    })
    .catch(function(error) {
      process.stderr.write(msg.installerFailed('ThemeKit', error));
      process.exit(5); // eslint-disable-line no-process-exit
    });
}
