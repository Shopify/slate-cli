var Promise = require('bluebird');
var msg = require('../includes/messages.js');
var command = Promise.promisify(require('@shopify/themekit').command);

module.exports = {
  command: function(args, options) {
    if (args.length === 0) {
      return process.stdout.write(msg.noFiles());
    } else {
      if (options.environment) {
        return command({args: ['remove', '-env', options.environment].concat(args)});
      } else {
        return command({args: ['remove'].concat(args)});
      }
    }
  }
};
