import { ContextOptions } from 'alado';

export const createUserContextOptions: ContextOptions = {
  allowUnknownFields: true,
  openApiDoc: {
    description: 'Sign Up',
    operationId: 'signUp',
    tags: ['User']
  }
}
export const signInContextOptions: ContextOptions = {
  allowUnknownFields: true,
  openApiDoc: {
    description: 'Sign In',
    operationId: 'signIn',
    tags: ['Session']
  }
}

export const updateUserContextOptions: ContextOptions = {
  allowUnknownFields: true,
  openApiDoc: {
    description: 'Update Profile',
    operationId: 'updateUser',
    tags: ['User']
  }
}

export const getUserContextOptions: ContextOptions = {
  allowUnknownFields: true,
  openApiDoc: {
    description: 'User info',
    operationId: 'getUserInfo',
    tags: ['User']
  }
}
export const getUsersContextOptions: ContextOptions = {
  allowUnknownFields: true,
  openApiDoc: {
    description: 'List users',
    operationId: 'listUsers',
    tags: ['User']
  }
}
