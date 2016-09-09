var Promise = require('bluebird');
var command = Promise.promisify(require('node-themekit').command);

module.exports = {
  command: function(args, options) {
    if (options.environment) {
      return command({args: ['replace', '-env', options.environment].concat(args)});
    } else {
      return command({args: ['replace'].concat(args)});
    }
  }
};
