var themekit = require('../includes/themekit.js');

module.exports = {
  command: function(args, opts) {
    themekit.test()
      .then(function() {
        if (opts.environment) {
          return themekit.commands(['replace', '-env', opts.environment].concat(args));
        } else {
          return themekit.commands(['replace'].concat(args));
        }
      });
  }
};
