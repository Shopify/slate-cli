export default function(program) {
  program
    .command('help')
    .alias('h')
    .description('Output usage information')
    .action(() => {
      program.help();
    });
}
