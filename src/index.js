#!/usr/bin/env node

import {readdirSync} from 'fs';
import {join, normalize} from 'path';
import {green, red} from 'chalk';
import program from 'commander';
import {getThemeRoot, checkForSlateTools} from './theme';

const workingDirectory = process.cwd();

// Global commands
require('./commands/new').default(program);
require('./commands/version').default(program);

// Dynamically add in theme commands
const themeRoot = getThemeRoot(workingDirectory);

if (themeRoot && checkForSlateTools(themeRoot)) {
  const slateToolsCommands = join(themeRoot, normalize('/node_modules/@shopify/slate-tools/lib/commands'));

  readdirSync(slateToolsCommands)
    .filter((file) => ~file.search(/^[^\.].*\.js$/))
    .forEach((file) => require(join(slateToolsCommands, file)).default(program));

  console.log('');
  console.log(`  Slate theme: ${green('✓')} - inside theme directory`);
  console.log('');
} else {
  console.log('');
  console.log(`  Slate theme: ${red('✗')} - outside theme directory`);
  console.log('');
}

// Custom help
program.on('--help', () => {
  console.log('  Troubleshooting:');
  console.log('');
  console.log('    If you encounter any issues, here are some preliminary steps to take:');
  console.log('      - `git pull` latest version of Slate CLI.');
  console.log('      - `npm install` to make sure you have all the dependencies.');
  console.log('      - `npm link` to make sure that the symlink exists and Slate CLI is globally installed.');
  console.log('');
});

// Unknown command
program.on('*', () => {
  console.log('');
  console.log(`  Unknown command ${program.args.join(' ')}.`);
  console.log('');
  program.help();
});

program.parse(process.argv);
