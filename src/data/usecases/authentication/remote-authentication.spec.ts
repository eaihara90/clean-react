import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '../../tests/mock-http-client';
import { HttpStatusCodeEnum } from '@/data/protocols/http/http-response';
import { mockAuthentication } from '@/domain/tests/mock-authentication';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { faker} from '@faker-js/faker';

type SutTypes = {
  httpPostClientSpy: HttpPostClientSpy;
  sut: RemoteAuthentication;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return { httpPostClientSpy, sut };
}

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct URL', async () => {
    const url = faker.internet.url();
    const { httpPostClientSpy, sut } = makeSut(url);
    await sut.auth(mockAuthentication());
    
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    const authenticationParams = mockAuthentication();
    await sut.auth(authenticationParams);

    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { httpPostClientSpy, sut } = makeSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCodeEnum.unauthorized };
    const promise = sut.auth(mockAuthentication());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});
