import { HttpException, HttpService, Injectable } from '@nestjs/common';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class AxiosClient {
	constructor(private readonly httpService: HttpService) {}

	public async Get<R>(url: string, configuration?: AxiosRequestConfig): Promise<R> {
		return new Promise<R>((resolve, reject) => {
			this.httpService
				.get<R>(url, configuration)
				.toPromise()
				.then((result: AxiosResponse<R>) => {
					resolve(result.data);
				})
				.catch((error: AxiosError) => {
					const exception: HttpException = new HttpException(
						JSON.stringify(error.response.data),
						error.response.status,
					);
					reject(exception);
				});
		});
	}
}
