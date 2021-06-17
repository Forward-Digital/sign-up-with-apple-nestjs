import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppleStrategy, JwtTokenSchema } from '../Strategies/Apple.strategy';
import { AppleUserDto } from '../../API/User/AppleUser.dto';

@Injectable()
export class AppleCreateGuard implements CanActivate {
	private readonly isInProd: boolean;

	constructor(
		private readonly configService: ConfigService,
		private readonly apple: AppleStrategy,
	) {
		this.isInProd = configService.get<string>('NODE_ENV') === 'production';
	}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token: string = <string>request.body.identityToken;
		if (!token) return false;
		const jwtSchema: JwtTokenSchema = await this.apple.ValidateTokenAndDecode(token);
		request.body = <AppleUserDto>{
			...request.body,
			email: jwtSchema.email,
			name: request.body.name,
		};
		return true;
	}
}
