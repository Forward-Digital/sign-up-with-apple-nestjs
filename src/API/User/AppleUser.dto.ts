export class AppleUserDto {
	public identityToken: string;

	constructor(identityToken: string) {
		this.identityToken = identityToken;
	}
}

export class AppleLoginDTO {
	public identityToken: string;
	public notificationToken: string;

	constructor(identityToken: string, notificationToken: string) {
		this.identityToken = identityToken;
		this.notificationToken = notificationToken;
	}
}
