// test invalid windows file system
// test invalid unix file system
// test invalid linux file system

// spy on prompt
// test input/output of commander
//
// Make sure to restore stubs beforeEach afterEach

// tests
// 1. If called with name -> straight to code
// 2. Called without name -> fire prompt
// 3. Called with directory name that already exists
// 4. Called with directory name that doesn't exist
// 5. Stub out other functions and make sure they are called

import assert from 'assert';
import program from '@shopify/commander';
import mockStdin from 'mock-stdin';

export default () => {
  let stdin;

  beforeEach(() => {
    stdin = mockStdin.stdin();
  });

  test('the program should prompt user for name when empty', (done) => {
    require('../../src/commands/theme').default(program);

    process.nextTick(function mockResponse() {
      stdin.send('slate-test');
    });

    program.parse(['node', 'test', 'theme']);

    assert.equal(program.cheese, true, 'version matched');

    done();
  });
};
