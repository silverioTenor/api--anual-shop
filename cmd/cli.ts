import { Command } from 'commander';
import MakeAggregate from './script/make-aggregate';
import MakeAUseCase from './script/make-usecase';

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

program
  .command('make:usecase')
  .description('Generate a new usecase')
  .argument('<name>', 'UseCase name')
  .action((name) => MakeAUseCase.run(name));

program.parse();
