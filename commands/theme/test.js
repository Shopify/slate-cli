var findRoot = require('find-root');
var utils = require('../../includes/utils.js');

module.exports = {
  help: function() {
    process.stdout.write('placeholder for slate help command...\n');
  },
  command: function() {
    var themeRoot = findRoot(process.cwd());
    utils.runScript(themeRoot, ['test']);
  }
};
