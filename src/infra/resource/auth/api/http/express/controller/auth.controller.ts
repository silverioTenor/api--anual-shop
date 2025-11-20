import { Body, Post, Response, Route, Tags } from 'tsoa';

import RegisterUseCase from '@application/auth/register/register.auth.usecase';
import LoginUseCase from '@application/auth/login/login.auth.usecase';
import UserRepository from '@infra/aggregate/user/db/prisma/repository/user.repository';
import { InputLoginDTO, OutputLoginDTO } from '@application/auth/login/login.auth.dto';
import { InputRegisterDTO, OutputRegisterDTO } from '@application/auth/register/register.auth.dto';

@Route('/auth')
@Tags('Auth')
export class AuthController {

   @Post('/sign-up')
   @Response<OutputRegisterDTO>(201, 'Created')
   async signup(@Body() inputRegisterDTO: InputRegisterDTO): Promise<OutputRegisterDTO> {
      return await new RegisterUseCase(new UserRepository()).execute(inputRegisterDTO);
   }

   @Post('/sign-in')
   @Response<OutputLoginDTO>(200, 'OK')
   async signin(@Body() inputLoginDTO: InputLoginDTO): Promise<OutputLoginDTO> {
      return await new LoginUseCase(new UserRepository()).execute(inputLoginDTO);
   }

   // async recoveryPass() {
   //    throw new Error('method not implemented yet!');
   // }

   // async suspend() {
   //    throw new Error('method not implemented yet!');
   // }
}
