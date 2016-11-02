import {createReadStream, createWriteStream, unlink, unlinkSync, writeFileSync} from 'fs';
import {Extract} from 'unzip2';
import {get} from 'https';
import spawn from 'cross-spawn';

export function downloadFromS3(source, target) {
  return new Promise((resolve, reject) => {
    const themeZipFile = createWriteStream(target);

    themeZipFile.on('open', () => {
      get(source, (response) => {
        response.pipe(themeZipFile);
      });
    });

    themeZipFile.on('error', (err) => {
      unlink(target);
      reject(err);
    });

    themeZipFile.on('close', () => {
      resolve(target);
    });
  });
}

export function unzip(source, target) {
  return new Promise((resolve, reject) => {
    const zipFile = createReadStream(source);

    zipFile.on('error', (err) => {
      reject(err);
    });

    zipFile.on('close', () => {
      unlinkSync(source);
      resolve(target);
    });

    zipFile.pipe(Extract({
      path: target,
    }));
  });
}

export function writePackageJsonSync(target, name) {
  const pkg = {
    name,
    version: '0.0.1',
  };

  const data = JSON.stringify(pkg, null, 2);

  writeFileSync(target, data);
}

export function startProcess(command, args, options) {
  const defaultedOptions = options || {};
  defaultedOptions.stdio = defaultedOptions.stdio || 'inherit';

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, defaultedOptions);

    child.on('error', (err) => {
      reject(err);
    });

    child.on('close', (code) => {
      resolve(code);
    });
  });
}
