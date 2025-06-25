import { Command } from 'commander';
import MakeAggregate from './script/make-aggregate';

const program = new Command();

program
  .name('Anual Shop CLI')
  .description('Ferramenta para automação do projeto')
  .version('1.0.0');

program
  .command('make:aggregate')
  .description('Generate a new aggregate')
  .argument('<name>', 'Aggregate name')
  .action((name) => MakeAggregate.run(name));

// 🚧 TODO: usecase
// program.command('make:usecase').action(...)

program.parse();
