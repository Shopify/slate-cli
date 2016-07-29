var msg = require('../includes/messages.js');
var utils = require('../includes/utils.js');
var themekit = require('../includes/themekit.js');

module.exports = {
  help: function() {
    utils.logHelpMsg([
      // how to use this command
      '  Usage: setup',
      '  ',
      // description of what the command does
      '  Installs framework dependencies',
      '  ',
      // options available on the command
      '    themekit: installs ThemeKit',
    ]);
  },
  command: function() {
    setupThemeKit()
      .then(function() {
        process.stdout.write(msg.installerSuccess('slate-cli'));
      });
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
  return themekit
    .install()
    .then(function() {
      process.stdout.write(msg.installerPath('ThemeKit', themekit.path()));
    })
    .catch(function(error) {
      process.sterr.write(msg.installerFailed('ThemeKit', error));
    });
}
