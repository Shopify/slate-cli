var msg = require('../includes/messages.js');
var themekit = require('../includes/themekit.js');

module.exports = {
  command: function(args, opts) {
    if (args.length === 0) {
      process.stdout.write(msg.noFiles());
    } else {
      themekit.test()
        .then(function() {
          if (opts.environment) {
            return themekit.commands(['upload', '-env', opts.environment].concat(args));
          } else {
            return themekit.commands(['upload'].concat(args));
          }
        });
    }
  }
};
