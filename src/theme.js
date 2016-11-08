import {existsSync, mkdirSync} from 'fs'; // eslint-disable-line node/no-deprecated-api
import {green, red} from 'chalk';
import {join, normalize} from 'path';
import findRoot from 'find-root';
import debug from 'debug';
import {downloadFromUrl, unzip, startProcess, writePackageJsonSync} from './utils';

const logger = debug('slate-cli:theme');

function hasDependency(dependencyName, pkg) {
  const depKeys = ['dependencies', 'devDependencies'];
  let hasDependencies = false;

  for (const key of depKeys) {
    if ((key in pkg && dependencyName in pkg[key])) {
      hasDependencies = true;
      break;
    }
  }

  return hasDependencies;
}

export function getThemeRoot(directory) {
  try {
    return normalize(findRoot(directory));
  } catch (err) {
    return null;
  }
}

export function checkForSlateTools(npmRoot) {
  const pkgPath = join(npmRoot, 'package.json');
  const pkg = require(pkgPath);

  return hasDependency('@shopify/slate-tools', pkg);
}

export function create(name = 'theme') {
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
      logger(`Download complete ${themeZipFile}`);

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
}
