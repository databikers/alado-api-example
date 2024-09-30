import { RequestAuthentication } from 'alado';
import { DataHolder } from '@data';

export const auth: RequestAuthentication = {
  required: true,
  inputProperty: 'headers.x-api-key',
  outputProperty: 'auth.request',
  handler(value: string) {
    return DataHolder.bearerAuth(value);
  },
  error: {
    statusCode: 401,
    message: 'Unauthorized',
  },
};
