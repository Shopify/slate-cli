var findRoot = require('find-root');
var utils = require('../../includes/utils.js');

module.exports = {
  help: function() {
    process.stdout.write('placeholder for slate help command...\n');
  },
  command: function(args, options) {
    var themeRoot = findRoot(process.cwd());
    var scriptArgs = options.nosync
      ? ['watch-nosync']
      : ['watch'];
    utils.runScript(themeRoot, scriptArgs);
  }
};
