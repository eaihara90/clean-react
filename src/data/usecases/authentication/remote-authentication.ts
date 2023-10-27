import { IHttpPostClient } from '@/data/protocols/http/http-post-client';
import { HttpStatusCodeEnum } from '@/data/protocols/http/http-response';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { AuthenticationParams } from '@/domain/usecases/authentication/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) { }

  public async auth(params: AuthenticationParams): Promise<void> {
    const httpResponse = await this.httpPostClient.post({ url: this.url, body: params });

    switch (httpResponse.statusCode) {
      case HttpStatusCodeEnum.unauthorized: throw new InvalidCredentialsError();
      default: return Promise.resolve();
    }
  }
}
