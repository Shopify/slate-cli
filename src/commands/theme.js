import 'babel-polyfill';
import {existsSync, mkdirSync} from 'fs'; // eslint-disable-line node/no-deprecated-api
import {join} from 'path';
import {prompt} from 'inquirer';
import rimraf from 'rimraf';
import {green, red} from 'chalk';
import {downloadFromUrl, unzip, startProcess, writePackageJsonSync} from '../utils';

export default function(program) {
  program
    .command('theme [name]')
    .alias('t')
    .description('Generates a new theme directory containing Slate\'s theme boilerplate.')
    .action(async function(name) {
      let dirName = name;

      if (!dirName) {
        const answers = await prompt({
          type: 'input',
          name: 'dirName',
          message: 'Please enter a directory name for your theme (a new folder will be created):',
          default: 'theme',
          validate: (value) => {
            const validateName = value.match(/^[\w^'@{}[\],$=!#().%+~\- ]+$/);

            if (validateName) {
              return true;
            }

            return 'A directory name is required.';
          },
        });

        dirName = answers.dirName;
      }

      const workingDirectory = process.cwd();
      const s3Url = 'https://sdks.shopifycdn.com/slate/latest/slate-src.zip';
      const root = join(workingDirectory, dirName);

      if (existsSync(root)) {
        console.log('');
        console.error(red(`  ${root} is not an empty directory`));
        console.log('');
        return null;
      }

      console.log('');
      console.log('  This may take some time...');
      console.log('');

      mkdirSync(root);

      return downloadFromUrl(s3Url, join(root, 'slate-theme.zip'))
        .then((themeZipFile) => {
          return unzip(themeZipFile, root);
        })
        .then(() => {
          console.log(`  ${green('✓')} slate-theme download completed`);

          const pkg = join(root, 'package.json');

          writePackageJsonSync(pkg, dirName);

          return startProcess('npm', ['install', '@shopify/slate-tools', '--save-dev', '--save-exact'], {
            cwd: root,
          });
        })
        .then(() => {
          console.log(`  ${green('✓')} devDependencies installed`);
          console.log(`  ${green('✓')} ${dirName} theme is ready`);
          console.log('');

          return;
        })
        .catch((err) => {
          console.error(red(`  ${err}`));

          rimraf(root, () => {
            console.log('');
            console.log('  Cleaned up theme');
            console.log('');
          });
        });
    });
}
