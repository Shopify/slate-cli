var msg = require('../includes/messages.js');

module.exports = {
  help: function() {
    process.stdout.write('placeholder for slate help command...\n');
  },
  command: function() {
    process.stdout.write(msg.versionInfo());
  }
};
