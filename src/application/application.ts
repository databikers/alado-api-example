import { AladoServer } from 'alado';
import { aladoServerOptions } from '@config';
import {
  bearerResponse,
  createUserContextOptions,
  getUsersContextOptions,
  auth,
  signInBody,
  signInContextOptions,
  userCreateBody,
  userCreateResponse,
  userGetResponse,
  userRequestPath,
  usersGetResponse,
  userUpdateBody,
} from '@context';
import { sessionController, userController } from '@controller';

export const app = new AladoServer(aladoServerOptions);

app.post(
  '/user',
  {
    title: 'Sign Up',
    options: createUserContextOptions,
    request: {
      body: userCreateBody
    },
    response: userCreateResponse
  },
  userController.create
);

app.post(
  '/session',
  {
    title: 'Sign In',
    options: signInContextOptions,
    request: {
      body: signInBody
    },
    response: bearerResponse
  },
  sessionController.signIn
);

app.get(
  '/user/:id',
  {
    title: 'Get user',
    auth: auth,
    options: getUsersContextOptions,
    request: {
      path: userRequestPath
    },
    response: userGetResponse
  },
  userController.getById
);

app.get(
  '/user',
  {
    title: 'Get users',
    auth: auth,
    options: getUsersContextOptions,
    request: {},
    response: usersGetResponse
  },
  userController.getList
);


app.put(
  '/user/:id',
  {
    title: 'Update user',
    options: getUsersContextOptions,
    request: {
      path: userRequestPath,
      body: userUpdateBody
    },
    response: userGetResponse
  },
  userController.update
);
