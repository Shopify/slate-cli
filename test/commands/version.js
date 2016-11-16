import assert from 'assert';
import program from '@shopify/commander';
import {join, normalize} from 'path';

const currentDirectory = __dirname;
const pkg = require(join(currentDirectory, normalize('../../package.json')));

export default () => {
  test('the program version should match packge.json version', (done) => {
    require(join(currentDirectory, normalize('../../src/commands/version'))).default(program);

    assert.equal(program.version(), pkg.version, 'version matched');

    done();
  });
};
