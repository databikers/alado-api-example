import { Response } from 'alado';
import { UserDto } from '@dto';

const user: Record<keyof UserDto, any> = {
  id: {
    type: 'string'
  },
  username:  {
    type: 'string'
  },
  bio: {
    type: 'string'
  }
};

const headers = { 'Content-Type': 'application/json' };

export const userCreateResponse: Response<UserDto> = {
  title: 'User',
  statusCode: 201,
  headers,
  body: user
};

export const userGetResponse: Response<UserDto> = {
  title: 'User',
  statusCode: 200,
  headers,
  body: user
};

export const usersGetResponse: Response<UserDto[]> = {
  title: 'User',
  statusCode: 200,
  headers,
  body: [user]
};

export const bearerResponse: Response<{ user: Record<keyof UserDto, any>, token: any }> = {
  title: 'Token',
  statusCode: 200,
  headers,
  body: {
    token: {
      type: 'string'
    },
    user
  }
};
