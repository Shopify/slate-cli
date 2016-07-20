var path = require('path');
var slateRoot = path.resolve(__dirname, '../../..');
var shopifySlatePath = path.join(slateRoot, '/node_modules/Slate');

module.exports = {
  _getScaffoldPath: function() {
    return shopifySlatePath;
  },

  /**
   * Uses node_modules to get scaffold and then writes it to the destination path
   *
   * @param scaffold {String} - npm install name
   * @param destination {String} - the local destination path to write scaffold
   */
  _copyScaffold: function(scaffold, destination) {
    var glob = [
      scaffold + '/**',
      '!' + scaffold + '/.git/**',
      '!' + scaffold + '/node_modules/**',
      '!' + scaffold + '/bower_components/**',
      '!' + scaffold + '/jsdoc-conf.json',
      '!' + scaffold + '/docs/**',
      '!' + scaffold + '/package.json',
      '!' + scaffold + '/tasks/includes/config.js',
      '!' + scaffold + '/generators/**'
    ];

    this.fs.copy(glob, destination, {
      globOptions: {
        dot: true
      }
    });

    this.fs.copyTpl(
      path.join(scaffold, '/generators/config.yml.ejs'),
      path.join(destination, '/config.yml'), {
        environments: this.environments
      }
    );

    this.fs.copyTpl(
      path.join(scaffold, '/generators/package.json.ejs'),
      path.join(destination, '/package.json'), {
        name: this.dirname,
        hasGitRepo: this.initGit,
        repositoryUrl: this.repositoryUrl
      }
    );

    this.fs.copyTpl(
      path.join(scaffold, '/generators/tasks/includes/config.js.ejs'),
      path.join(destination, '/tasks/includes/config.js'), {
        env: this.defaultEnv
      }
    );
  }
};
