var themekit = require('../includes/themekit.js');

module.exports = {
  command: function() {
    // add environment param
    themekit.test()
      .then(function() {
        return themekit.commands(['replace']);
      });
  }
};
