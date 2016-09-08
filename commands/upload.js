var msg = require('../includes/messages.js');
var commands = require('node-themekit').commands;

module.exports = {
  command: function(args, options) {
    if (args.length === 0) {
      return process.stdout.write(msg.noFiles());
    } else {
      if (options.environment) {
        return commands(['upload', '-env', options.environment].concat(args));
      } else {
        return commands(['upload'].concat(args));
      }
    }
  }
};
