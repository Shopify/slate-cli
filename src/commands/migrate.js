import 'babel-polyfill';
import {existsSync, mkdirSync, readdirSync} from 'fs';
import {join} from 'path';
import {prompt} from 'inquirer';
import {green, red} from 'chalk';
import {startProcess, writePackageJsonSync, move, isShopifyTheme, isShopifyThemeWhitelistedDir} from '../utils';

export default function(program) {
  program
    .command('migrate')
    .description('Converts an existing theme to work with Slate.')
    .action(async () => {
      const workingDirectory = process.cwd();
      const answers = await prompt({
        type: 'confirm',
        name: 'confirmation',
        message: 'Warning! This will move files in your theme. Are you sure you want to proceed?',
      });

      if (!answers.confirmation) {
        return;
      }

      if (!isShopifyTheme(workingDirectory)) {
        console.log('');
        console.error(red('  Your theme doesn\'t have /layout/theme.liquid. We have to assume your theme isn\'t a Shopify theme'));
        console.log('');
        console.error(red('  Migration failed'));
        console.log('');
        return;
      }

      const configYml = join(workingDirectory, 'config.yml');
      const pkgJson = join(workingDirectory, 'package.json');
      const srcDir = join(workingDirectory, 'src');
      const iconsDir = join(srcDir, 'icons');
      const stylesDir = join(srcDir, 'styles');
      const scriptsDir = join(srcDir, 'scripts');

      console.log('');
      console.log(`  ${green('✓')} Your theme is a valid Shopify theme`);
      console.log('');

      if (existsSync(srcDir)) {
        console.error(red('  Your theme already has a src directory'));
        console.log('');
        console.error(red('  Migration failed'));
        console.log('');
        return;
      }

      if (!existsSync(configYml)) {
        console.error(red('  Your theme is missing config.yml in the root directory. Please add before using Slate commands'));
        console.error(red('  Example config.yml here: https://github.com/Shopify/slate/blob/master/config-sample.yml'));
        console.log('');
      }

      console.log(`  ${green('✓')} Migration checks completed`);
      console.log('');
      console.log('  Starting migration...');
      console.log('');

      mkdirSync(srcDir);
      mkdirSync(iconsDir);
      mkdirSync(stylesDir);
      mkdirSync(scriptsDir);

      if (!existsSync(pkgJson)) {
        writePackageJsonSync(pkgJson);
      }

      function movePromiseFactory(file) {
        console.log(`  Migrating ${file} to src/...`);
        return move(join(workingDirectory, file), join(srcDir, file));
      }

      const files = readdirSync(workingDirectory);
      const whitelistFiles = files.filter(isShopifyThemeWhitelistedDir);
      const promises = whitelistFiles.map(movePromiseFactory);

      try {
        await Promise.all(promises);

        console.log('');
        console.log(`  ${green('✓')} Migration to src/ completed`);
        console.log('');
        console.log('  Installing Slate dependencies...');
        console.log('');

        await startProcess('npm', ['install', '@shopify/slate-tools', '--save-dev', '--save-exact'], {cwd: workingDirectory});

        console.log('');
        console.log(`  ${green('✓')} Slate dependencies installed`);
        console.log('');
        console.log(`  ${green('✓')} Migration complete!`);
        console.log('');
      } catch (err) {
        console.error(red(`  ${err}`));
        console.log('');
        console.error(red('  Migration failed. Please check src/ directory'));
        console.log('');
      }
    });
}
