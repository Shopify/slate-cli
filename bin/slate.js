#!/usr/bin/env node

var _ = require('lodash');
var parseOptions = require('nopt');
var slate = require('../index.js');
// var pkg = require('../package.json');
// require('update-notifier')({packageName: pkg.name,packageVersion: pkg.version}).notify();

/* eslint-disable quote-props ,id-length */
var validOpts = {
  'version': Boolean,
  'manual': Boolean, // flag for manual deploy (used with deploy command)
  'environment': [null, String],
  'nosync': Boolean,
  'help': Boolean
};

var shorthand = {
  v: '--version',
  m: '--manual',
  e: '--environment',
  ns: '--nosync',
  h: '--help'
};

// filtered list of valid options that were passed w/ the command
var opts = parseOptions(validOpts, shorthand);
if (opts.argv.remain[0]) {
  var command = opts.argv.remain[0]; // the first arg in the `remain` array is the command
  var args = opts.argv.remain.slice(1); // the remaining args to be passed with the command

  if (_.isFunction(slate[command].command)) {
    if (opts.help) {
      slate[command].help();
    } else {
      slate[command].command(args, opts);
    }
  } else {
    slate.help();
  }

// No args were passed...
} else {
  if (opts.version) {
    slate.version();
  } else {
    slate.help();
  }
}
