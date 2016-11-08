import {existsSync, mkdirSync} from 'fs'; // eslint-disable-line node/no-deprecated-api
import {join} from 'path';
import {green, red} from 'chalk';
import {downloadFromUrl, unzip, startProcess, writePackageJsonSync} from '../utils';

export default function(program) {
  program
    .command('theme [name]')
    .alias('th')
    .description('Generate new theme')
    .action((name = 'theme') => {
      const s3Url = 'https://sdks.shopifycdn.com/slate/latest/slate-src.zip';
      const dirName = name;
      const root = join(process.cwd(), dirName);

      if (existsSync(root)) {
        return Promise.reject(red(`  ${root} is not an empty directory`));
      }

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

          return startProcess('npm', ['install', '@shopify/slate-tools', '-D'], {
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
          console.error(err);
        });
    });
}
