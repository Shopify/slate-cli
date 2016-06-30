var NodeGit = require('nodegit');
var Promise = require('bluebird');
var path = require('path');
var rimraf = Promise.promisify(require('rimraf'));
var _ = require('lodash');

module.exports = {
  _cloneRepo: function(repo, destination) {
    var cache = path.join(this.cacheRoot(), repo);
    // TODO: should we be forcing them to use GitHub??? YES
    var url = 'git@github.com:' + repo + '.git';
    var options = {};

    _.set(options, 'fetchOpts.callbacks.certificateCheck', checkCertificate);
    _.set(options, 'fetchOpts.callbacks.credentials', getCredentials);

    return rimraf(cache)
      .then(function() {
        return NodeGit.Clone(url, cache, options);
      })
      .then(function() {
        var glob = [
          cache + '/**',
          '!' + cache + '/.git/**',
          '!' + cache + '/jsdoc-conf.json',
          '!' + cache + '/docs/**',
          '!' + cache + '/package.json',
          '!' + cache + '/tasks/includes/config.js'
        ];

        this.fs.copy(glob, destination, {
          globOptions: {
            dot: true
          }
        });
      }.bind(this));
  },
  _initRepo: function(pathToRepo, isBare) {
    return NodeGit.Repository.init(pathToRepo, isBare);
  },
  _addRemote: function(repo, name, url) {
    return NodeGit.Remote.create(repo, name, url)
      .catch(function(err) {
        this.log(err);
      }.bind(this));
  }
};

function checkCertificate() {
  return 1;
}

function getCredentials(url, userName) {
  return NodeGit.Cred.sshKeyFromAgent(userName);
}
