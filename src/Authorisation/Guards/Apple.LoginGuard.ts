import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppleStrategy, JwtTokenSchema } from '../Strategies/Apple.strategy';

@Injectable()
export class AppleLoginGuard implements CanActivate {
	constructor(
		private readonly configService: ConfigService,
		private readonly apple: AppleStrategy,
	) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const response = context.switchToHttp().getResponse();
		const token: string = <string>request.body.identityToken;
		if (!token) return false;
		const jwt: JwtTokenSchema = await this.apple.ValidateTokenAndDecode(token);
		try {
			// user is successfully authenticated
		} catch (error) {
			throw new HttpException(error.message ?? 'Please try again later', HttpStatus.UNAUTHORIZED);
		}

		return false;
	}
}
