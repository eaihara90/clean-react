import { HttpPostParams, IHttpPostClient } from '@/data/protocols/http/http-post-client';
import { HttpResponse, HttpStatusCodeEnum } from '../protocols/http/http-response';

export class HttpPostClientSpy implements IHttpPostClient {
  body?: object;
  url?: string;
  response: HttpResponse = {
    statusCode: HttpStatusCodeEnum.noContent
  };

  async post(params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}
