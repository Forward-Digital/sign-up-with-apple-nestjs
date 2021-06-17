import { Module } from '@nestjs/common';

import { AuthorisationModule } from '../Authorisation/AuthorisationModule';
import { UtilitiesModule } from '../Utilities/UtilitiesModule';
import { LoginController } from './Authentication/Login/LoginController';
import { UserController } from './User/UserController';

@Module({
	controllers: [
		UserController,
		LoginController,
		UserController,
	],
	imports: [UtilitiesModule, AuthorisationModule],
})
export class ApiModule {}
