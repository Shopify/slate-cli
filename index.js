#!/usr/bin/env node

const join = require('path').join;
const spawn = require('child_process').spawn;
const debug = require('debug')('slate-cli');
const chalk = require('chalk');
const minimist = require('minimist');
const themeRoot = require('find-root')(process.cwd());

const pkg = require(join(__dirname, 'package.json'));
const themePkgPath = join(themeRoot, 'package.json');
const themePkg = require(themePkgPath);
const argv = minimist(process.argv.slice(2));

debug(argv);
debug(`Loading theme: ${themePkgPath}`);

function createTheme() {
  return new Promise((resolve) => {
    console.log('  I wish I could make a new theme...');
    resolve();
  });
}

function checkThemeDeps() {
  if (('dependencies' in themePkg && 'slate-tools' in themePkg.dependencies) || ('devDependencies' in themePkg && 'slate-tools' in themePkg.devDependencies)) {
    return `${chalk.green('✓')} package.json has required dependency: slate-tools`;
  } else {
    throw new Error(`${chalk.red('✗')} package.json missing dependency slate-tools. Try \`npm install slate-tools\`.`);
  }
}

function checkForVersionArgument() {
  if (argv._.length === 0 && (argv.v || argv.version)) { // eslint-disable-line id-length
    console.log(`  slate-cli   ${pkg.version}`);

    try {
      checkThemeDeps();
      console.log(`  slate-tools ${themePkg.version}`);
    } catch (err) {
      console.log('  slate-tools n/a - not inside a Slate theme directory');
    }

    process.exit(); // eslint-disable-line no-process-exit
  }

  return;
}

checkForVersionArgument();

if (argv._.length > 0 && argv._[0] === 'new' && argv._[1] === 'theme') {
  console.log('  This may take some time...');
  console.log('');
  return createTheme();
}

try {
  const response = checkThemeDeps();
  debug(response);
  debug('Searching slate-tools...');
  debug(process.argv.slice(2));

  return spawn('slate-tools', process.argv.slice(2), {
    stdio: 'inherit'
  });
} catch (err) {
  console.error(err);
}
