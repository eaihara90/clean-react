import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '../../tests/mock-http-client';
import { mockAuthentication } from '@/domain/tests/mock-authentication';
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
});
