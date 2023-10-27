import { HttpPostParams, IHttpPostClient } from '@/data/protocols/http/http-post-client';

export class HttpPostClientSpy implements IHttpPostClient {
  body?: object;
  url?: string;

  async post(params: HttpPostParams): Promise<void> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve();
  }
}
