var generators = require('yeoman-generator');
var Promise = require('bluebird');
var NodeGit = require("nodegit");
var path = require('path');
var fs = require('fs');

module.exports = {
  _fetchRepo: function(repo) {
    var remoteDir = Promise.promisify(this.remoteDir, {context: this});
    var stat = Promise.promisify(fs.stat);
    var cache = path.join(this.cacheRoot(), repo);

    return stat(cache)
      .then(function() {
        console.log("Is Cached");
        return remoteDir(cache);
      }.bind(this))
      .catch(function() {
        console.log("Is Not Cached");
        return this._cloneRepo(repo, cache).then(function() {
          return remoteDir(cache);
        }.bind(this));
      }.bind(this));
  },

  _cloneRepo: function (repo, cache) {
    var url = 'git@github.com:' + repo + '.git';
    var options = {
      fetchOpts: {
        callbacks: {
          certificateCheck: function() {
            return 1;
          },
          credentials: function(url, userName) {
            return NodeGit.Cred.sshKeyFromAgent(userName);
          }
        }
      }
    };

    return NodeGit.Clone(url, cache, options)
      .catch(function(err) {
        console.log(err);
      });
  }
};
