import chalk from 'chalk';
import inquirer from 'inquirer';
import Generate from '../util/generator';

export default abstract class MakeAggregate {
   static async run(name: string) {
      const aggregate = name.toLowerCase();

      console.log(chalk.yellow(`🚀 Building aggregate ${aggregate}...`));

      const { genDirectory } = await inquirer.prompt([
         {
            type: 'confirm',
            name: 'genDirectory',
            message: 'Do you want to generate a complete aggregate?',
            default: true,
         },
      ]);

      if (genDirectory) {
         const { dirLocation } = await inquirer.prompt([
            {
               type: 'list',
               name: 'dirLocation',
               message: 'Select the target location',
               choices: ['domain', 'infra'],
            },
         ]);

         const { useOrm } = await inquirer.prompt([
            {
               type: 'confirm',
               name: 'useOrm',
               message: 'Are you going to use any ORM?',
               default: true,
            },
         ]);

         let ormName = '';

         if (useOrm) {
            const { orm } = await inquirer.prompt([
               {
                  type: 'input',
                  name: 'orm',
                  message: 'Insert the ORM name',
               },
            ]);

            ormName = orm;
         }

         switch (dirLocation) {
            case 'domain':
               await Generate.genDomainAggregate(aggregate);
               break;
            case 'infra':
               await Generate.genInfraAggregate(aggregate, ormName);
               break;
            default:
               console.log('🚩 Invalid option!');
         }
      }
   }
}
