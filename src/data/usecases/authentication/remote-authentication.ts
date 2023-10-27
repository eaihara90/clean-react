import { IHttpPostClient } from '@/data/protocols/http/http-post-client';
import { AuthenticationParams } from '@/domain/usecases/authentication/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) { }

  public async auth(params: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({ url: this.url, body: params });
  }
}
