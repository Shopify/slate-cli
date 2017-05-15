export default function(program) {
  program
    .command('help')
    .action(() => {
      program.help();
    });
}
