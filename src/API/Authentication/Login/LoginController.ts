import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';

import { AppleLoginGuard } from '../../../Authorisation/Guards/Apple.LoginGuard';
import { AppleLoginDTO } from '../../User/AppleUser.dto';

@Controller('auth')
export class LoginController {

	@UseGuards(AppleLoginGuard)
	@Post('login/apple')
	public async AppleLogin(@Body() appleDto: AppleLoginDTO): Promise<HttpStatus> {
		// logged in
		return HttpStatus.OK
	}
}
