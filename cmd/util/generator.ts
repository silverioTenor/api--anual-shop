import chalk from 'chalk';
import fs from 'node:fs';
import path from 'node:path';
import Formatter from './formatter';

export default abstract class Generator {
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

   static async genDomainAggregate(aggregateName: string) {
      const className = aggregateName.charAt(0).toUpperCase() + aggregateName.slice(1);
      const domainPath = path.resolve('src', 'domain', 'aggregate', aggregateName);
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

         content = await Formatter.execute(content);
         this.createFile(filePath, content);

         if (dirName !== 'interface' && dirName !== 'repository') {
            content = `describe('Unit test for ${className}', () => {it('should calc value', () => {expect(1+1).toBe(2)});});`;
            content = await Formatter.execute(content);
            this.createFile(fileTestPath, content);
         }
      }
   }

   static async genInfraAggregate(aggregateName: string, orm: string) {
      const className = aggregateName.charAt(0).toUpperCase() + aggregateName.slice(1);
      const infraPath = path.resolve('src', 'infra', 'aggregate', aggregateName);
      const infraDiretories = ['api', 'db'];

      for (let dirName of infraDiretories) {
         const dirPath = path.join(infraPath, dirName);

         if (dirName === 'api') {
            const subDirectories = ['__e2e__', 'controller', 'route'];

            for (let subDir of subDirectories) {
               const subDirPath = path.join(dirPath, subDir);

               const filePath = path.join(subDirPath, `${aggregateName}.${subDir}.ts`);

               const fileTestPath =
                  subDir !== '__e2e__'
                     ? path.join(subDirPath, `${aggregateName}.${subDir}.unit.spec.ts`)
                     : path.join(subDirPath, `${aggregateName}.e2e.spec.ts`);

               this.createDirectory(subDirPath);

               let content = '';

               switch (subDir) {
                  case 'controller':
                     content = `import { Request, Response } from 'express';export default abstract class ${className}Controller {static async create(req: Request, res: Response) {throw new Error('method not implemented yet!');}static async find(req: Request, res: Response) {throw new Error('method not implemented yet!');}static async changeEmail(req: Request, res: Response) {throw new Error('method not implemented yet!');}static async changeAddress(req: Request, res: Response) {throw new Error('method not implemented yet!');}}`;
                     break;
                  case 'route':
                     content = `import { Request, Response, Router } from 'express';import ${className}Controller from '../controller/${className.toLowerCase()}.controller';const ${className.toLowerCase()}Router = Router();${className.toLowerCase()}Router.post('/create', async (req: Request, res: Response) => {await ${className}Controller.create(req, res);});${className.toLowerCase()}Router.get('/:id', async (req: Request, res: Response) => {await ${className}Controller.find(req, res);});export default ${className.toLowerCase()}Router;`;
                     break;
                  default:
               }

               if (subDir !== '__e2e__') {
                  content = await Formatter.execute(content);
                  this.createFile(filePath, content);
               }

               if (subDir === '__e2e__') {
                  content = `describe('Unit test for ${className}', () => {it('should calc value', () => {expect(1+1).toBe(2)});});`;
                  content = await Formatter.execute(content);
                  this.createFile(fileTestPath, content);
               }
            }
         } else {
            const subDirectories = ['model', 'repository'];

            for (let subDir of subDirectories) {
               const subDirPath = path.join(dirPath, orm, subDir);

               const filePath = path.join(subDirPath, `${aggregateName}.${subDir}.ts`);

               const fileTestPath = path.join(
                  subDirPath,
                  `${aggregateName}.${subDir}.unit.spec.ts`,
               );

               this.createDirectory(subDirPath);

               let content = '';

               switch (subDir) {
                  case 'model':
                     content = `export default class ${className}Model {}`;
                     break;
                  case 'repository':
                     content = `export default class ${className}Repository implements I${className}DBRepository {}`;
                     break;
                  default:
               }

               content = await Formatter.execute(content);
               this.createFile(filePath, content);

               if (subDir === 'repository') {
                  content = `describe('Unit test for ${className}', () => {it('should calc value', () => {expect(1+1).toBe(2)});});`;
                  content = await Formatter.execute(content);
                  this.createFile(fileTestPath, content);
               }
            }
         }
      }
   }
}
