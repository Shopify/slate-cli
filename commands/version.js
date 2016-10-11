var Promise = require('bluebird');
var msg = require('../includes/messages.js');
var utils = require('../includes/utils.js');
var command = Promise.promisify(require('@shopify/themekit').command);

module.exports = {
  command: function() {
    return command({args: ['version']})
      .then(function() {
        process.stdout.write(msg.versionInfo());
      });
  },
  help: function() {
    utils.logHelpMsg([
      'Usage: slate version',
      '',
      'Output the current version of Slate CLI installed on your system.'
    ]);
  }
};
