var findRoot = require('find-root');
var utils = require('../../includes/utils.js');

module.exports = {
  command: function(args, options) {
    var themeRoot = findRoot(process.cwd());
    
    if (options.active) {
      process.env.activeTheme = options.active; // eslint-disable-line no-process-env
    }
    
    if (options.environment) {
      process.env.tkEnvironments = options.environment.split(/\s*,\s*|\s+/)[0]; // eslint-disable-line no-process-env
    }
    
    var scriptArgs = options.nosync
      ? ['watch-nosync']
      : ['watch'];
      
    utils.runScript(themeRoot, scriptArgs);
  },
  help: function() {
    utils.logHelpMsg([
      'Usage: slate watch [--options]',
      '',
      'Start a server to watch for changes in the theme, using Browsersync at localhost:3000 to auto-refresh the browser when files change.',
      '',
      'Options:',
      '',
      '  -a, --active       overwrite active theme if theme_id is invalid',
      '  -e, --environment  deploy to a specific environment',
      '  -n, --nosync       watch for changes without using Browsersync'
    ]);
  }
};
