var commands = require('node-themekit').commands;

module.exports = {
  command: function(args, options) {
    if (options.environment) {
      return commands(['replace', '-env', options.environment].concat(args));
    } else {
      return commands(['replace'].concat(args));
    }
  }
};
