import {
	Controller,
	Body,
	Post,
	UseGuards,
    HttpStatus,
} from '@nestjs/common';

import { AppleCreateGuard } from '../../Authorisation/Guards/Apple.CreateGuard';
import { AppleUserDto } from './AppleUser.dto';

@Controller('user')
export class UserController {
	@UseGuards(AppleCreateGuard)
	@Post('apple')
	public async RegisterAppleUser(@Body() newUser: AppleUserDto): Promise<HttpStatus> {
		return HttpStatus.OK
	}
}
