import { Body, Controller, Post, Response, Route, Tags } from 'tsoa';
import { inject, injectable } from 'tsyringe';

import RegisterUseCase from '@application/auth/register/register.auth.usecase';
import LoginUseCase from '@application/auth/login/login.auth.usecase';
import { InputLoginDTO, OutputLoginDTO } from '@application/auth/login/login.auth.dto';
import { InputRegisterDTO, OutputRegisterDTO } from '@application/auth/register/register.auth.dto';
import {
   InputRecoveryPassDTO,
   OutputRecoveryPassDTO,
} from '@application/auth/recovery-pass/recovery.auth.dto';
import RecoveryPassUseCase from '@application/auth/recovery-pass/recovery.auth.usecase';

@Route('/auth')
@Tags('Auth')
@injectable()
export class AuthController extends Controller {
   constructor(
      @inject('RegisterUseCase')
      private readonly registerUseCase: RegisterUseCase,
      @inject('LoginUseCase')
      private readonly loginUseCase: LoginUseCase,
      @inject('RecoveryPassUseCase')
      private readonly recoveryPassUseCase: RecoveryPassUseCase,
   ) {
      super();
   }

   @Post('/sign-up')
   @Response<OutputRegisterDTO>(201, 'Created')
   async signup(@Body() inputRegisterDTO: InputRegisterDTO): Promise<OutputRegisterDTO> {
      return await this.registerUseCase.execute(inputRegisterDTO);
   }

   @Post('/sign-in')
   @Response<OutputLoginDTO>(200, 'OK')
   async signin(@Body() inputLoginDTO: InputLoginDTO): Promise<OutputLoginDTO> {
      return await this.loginUseCase.execute(inputLoginDTO);
   }

   @Post('/recovery-pass')
   @Response<OutputRecoveryPassDTO>(200, 'OK')
   async recoveryPass(
      @Body() inputRecoveryPassDTO: InputRecoveryPassDTO,
   ): Promise<OutputRecoveryPassDTO> {
      return await this.recoveryPassUseCase.execute(inputRecoveryPassDTO);
   }

   // async suspend() {
   //    throw new Error('method not implemented yet!');
   // }
}
