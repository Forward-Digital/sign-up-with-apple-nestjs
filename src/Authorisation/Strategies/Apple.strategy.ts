import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import jwtDecode, { JwtHeader } from 'jwt-decode';

import { AxiosClient } from '../../Utilities/AxiosClient';

export type JwtTokenSchema = {
	iss: string;
	aud: string;
	exp: number;
	iat: number;
	sub: string;
	nonce: string;
	c_hash: string;
	email: string;
	email_verified: string;
	is_private_email: string;
	auth_time: number;
};

@Injectable()
export class AppleStrategy {
	private readonly audience: string;
	private readonly isInProd: boolean;

	constructor(
		private readonly configService: ConfigService,
		private readonly api: AxiosClient,
	) {
		this.isInProd = configService.get<string>('NODE_ENV') === 'production';
		this.audience = this.isInProd ? 'co.repetitio.repetitio' : 'host.exp.Exponent';
	}

	public async ValidateTokenAndDecode(token: string): Promise<JwtTokenSchema> {
		const tokenDecodedHeader: JwtHeader & { kid: string } = jwtDecode<JwtHeader & { kid: string }>(token, {
			header: true,
		});
		const applePublicKey: { keys: Array<{ [key: string]: string }> } = await this.api.Get(
			'https://appleid.apple.com/auth/keys',
		);
		const client: jwksClient.JwksClient = jwksClient({
			jwksUri: 'https://appleid.apple.com/auth/keys',
		});
		const kid: string = tokenDecodedHeader.kid;
		const sharedKid: string = applePublicKey.keys.filter(x => x['kid'] === kid)[0]?.['kid'];
		const key: jwksClient.CertSigningKey | jwksClient.RsaSigningKey = await client.getSigningKey(sharedKid);
		const signingKey: string = key.getPublicKey();
		if (!signingKey) {
			throw new HttpException('Validation failed for login.', HttpStatus.UNAUTHORIZED);
		}
		try {
			const res: JwtTokenSchema = <JwtTokenSchema>jwt.verify(token, signingKey);
			this.ValidateToken(res);
			return res;
		} catch (error) {
			throw error;
		}
	}

	private ValidateToken(token: JwtTokenSchema): void {
		if (token.iss !== 'https://appleid.apple.com') {
			throw { message: 'Issuers do not match!' };
		}
		if (token.aud !== this.audience) {
			throw { message: 'Audiences do not match!' };
		}
	}
}
