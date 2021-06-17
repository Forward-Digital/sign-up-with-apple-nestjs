import { HttpModule, Module } from '@nestjs/common';

import { HashStringService } from './HashStringService';
import { AxiosClient } from './AxiosClient';

@Module({
	imports: [HttpModule],
	providers: [
		HashStringService,
		AxiosClient,
	],
	exports: [
		HashStringService,
		AxiosClient,
	],
})
export class UtilitiesModule {}
