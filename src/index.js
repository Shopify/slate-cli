#!/usr/bin/env node

import fs from 'fs';
import {resolve} from 'path';
import {exec} from 'child_process';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

console.log(argv);
process.exit(1);

function TOOLS_CLI_PATH() {
  return resolve(
    process.cwd(),
    'node_modules',
    '.bin',
    'slate-build.js',
  );
}

function newTheme() {
  return;
}

function run(root, argv) {
  exec('npm install --save --save-exact ' + getInstallPackage(rnPackage), function(e, stdout, stderr) {
    if (e) {
      console.log(stdout);
      console.error(stderr);
      console.error('`npm install --save --save-exact react-native` failed');
      process.exit(1);
    }

    cli = require(CLI_MODULE_PATH());
    cli.init(root, projectName);
  });
}

let cli;
const cliPath = TOOLS_CLI_PATH();

if (fs.existsSync(cliPath)) {
  cli = require(cliPath);
}

const commands = argv._;

if (cli) {
  cli.run();
} else {
  if (commands.length === 0) {
    console.error('You did not pass any commands, did you mean to run `slate new theme`?');
    process.exit(1);
  }

  switch (commands[0]) {
    case 'new':
      if (commands[1]) {
        console.log('This may take some time...');
        newTheme();
      } else {
        console.error('Usage: slate new theme');
        process.exit(1);
      }
      break;
    default:
      console.error(`Command ${commands[0]} unrecognized. Make sure that you have run \`npm install\` and that you are inside a slate theme.`);
      process.exit(1);
      break;
  }
}
