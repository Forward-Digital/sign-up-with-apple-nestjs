import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiModule } from './API/ApiModule';
import { AuthorisationModule } from './Authorisation/AuthorisationModule';
import { UtilitiesModule } from './Utilities/UtilitiesModule';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `${process.env.NODE_ENV}.env`,
		}),
		ApiModule,
		UtilitiesModule,
		AuthorisationModule,
	],
})
export class AppModule {}
