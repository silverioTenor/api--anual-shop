import prettier from 'prettier';

export default abstract class Formatter {
   static async execute(sourceCode: string) {
      return prettier.format(sourceCode, {
         parser: 'typescript',
         singleQuote: true,
         tabWidth: 3,
         printWidth: 100,
      });
   }
}
