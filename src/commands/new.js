import {create} from '../theme';

export default function(program) {
  program
    .command('theme [name]')
    .alias('t')
    .description('Generate new component')
    .action((name = 'theme') => {
      create(name);
    });
}
