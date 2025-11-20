import { container } from 'tsyringe';
import UserRepository from '@infra/aggregate/user/db/prisma/repository/user.repository';
import ProductRepository from '@infra/aggregate/product/db/prisma/repository/product.repository';

import CreateUserUseCase from '@application/user/create/Create.user.usecase';
import FindUserUseCase from '@application/user/find/Find.user.usecase';
import UpdateUserPasswordUseCase from '@application/user/update/update-password.user.usecase';
import UpdateUserEmailUseCase from '@application/user/update/update-email.user.usecase';
import UpdateUserAddressUseCase from '@application/user/update/update-address.user.usecase';
import RegisterUseCase from '@application/auth/register/register.auth.usecase';
import LoginUseCase from '@application/auth/login/login.auth.usecase';
import RecoveryPassUseCase from '@application/auth/recovery-pass/recovery.auth.usecase';
import SuspendUseCase from '@application/auth/suspend/suspend.auth.usecase';
import CreateProductUseCase from '@application/product/create/Create.product.usecase';
import FindProductUseCase from '@application/product/find/Find.product.usecase';
import ListProductUseCase from '@application/product/list/List.product.usecase';
import UpdateProductUseCase from '@application/product/update/Update.product.usecase';
import { AuthController } from '@infra/resource/auth/api/http/express/controller/auth.controller';

// import UserController from '../../../aggregate/user/api/controller/user.controller';
// import ProductController from '../../../aggregate/product/api/controller/product.controller';

// REPOSITORIES
container.registerSingleton<UserRepository>('UserRepository', UserRepository);
container.registerSingleton<ProductRepository>('ProductRepository', ProductRepository);

// USECASES
container.registerSingleton<CreateUserUseCase>('CreateUserUseCase', CreateUserUseCase);
container.registerSingleton<FindUserUseCase>('FindUserUseCase', FindUserUseCase);
container.registerSingleton<UpdateUserPasswordUseCase>(
   'UpdateUserPasswordUseCase',
   UpdateUserPasswordUseCase,
);
container.registerSingleton<UpdateUserEmailUseCase>(
   'UpdateUserEmailUseCase',
   UpdateUserEmailUseCase,
);
container.registerSingleton<UpdateUserAddressUseCase>(
   'UpdateUserAddressUseCase',
   UpdateUserAddressUseCase,
);
container.registerSingleton<RegisterUseCase>('RegisterUseCase', RegisterUseCase);
container.registerSingleton<LoginUseCase>('LoginUseCase', LoginUseCase);
container.registerSingleton<RecoveryPassUseCase>('RecoveryPassUseCase', RecoveryPassUseCase);
container.registerSingleton<SuspendUseCase>('SuspendUseCase', SuspendUseCase);
container.registerSingleton<CreateProductUseCase>('CreateProductUseCase', CreateProductUseCase);
container.registerSingleton<FindProductUseCase>('FindProductUseCase', FindProductUseCase);
container.registerSingleton<ListProductUseCase>('ListProductUseCase', ListProductUseCase);
container.registerSingleton<UpdateProductUseCase>('UpdateProductUseCase', UpdateProductUseCase);

// CONTROLLERS
container.registerSingleton<AuthController>('AuthController', AuthController);
// container.registerSingleton<UserController>('UserController', UserController);
// container.registerSingleton<ProductController>('ProductController', ProductController);
// container.registerSingleton<CheckoutController>('CheckoutController', CheckoutController);
