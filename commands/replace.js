var themekit = require('../includes/themekit.js');

module.exports = {
  help: function() {
    process.stdout.write('placeholder for slate help command...\n');
  },
  command: function() {
    // add environment param
    themekit.test()
      .then(function() {
        return themekit.commands(['replace']);
      });
  }
};
