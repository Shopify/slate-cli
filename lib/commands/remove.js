var msg = require('../includes/messages.js');
var themekit = require('../includes/themekit.js');

module.exports = function(args) {
  if (args.length === 0) {
    process.stdout.write('No files provided...\n');
  } else {
    process.stdout.write('Removing...\n');
    process.stdout.write('Cwd:' + process.cwd() + '\n');
    themekit.commands(['remove'].concat(args));
  }
};
