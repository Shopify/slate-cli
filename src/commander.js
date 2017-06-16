import {join, normalize} from 'path';
import {yellow, red} from 'chalk';
import figures from 'figures';
import updateNotifier from 'update-notifier';
import program from '@shopify/commander';

/**
 * Output information if/else slate theme directory.
 *
 * @param {boolean} isSlateTheme - Whether in slate theme or not.
 */
function outputSlateThemeCheck(isSlateTheme) {
  if (isSlateTheme) {
    return;
  }

  console.log('');
  console.log(yellow(`  ${figures.cross} You are not in a slate theme directory`));
  console.log('    For a full list of commands, generate a new theme or switch to an existing slate theme directory');
  console.log('');
}

const currentDirectory = __dirname;
const pkg = require(join(currentDirectory, normalize('../package.json')));

updateNotifier({
  pkg,
  // 1 week
  updateCheckInterval: 1000 * 60 * 60 * 24 * 7,
}).notify();

// Global commands
require('./commands/theme').default(program);
require('./commands/migrate').default(program);
require('./commands/version').default(program);

// Dynamically require tools from theme
const tools = require('./tools');

if (tools.isSlateTheme()) {
  tools.getCommands().forEach((file) => require(join(tools.getPath(), file)).default(program));
}

// Custom help
program.on('--helpStart', () => {
  outputSlateThemeCheck(tools.getIsSlateTheme());
});

program.on('--helpEnd', () => {
  console.log('  Docs:');
  console.log('');
  console.log('     https://shopify.github.io/slate/');
  console.log('');
});

// Unknown command
program.on('*', () => {
  console.log('');
  console.log(red(`  ${figures.cross} Unknown command: ${program.args.join(' ')}`));
  console.log('');
  program.help();
});

program.parse(process.argv);

// output help if no commands or options passed
if (!process.argv.slice(2).length) {
  program.help();
}
