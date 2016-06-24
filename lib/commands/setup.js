var msg = require('../includes/messages.js');
var themekit = require('../includes/themekit.js');

function setupThemeKit() {
  return themekit
    .install()
    .then(function() {
      process.stdout.write(msg.installerPath('ThemeKit', themekit.path()));
    })
    .catch(function(error) {
      process.sterr.write(msg.installerFailed('ThemeKit', error));
    });
}

module.exports = function(args) {
  if (args.length === 0) {
    setupThemeKit()
      .then(function() {
        process.stdout.write(msg.installerSuccess('slate-cli'));
      });

  } else {
    switch (args[0]) {
    case 'themekit':
      setupThemeKit()
        .then(function() {
          process.stdout.write(msg.installerSuccess('slate-cli'));
        });
      break;

    default:
      process.stdout.write(msg.unknownInstaller());
    }
  }
};
