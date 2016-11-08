import {create} from '../theme';

export default function(program) {
  program
    .command('theme [name]')
    .alias('th')
    .description('Generate new theme')
    .action((name = 'theme') => {
      create(name);
    });
}
