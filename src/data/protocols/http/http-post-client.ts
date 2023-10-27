export type HttpPostParams = {
  body?: any;
  headers?: any;
  url: string;
}

export interface IHttpPostClient {
  post(params: HttpPostParams): Promise<void>;
}
