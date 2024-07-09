import { PropertyDefinition } from 'alado';

const username: PropertyDefinition = {
  openApiDoc: {
    schema: {
      type: 'string',
    },
    example: 'john_doe',
    description: 'Username',
  },
  validation: {
    required: true,
    handler(value) {
      return /^\w{3,}$/.test(value);
    },
    error: {
      statusCode: 400,
      message: 'Username should be an alphanumeric string at least 3 bytes length',
    },
  },
};

const bio: PropertyDefinition = {
  openApiDoc: {
    schema: {
      type: 'string',
    },
    example: 'No Name',
    description: 'Bio',
  },
  validation: {
    required: true,
    handler(value) {
      return Boolean(value);
    },
    error: {
      statusCode: 400,
      message: 'Bio should be a non-empty string',
    },
  },
};

const password: PropertyDefinition = {
  openApiDoc: {
    schema: {
      type: 'string',
    },
    example: 'some$trongp@ssword=)',
    description: 'Password',
  },
  validation: {
    required: true,
    handler(value) {
      return /.{8,}/.test(value);
    },
    error: {
      statusCode: 400,
      message: 'Password should be 8 bytes length',
    },
  },
};

const id: PropertyDefinition = {
  openApiDoc: {
    schema: {
      type: 'string',
    },
    example: '19011293c5f',
    description: 'User id',
  },
  validation: {
    required: true,
    handler(value) {
      return /^[0-9a-f]{11}$/.test(value);
    },
    error: {
      statusCode: 400,
      message: 'Invalid id: id should be 11 bytes hex string',
    },
  },
};

export const signInBody: Record<string, PropertyDefinition> = {
  username,
  password,
};

export const userCreateBody: Record<string, PropertyDefinition> = {
  username,
  bio,
  password,
};

export const userUpdateBody: Record<string, PropertyDefinition> = {
  username,
  bio,
};

export const userRequestPath: Record<string, PropertyDefinition> = {
  id,
};

export const userRequestPathName: Record<string, PropertyDefinition> = {
  name: id,
};
