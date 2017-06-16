import {readdirSync} from 'fs';
import {join, normalize} from 'path';
import findRoot from 'find-root';
import {hasDependency} from './utils';

/**
 * Find closest package.json to be at root of theme.
 *
 * @param {string} directory - A path.
 */
function getThemeRoot(directory) {
  try {
    return normalize(findRoot(directory));
  } catch (err) {
    return null;
  }
}

/**
 * Check package.json for slate-tools.
 *
 * @param {string} themeRoot - The path for the root of the theme.
 */
function checkForSlateTools(themeRoot) {
  const pkgPath = join(themeRoot, 'package.json');
  const pkg = require(pkgPath);

  return hasDependency('@shopify/slate-tools', pkg);
}

export function isSlateTheme() {
  const workingDirectory = process.cwd();
  console.log('tools::', workingDirectory);
  const themeRoot = getThemeRoot(workingDirectory);
  return (themeRoot && checkForSlateTools(themeRoot));
}

export function getPath() {
  const workingDirectory = process.cwd();
  console.log('tools::', workingDirectory);

  if (isSlateTheme()) {
    const themeRoot = getThemeRoot(workingDirectory);
    return join(themeRoot, normalize('/node_modules/@shopify/slate-tools/lib/commands'));
  }

  return null;
}

export function getCommands() {
  const workingDirectory = process.cwd();
  console.log('tools::', workingDirectory);

  if (isSlateTheme()) {
    return readdirSync(getPath())
      .filter((file) => ~file.search(/^[^\.].*\.js$/)); // eslint-disable-line no-useless-escape
  }

  return [];
}
