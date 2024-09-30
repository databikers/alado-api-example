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
  setUserAvatarContextOptions,
  updateUserContextOptions,
  getUserContextOptions,
  userRequestPathName,
  q,
} from '@context';
import { sessionController, userController } from '@controller';

export const app = new AladoServer(aladoServerOptions);

app.post(
  '/user',
  {
    title: 'Sign Up',
    options: createUserContextOptions,
    request: {
      body: userCreateBody,
    },
    response: userCreateResponse,
  },
  userController.create,
);

app.post(
  '/session',
  {
    title: 'Sign In',
    options: signInContextOptions,
    request: {
      body: signInBody,
    },
    response: bearerResponse,
  },
  sessionController.signIn,
);

app.get(
  '/user/:id',
  {
    title: 'Get user',
    auth: auth,
    options: getUserContextOptions,
    request: {
      path: userRequestPath,
      query: {
        q,
      },
    },
    response: userGetResponse,
  },
  userController.getById,
);

app.get(
  '/user/@:name',
  {
    title: 'Get user',
    auth: auth,
    options: getUsersContextOptions,
    request: {
      path: userRequestPathName,
    },
    response: userGetResponse,
  },
  userController.getByName,
);

app.get(
  '/user',
  {
    title: 'Get users',
    auth: auth,
    options: getUsersContextOptions,
    request: {
      query: {
        q,
      },
    },
    response: usersGetResponse,
  },
  userController.getList,
);

app.put(
  '/user/:id',
  {
    title: 'Update user',
    options: updateUserContextOptions,
    request: {
      path: userRequestPath,
      body: userUpdateBody,
    },
    response: userGetResponse,
  },
  userController.update,
);

app.post(
  '/user/:id/avatar',
  {
    title: 'Set user avatar',
    options: setUserAvatarContextOptions,
    auth,
    request: {
      path: userRequestPath,
      files: {
        avatar: {
          mimetypes: ['image/png'],
          maxSize: 1048576,
          required: true,
          maxSizeError: {
            statusCode: 413,
            message: 'The avatar should not be larger than 1MB',
          },
          mimetypeError: {
            statusCode: 415,
            message: 'The avatar should be a PNG image',
          },
          requiredError: {
            statusCode: 400,
            message: 'The avatar file is required',
          },
        },
      },
    },
    response: userGetResponse,
  },
  userController.setAvatar,
);
