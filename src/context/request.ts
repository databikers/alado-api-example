import { PropertyDefinition } from 'alado';

const validOperands = [
  '$eq',
  '$ne',
  '$in',
  '$nin',
  '$gt',
  '$gte',
  '$lt',
  '$lte',
  '$exists',
  '$regex',
];

export const q: PropertyDefinition = {
  openApiDoc: {
    description:
      'q - request managing query parameter (to prevent openApi properties serialization wrap it  with single quotes)',
    schema: {
      oneOf: [
        {
          type: 'object',
          properties: {
            filters: {
              type: 'array',
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    operand: {
                      type: 'string',
                      enum: validOperands,
                    },
                    key: {
                      type: 'string',
                    },
                    value: {
                      oneOf: [
                        {
                          type: 'string',
                        },
                        {
                          type: 'number',
                        },
                        {
                          type: 'boolean',
                        },
                        {
                          type: 'object',
                        },
                      ],
                    },
                  },
                },
              },
            },
            sorting: {
              type: 'object',
              additionalProperties: {
                type: 'integer',
                enum: [
                  -1,
                  1,
                ],
              },
            },
            skip: {
              type: 'integer',
              minimum: 0,
            },
            limit: {
              type: 'integer',
              minimum: 1,
            },
          },
        },
        {
          type: 'string',
        },
      ],
    },
  },
  transform: function (data: any) {
    if (typeof data === 'string') {
      try {
        return JSON.parse(data.replace(/\'/g, ''));
      } catch (e) {
        console.log(e);
        return data;
      }
    }
  },
  validation: {
    required: false,
    handler: (data: any) => {
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data.replace(/\'/g, ''));
        } catch (e) {
          return false;
        }
      }
      if (!Array.isArray(data.filters)) {
        return false;
      }
      for (const filterGroup of data.filters) {
        if (!Array.isArray(filterGroup)) {
          return false;
        }
        for (const filter of filterGroup) {
          if (typeof filter !== 'object') {
            return false;
          }
          const { operand, key, value } = filter;
          if (!validOperands.includes(operand)) {
            return false;
          }
          if (typeof key !== 'string') {
            return false;
          }
          if (typeof value === 'undefined') {
            return false;
          }
        }
      }

      // Check if 'sorting' is an object with -1 or 1 as values
      if (typeof data.sorting !== 'object' || data.sorting === null || Array.isArray(data.sorting)) {
        return false;
      }
      for (const [
        key,
        value,
      ] of Object.entries(data.sorting)) {
        if (typeof key !== 'string' || (value !== -1 && value !== 1)) {
          return false;
        }
      }

      // Check if 'skip' is a positive integer or zero
      if (typeof data.skip !== 'number' || data.skip < 0 || !Number.isInteger(data.skip)) {
        return false;
      }

      // Check if 'limit' is a positive integer greater than zero
      if (typeof data.limit !== 'number' || data.limit <= 0 || !Number.isInteger(data.limit)) {
        return false;
      }

      return true;
    },
    error: {
      statusCode: 400,
      message: 'Invalid query format',
    },
  },
};

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
