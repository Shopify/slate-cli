var NodeGit = require("nodegit");
var Promise = require("bluebird");
var path = require('path');
var rimraf = Promise.promisify(require('rimraf'));
var _ = require('lodash');

function checkCertificate() {
  return 1;
}

function getCredentials (url, userName) {
  return NodeGit.Cred.sshKeyFromAgent(userName);
}

module.exports = {
  _cloneRepo: function (repo, destination) {
    var done = this.async();
    var remoteDir = Promise.promisify(this.remoteDir, {context: this});
    var cache = path.join(this.cacheRoot(), repo);
    var url = 'git@github.com:' + repo + '.git';
    var options = {};

    _.set(options, 'fetchOpts.callbacks.certificateCheck', checkCertificate);
    _.set(options, 'fetchOpts.callbacks.credentials', getCredentials);

    return rimraf(cache)
      .then(function() {
        return NodeGit.Clone(url, cache, options)
      })
      .then(function() {
        return remoteDir(cache);
      })
      .then(function(remote) {
        remote.directory('.', destination);
        done();
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
