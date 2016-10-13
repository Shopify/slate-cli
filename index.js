#!/usr/bin/env node

const join = require('path').join;
const spawn = require('child_process').spawn;
const debug = require('debug')('slate-cli');
const minimist = require('minimist');
const themeRoot = require('find-root')(process.cwd());

const pkg = require(join(themeRoot, 'package.json'));
const commands = minimist(process.argv.slice(2))._;

if ('dependencies' in pkg && 'slate-tools' in pkg.dependencies) {
  debug('✓ This package.json has required dependency slate-tools');
} else {
  throw new Error('Missing dependency slate-tools. Try `npm install slate-tools`.');
}

function newTheme() {
  console.log('  I wish I could make a new theme...');
  return;
}

debug(process.argv.slice(2));

if (commands.length > 0 && commands[0] === 'new' && commands[1] === 'theme') {
  console.log('  This may take some time...');
  console.log('');
  newTheme();
} else {
  debug('Searching slate-tools...');

  spawn('slate-tools', process.argv.slice(2), {
    stdio: 'inherit'
  });
}
