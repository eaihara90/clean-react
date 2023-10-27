export enum HttpStatusCodeEnum {
  success = 200,
  noContent = 201,
  unauthorized = 401,
}

export type HttpResponse = {
  statusCode: HttpStatusCodeEnum;
  body?: object;
}
