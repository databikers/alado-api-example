import { ContextOptions } from 'alado';

export const createUserContextOptions: ContextOptions = {
  allowUnknownFields: false,
  openApiDoc: {
    description: 'Sign Up',
    operationId: 'signUp',
    tags: ['User'],
  },
};
export const signInContextOptions: ContextOptions = {
  allowUnknownFields: false,
  openApiDoc: {
    description: 'Sign In',
    operationId: 'signIn',
    tags: ['Session'],
  },
};

export const updateUserContextOptions: ContextOptions = {
  allowUnknownFields: false,
  openApiDoc: {
    description: 'Update Profile',
    operationId: 'updateUser',
    tags: ['User'],
  },
};

export const getUserContextOptions: ContextOptions = {
  allowUnknownFields: false,
  openApiDoc: {
    description: 'User info',
    operationId: 'getUserInfo',
    tags: ['User'],
  },
};

export const getUsersContextOptions: ContextOptions = {
  allowUnknownFields: false,
  openApiDoc: {
    description: 'List users',
    operationId: 'listUsers',
    tags: ['User'],
  },
};

export const setUserAvatarContextOptions: ContextOptions = {
  allowUnknownFields: false,
  openApiDoc: {
    description: 'Set user avatar',
    operationId: 'setUserAvatar',
    tags: ['User'],
  },
};
