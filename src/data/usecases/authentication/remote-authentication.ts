import { IHttpPostClient } from 'data/protocols/http/http-post-client';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) { }

  public async auth(): Promise<void> {
    await this.httpPostClient.post({ url: this.url });
  }
}
