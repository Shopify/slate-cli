import {readdirSync, createReadStream, createWriteStream, unlink, unlinkSync, writeFileSync} from 'fs';
import {spawn} from 'child_process';
import {Extract} from 'unzip2';
import {get} from 'https';

export function copyDir(source, target) {
  return new Promise((resolve, reject) => {
    const fileNames = readdirSync(source);
    let filesCopied = 0;

    function checkCopiedAllFiles() {
      ++filesCopied;

      if (filesCopied === fileNames.length) {
        resolve();
      }
    }

    for (const fileName of fileNames) {
      const fileReadStream = createReadStream(fileName);
      const fileWriteStream = createWriteStream(target);

      fileReadStream.on('error', (err) => {
        reject(err);
      });

      fileWriteStream.on('error', (err) => {
        reject(err);
      });

      fileWriteStream.on('close', checkCopiedAllFiles);

      fileReadStream.pipe(fileWriteStream);
    }
  });
}

export function downloadFromS3(source, target) {
  return new Promise((resolve, reject) => {
    const themeZipFile = createWriteStream(target);

    themeZipFile.on('open', () => {
      get(source, (response) => {
        response.pipe(themeZipFile);
      });
    });

    themeZipFile.on('error', (err) => {
      console.error(err);
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
      console.error(err);
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
