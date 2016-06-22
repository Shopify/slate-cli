var path = require('path');
//var utils = require('../includes/utils.js');
var msg = require('../includes/messages.js');
var binWrapper = require('../includes/themekit.js');
var themekit = binWrapper.path();
var spawn = require('child_process').spawn;
var cwd = path.resolve(process.cwd());
// var slateRoot = path.resolve(__dirname, '../..');


function setupThemeKit() {
  binWrapper.run(['version'], function(error) {
    if (error) {
      process.stderr.write('Failed to install themekit\n');
      process.stderr.write(error + '\n');
    } else {
      process.stdout.write('Successfully installed themekit\n');
      process.stdout.write('ThemeKit path: ' + themekit + '\n');
    }
  });

  // TODO: setup in python, rewrite to JS?
  // utils.runScript(slateRoot, ['setup-themekit']);
}

// TODO: Remove runThemeKit, only here for testing
function runThemeKit(command, directory) {
  var runner = spawn(themekit, [command, directory]);

  runner.stdout.on('data', function(data) {
    process.stdout.write(data);
  });

  runner.stderr.on('data', function(data) {
    process.stdout.write('Error: \n');
    process.stdout.write(data);
  });

  runner.on('close', function(code) {
    process.stdout.write('child process exited with code ' + code + '\n');
  });
}

module.exports = function(args) {
  if (args.length === 0) {
    process.stdout.write('Running complete setup...\n');
    setupThemeKit();
  } else {
    switch (args[0]) {
    case 'themekit':
      process.stdout.write('Running themekit setup...\n');
      setupThemeKit();
      break;

    case 'test':
      process.stdout.write('Running themekit test...\n');
      runThemeKit('version', cwd);
      break;

    case 'bundler':
      process.stdout.write('Running bundler setup...\n');
      break;

    default:
      process.stdout.write(msg.unknownInstaller());
    }
  }
};
