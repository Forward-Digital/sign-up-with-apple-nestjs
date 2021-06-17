import { Module } from '@nestjs/common';

import { AppleCreateGuard } from './Guards/Apple.CreateGuard';
import { AppleLoginGuard } from './Guards/Apple.LoginGuard';
import { AppleStrategy } from './Strategies/Apple.strategy';
import { UtilitiesModule } from '../Utilities/UtilitiesModule';

@Module({
	imports: [UtilitiesModule],
	providers: [
		AppleCreateGuard,
		AppleLoginGuard,
		AppleStrategy,
	],
	exports: [AppleStrategy],
})
export class AuthorisationModule {}
