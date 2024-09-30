import request, { Response } from 'supertest';
import { SignUpDto } from '../../src/dto';
import { aladoServerOptions } from '../../src/config';
import { app } from '../../src/application';

const userInfo: SignUpDto = {
  username: 'john_doe',
  password: 'cant_remember',
  bio: 'noname',
};

const updatedUserInfo: SignUpDto = {
  username: 'john_snow',
  password: 'new_password',
  bio: 'some bio',
};

const apiUrl = `http://localhost:${aladoServerOptions.port}`;

describe('Example API  e2e test suite', () => {
  let bearerToken: string;
  let id: string;

  beforeAll(() => {
    app.start(() => {});
  }, 30000);

  afterAll(() => {
    app.stop(() => {});
  });

  it(`Should allow to sign up`, () => {
    return request(apiUrl)
      .post('/user')
      .set('Accept', 'application/json')
      .send(userInfo)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response: Response) => {
        expect(response.body.id).toBeDefined();
        expect(response.body.username).toEqual(userInfo.username);
        expect(response.body.bio).toEqual(userInfo.bio);
        id = response.body.id;
      });
  });

  it(`Shouldn't allow to make unauthorized requests`, () => {
    return request(apiUrl)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .then((response: Response) => {
        expect(response.body.message).toBeDefined();
      });
  });

  it(`Should allow to sign in`, () => {
    return request(apiUrl)
      .post('/session')
      .set('Accept', 'application/json')
      .send({
        password: userInfo.password,
        username: userInfo.username,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response: Response) => {
        expect(response.body.token).toBeDefined();
        bearerToken = response.body.token;
      });
  });

  it(`Should allow authorized user to get user`, () => {
    return request(apiUrl)
      .get(`/user/${id}`)
      .set('Accept', 'application/json')
      .set('x-api-key', bearerToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response: Response) => {
        expect(response.body.id).toBeDefined();
        expect(response.body.username).toBeDefined();
        expect(response.body.bio).toBeDefined();
      });
  });

  it(`Should allow authorized user to get users list`, () => {
    return request(apiUrl)
      .get(`/user`)
      .set('Accept', 'application/json')
      .set('x-api-key', bearerToken)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response: Response) => {
        expect(response.body.length).toBeDefined();
        expect(response.body.length).toBeGreaterThan(0);
      });
  });

  it(`Should allow authorized user update info`, () => {
    return request(apiUrl)
      .put(`/user/${id}`)
      .set('Accept', 'application/json')
      .set('x-api-key', bearerToken)
      .send({
        password: updatedUserInfo.password,
        username: updatedUserInfo.username,
        bio: updatedUserInfo.bio,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response: Response) => {
        expect(response.body.id).toBeDefined();
        expect(response.body.username).toEqual(updatedUserInfo.username);
        expect(response.body.bio).toEqual(updatedUserInfo.bio);
      });
  });
});
