import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashStringService {
	public static HashString: (string: string) => string = string => bcrypt.hashSync(string, 8);

	public static Validate: (unencryptedPassword: string, password: string) => boolean = (
		unencryptedPassword,
		password,
	) => bcrypt.compareSync(unencryptedPassword, password);
}
