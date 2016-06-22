var pkg = require('../../package.json');

module.exports = {
  versionInfo: function() {
    return 'slate-cli: version ' + pkg.version + ' - Shopify Theme Development Framework  \n';
  },

  noGenerator: function() {
    return 'No generator specified, please use one of the following commands:\n ' + this.generatorsList();
  },

  unknownGenerator: function() {
    return 'Unknown generator, please use one of the following commands:\n' + this.generatorsList();
  },

  generatorsList: function() {
    return ' slate new theme\n';
  },

  unknownInstaller: function() {
    return 'Unknown installer, please use one of the following commands:\n' + this.installersList();
  },

  installersList: function() {
    return ' slate setup themekit\n slate setup bundler\n';
  }
};
