var msg = require('../includes/messages.js');
var themekit = require('../includes/themekit.js');

module.exports = {
  help: function() {
    process.stdout.write('placeholder for slate help command...\n');
  },
  command: function(args) {
    if (args.length === 0) {
      process.stdout.write(msg.noFiles());
    } else {
      themekit.test()
        .then(function() {
          return themekit.commands(['upload'].concat(args));
        });
    }
  }
};
