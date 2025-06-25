import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';

export default abstract class Generate {
   static createDirectory(dirPath: string) {
      if (!fs.existsSync(dirPath)) {
         fs.mkdirSync(dirPath, { recursive: true });
         console.log(chalk.green(`✔ Directory "${dirPath}" was created!`));
      }
   }

   static createFile(filePath: string, content = '') {
      if (!fs.existsSync(filePath)) {
         fs.writeFileSync(filePath, content);
         console.log(chalk.cyan(`✔ File "${filePath}" was created!`));
      }
   }

   static genDomainAggregate(aggregateName: string) {
      const className = aggregateName.charAt(0).toUpperCase() + aggregateName.slice(1);
      const domainPath = path.resolve('src', 'domain', aggregateName);
      const domainDiretories = [
         'entity',
         'factory',
         'interface',
         'repository',
         'validator',
         'value-object',
      ];

      for (let dirName of domainDiretories) {
         const dirPath = path.join(domainPath, dirName);

         const filePath =
            dirName !== 'value-object'
               ? path.join(dirPath, `${aggregateName}.${dirName}.ts`)
               : path.join(dirPath, `${aggregateName}.ts`);
               
         const fileTestPath =
            dirName !== 'value-object'
               ? path.join(dirPath, `${aggregateName}.${dirName}.unit.spec.ts`)
               : path.join(dirPath, `${aggregateName}.unit.spec.ts`);

         this.createDirectory(dirPath);

         let content = '';

         switch (dirName) {
            case 'entity':
               content = `export default class ${className} {}`;
               break;
            case 'factory':
               content = `export default class ${className}Factory {}`;
               break;
            case 'validator':
               content = `export default class ${className}Validator {}`;
               break;
            case 'value-object':
               content = `export default class ${className} {}`;
               break;
            default:
               content = `export default interface I${className}${
                  dirName === 'repository' ? dirName.charAt(0).toUpperCase() + dirName.slice(1) : ''
               } {}`;
         }

         this.createFile(filePath, content);

         if (dirName !== 'interface' && dirName !== 'repository') {
            content = `describe('Unit test for ${className}', () => {it('should calc value', () => {expect(1+1).toBe(2)});});`;
            this.createFile(fileTestPath, content);
         }
      }
   }

   static genInfraAggregate(aggregateName: string) {
      const className = aggregateName.charAt(0).toUpperCase() + aggregateName.slice(1);
   }
}
