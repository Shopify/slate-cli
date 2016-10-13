#!/usr/bin/env node

const spawn = require('child_process').spawn;
const debug = require('debug')('slate-cli');
const minimist = require('minimist');

const commands = minimist(process.argv.slice(2))._;

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
  const cli = spawn('slate-tools', process.argv.slice(2));

  let errors = '';

  cli.stdout.setEncoding('utf8');
  cli.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  cli.stderr.setEncoding('utf8');
  cli.stderr.on('data', (data) => {
    errors += data;
  });

  cli.on('error', (err) => {
    process.stderr.write(err);
  });

  cli.on('close', () => {
    if (errors) {
      process.stderr.write(errors);
    }
  });
}
