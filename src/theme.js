import debug from 'debug';
import {green, red} from 'chalk';
import {join} from 'path';

const logger = debug('slate-cli:theme');
const depKeys = ['dependencies', 'devDependencies'];

export default class Theme {
  constructor(themeRootDirectory) {
    this.root = themeRootDirectory;
    this.pkg = require(join(this.root, 'package.json'));

    debug(`Loading theme: ${this.pkg}`);
  }

  hasDependency(dependency) {
    let hasDependencies = false;

    for (const key of depKeys) {
      if ((key in this.pkg && dependency in this.pkg[key])) {
        hasDependencies = true;
        break;
      }
    }

    if (hasDependencies) {
      logger(`${green('✓')} package.json has required dependency: @shopify/slate-tools`);
      return true;
    } else {
      logger(`${red('✗')} package.json missing dependency @shopify/slate-tools. Try \`npm install @shopify/slate-tools\`.`);
      return false;
    }
  }

  create() {
    return new Promise((resolve) => {
      console.log('  I wish I could make a new theme...');
      resolve();
    });
  }
}
