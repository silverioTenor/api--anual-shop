import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import inquirer from 'inquirer';
import Generate from './generate.util';

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

         switch (dirLocation) {
            case 'domain':
               Generate.genDomainAggregate(aggregate);
               break;
            case 'infra':
               Generate.genInfraAggregate(aggregate);
               break;
            default:
               console.log('🚩 Invalid option!');
         }
      }
   }
}
