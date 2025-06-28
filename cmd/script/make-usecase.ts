import chalk from 'chalk';
import Generator from '../util/generator';

export default abstract class MakeAUseCase {
   static async run(name: string) {
      const usecase = name.toLowerCase();

      console.log(chalk.yellow(`🚀 Building usecase ${usecase}...`));

      await Generator.genUseCase(name);

      console.log(chalk.greenBright(`✨ ${name} usecase created successfully!`));
   }
}
