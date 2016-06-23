var msg = require('../includes/messages.js');
var themekit = require('../includes/themekit.js');

module.exports = function() {
  // add environment param
  process.stdout.write('Replacing...\n');
  process.stdout.write('Cwd:' + process.cwd() + '\n');
  themekit.commands(['replace']);
};
